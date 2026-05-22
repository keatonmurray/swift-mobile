import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import {
  IoArrowBack,
  IoCheckmarkSharp,
  IoDownloadOutline,
} from "react-icons/io5"

import { HiOutlineSparkles } from "react-icons/hi2"

import {
  LuArrowRight,
  LuChevronDown,
  LuCircleHelp,
  LuLoaderCircle,
} from "react-icons/lu"

import {
  FiClock,
  FiCalendar,
  FiMessageCircle,
} from "react-icons/fi"

import { HiOutlineUserGroup } from "react-icons/hi"

import { TbBuildingBank } from "react-icons/tb"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"
import AnimatedValue from "@/pages/Desktop/components/AnimatedValue"
import Typewriter from "@/components/Typewriter"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import axios from "axios"

/* -------------------------------------------------------------------------- */
/*  Employee data                                                              */
/* -------------------------------------------------------------------------- */

/* Employee data is now fetched live from QB + salary config + Gemini */

/* -------------------------------------------------------------------------- */
/*  Summary Card                                                               */
/* -------------------------------------------------------------------------- */

const SummaryCard = ({
  label,
  value,
  sub,
  icon: Icon,
  iconBg,
  iconColor,
}) => (
  <div className="flex min-w-0 items-center justify-between gap-3 rounded-3xl border border-zinc-200 bg-white p-5">
    <div className="min-w-0 flex-1">
      <p className="mb-2 truncate text-xs text-zinc-500">
        {label}
      </p>

      <AnimatedValue
        value={value}
        duration={1400}
        className="mb-2 block truncate text-xl font-semibold tracking-tight text-zinc-900"
      />

      <p className="truncate text-xs text-zinc-500">
        {sub}
      </p>
    </div>

    <span
      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}
    >
      <Icon size={18} />
    </span>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Why Card                                                                   */
/* -------------------------------------------------------------------------- */

const WhyCard = ({ emp, aiData, aiLoading }) => {
  const findings = aiData?.findings || emp.aiFindings
  const summary = aiData?.summary || null
  const isLive = aiData && !aiData.is_fallback

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900">
          Why this payroll amount?
        </h3>

        {aiData && (
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${isLive ? "bg-violet-100 text-violet-700" : "bg-zinc-100 text-zinc-500"
            }`}>
            {isLive ? "Gemini" : "Fallback"}
          </span>
        )}
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
        <p className="mb-5 flex items-center gap-2 text-sm font-semibold text-zinc-900">
          <HiOutlineSparkles
            size={16}
            className="text-violet-600"
          />

          {aiLoading
            ? "Gemini is analyzing payroll data..."
            : `Gemini analyzed ${emp.name.split(" ")[0]}'s payroll data and found:`}
        </p>

        {/* Loading */}
        {aiLoading && (
          <div className="flex items-center justify-center gap-2 py-6 text-sm text-zinc-400">
            <LuLoaderCircle size={16} className="animate-spin" />
            Generating insights...
          </div>
        )}

        {/* Findings */}
        {!aiLoading && (
          <>
            <ul className="mb-6 space-y-4">
              {findings.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-zinc-700"
                >
                  <IoCheckmarkSharp
                    size={16}
                    className="mt-0.5 flex-shrink-0 text-emerald-600"
                  />

                  {aiData ? (
                    <Typewriter text={f} speed={12} delay={150 + i * 350} />
                  ) : (
                    f
                  )}
                </li>
              ))}
            </ul>

            <p className="mb-5 text-sm text-zinc-700">
              Total calculated amount:{" "}
              <span className="font-semibold text-zinc-900">
                {emp.totalPay}
              </span>
            </p>

            {/* AI Recommendation */}
            {aiData?.recommendation && (
              <div className="mb-5 rounded-2xl border border-violet-100 bg-violet-50 p-4">
                <div className="flex items-start gap-2">
                  <HiOutlineSparkles size={14} className="mt-0.5 flex-shrink-0 text-violet-600" />
                  <p className="text-sm leading-relaxed text-violet-700">
                    <Typewriter text={aiData.recommendation} speed={14} delay={1400} />
                  </p>
                </div>
              </div>
            )}

            {/* <button className="inline-flex h-12 w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
              View Calculation Breakdown

              <LuChevronDown size={16} />
            </button> */}
          </>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Amount Breakdown                                                           */
/* -------------------------------------------------------------------------- */

const AmountBreakdownCard = ({ emp }) => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <h3 className="mb-6 text-lg font-semibold text-zinc-900">
      Amount Breakdown
    </h3>

    <ul className="space-y-5">
      {emp.breakdown.map((r) => (
        <li
          key={r.label}
          className="flex items-center gap-3 text-sm"
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${r.dot}`}
          />

          <span className="flex-1 truncate text-zinc-700">
            {r.label}
          </span>

          <span className="font-semibold tabular-nums text-zinc-900">
            {r.amount}
          </span>

          <span className="w-12 text-right tabular-nums text-zinc-400">
            {r.pct}
          </span>
        </li>
      ))}
    </ul>

    <div className="mt-6 space-y-4 border-t border-zinc-100 pt-6">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm text-zinc-700">
          <span className="h-2 w-2 rounded-full bg-zinc-900" />
          Total Before Deductions
        </span>

        <span className="font-semibold tabular-nums text-zinc-900">
          {emp.totalBeforeDeductions}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm text-zinc-700">
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          Deductions & Taxes
        </span>

        <div className="flex items-center gap-3">
          <span className="font-semibold tabular-nums text-rose-600">
            {emp.deductions}
          </span>

          <span className="tabular-nums text-zinc-400">
            {emp.deductionsPct}
          </span>
        </div>
      </div>
    </div>

    <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-6">
      <span className="text-sm font-semibold text-zinc-900">
        Total Payroll Amount
      </span>

      <span className="text-lg font-semibold tabular-nums text-zinc-900">
        {emp.totalPay}
      </span>
    </div>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Earnings Table                                                             */
/* -------------------------------------------------------------------------- */

const EarningsTable = ({ emp }) => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-5">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-[14px] font-semibold text-gray-900">
        Employee Breakdown
      </h3>

      {/* <button className="text-[12px] font-medium text-gray-500 transition hover:text-gray-900">
        View all
      </button> */}
    </div>

    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr>
            {[
              "Earning Type",
              "Hours",
              "Rate",
              "Amount",
            ].map((h) => (
              <th
                key={h}
                className="pb-4 pr-6 text-left text-[11px] font-medium uppercase tracking-wide text-gray-400 last:pr-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {emp.earnings.map((r) => (
            <tr
              key={r.type}
              className="border-t border-gray-100 transition-colors hover:bg-gray-50"
            >
              <td className="py-4 pr-6 text-[13px] text-gray-900">
                {r.type}
              </td>

              <td className="py-4 pr-6 text-[13px] tabular-nums text-gray-500">
                {r.hours}
              </td>

              <td className="py-4 pr-6 text-[13px] tabular-nums text-gray-500">
                {r.rate}
              </td>

              <td className="py-4 text-[13px] font-semibold tabular-nums text-gray-900">
                {r.amount}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="border-t border-gray-200">
            <td className="py-4 pr-6 text-[13px] font-semibold text-gray-900">
              Total Earnings
            </td>

            <td className="py-4 pr-6 text-[13px] font-semibold tabular-nums text-gray-900">
              {emp.totalEarningsHours}
            </td>

            <td className="py-4 pr-6" />

            <td className="py-4 text-[13px] font-semibold tabular-nums text-gray-900">
              {emp.totalEarnings}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Hours Overview                                                             */
/* -------------------------------------------------------------------------- */

const HoursOverviewCard = ({ emp }) => {
  const h = emp.hoursBreakdown

  const circumference = 2 * Math.PI * 14

  const regularDash =
    (h.regular.pct / 100) * circumference

  const overtimeDash =
    (h.overtime.pct / 100) * circumference

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-8">
      <h3 className="mb-5 text-lg font-semibold text-zinc-900">
        Hours Overview
      </h3>

      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
        Total Hours
      </p>

      <p className="mb-2 text-4xl font-semibold tracking-tight text-zinc-900">
        {h.total}
      </p>

      <p className="mb-8 text-sm font-medium text-emerald-600">
        {h.delta}
      </p>

      <div className="flex items-center gap-8">
        <div className="relative h-[110px] w-[110px] flex-shrink-0">
          <svg
            viewBox="0 0 36 36"
            className="h-full w-full -rotate-90"
          >
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#f4f4f5"
              strokeWidth="4"
            />

            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray={`${regularDash} ${circumference}`}
              strokeLinecap="round"
            />

            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeDasharray={`${overtimeDash} ${circumference}`}
              strokeDashoffset={-regularDash}
              strokeLinecap="round"
            />
          </svg>
        </div>

        <ul className="flex-1 space-y-4">
          <li className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-zinc-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              {h.regular.label}
            </span>

            <span className="tabular-nums text-zinc-400">
              {h.regular.pct}%
            </span>
          </li>

          <li className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-zinc-700">
              <span className="h-2 w-2 rounded-full bg-blue-500" />

              {h.overtime.label}
            </span>

            <span className="tabular-nums text-zinc-400">
              {h.overtime.pct}%
            </span>
          </li>

          <li className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-zinc-700">
              <span className="h-2 w-2 rounded-full bg-zinc-300" />

              {h.other.label}
            </span>

            <span className="tabular-nums text-zinc-400">
              {h.other.pct}%
            </span>
          </li>
        </ul>
      </div>

      {/* <button className="mt-8 inline-flex h-12 w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
        View Timesheet Details

        <LuArrowRight size={16} />
      </button> */}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Deductions Table                                                           */
/* -------------------------------------------------------------------------- */

const DeductionsTable = ({ emp }) => (
  <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8">
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-zinc-900">
        Deductions & Taxes
      </h3>

      {/* <button className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900">
        View all
      </button> */}
    </div>

    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr>
            {[
              "Deduction Type",
              "Calculation",
              "Amount",
            ].map((h) => (
              <th
                key={h}
                className="pb-4 pr-6 text-left text-xs font-medium uppercase tracking-wide text-zinc-400 last:pr-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {emp.deductionRows.map((r) => (
            <tr
              key={r.type}
              className="border-t border-zinc-100 transition-colors hover:bg-zinc-50"
            >
              <td className="py-5 pr-6 text-sm text-zinc-900">
                {r.type}
              </td>

              <td className="py-5 pr-6 text-sm text-zinc-500">
                {r.calc}
              </td>

              <td className="py-5 text-sm font-semibold tabular-nums text-rose-600">
                {r.amount}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="border-t border-zinc-200">
            <td className="py-5 pr-6 text-sm font-semibold text-zinc-900">
              Total Deductions
            </td>

            <td className="py-5 pr-6 text-sm text-zinc-500">
              —
            </td>

            <td className="py-5 text-sm font-semibold tabular-nums text-rose-600">
              {emp.totalDeductions}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Net Pay                                                                    */
/* -------------------------------------------------------------------------- */

const NetPayCard = ({ emp }) => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <h3 className="mb-6 text-lg font-semibold text-zinc-900">
      Net Pay
    </h3>

    <div className="mb-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-sm text-zinc-600">
            {emp.name.split(" ")[0]} will receive
          </p>

          <p className="mb-3 text-4xl font-semibold tracking-tight text-zinc-900">
            {emp.netPay}
          </p>

          <p className="text-sm text-zinc-500">
            {emp.netPayMethod}
          </p>
        </div>

        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
          <TbBuildingBank
            size={22}
            className="text-emerald-600"
          />
        </span>
      </div>
    </div>

    {/* <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
      <IoDownloadOutline size={16} />
      Download Pay Stub
    </button> */}
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Sidebar                                                                    */
/* -------------------------------------------------------------------------- */

const calculationSteps = [
  {
    title: "Step 1: Hours & Pay Rates",
    body: "Timesheet hours × employee pay rates",
  },
  {
    title: "Step 2: Additional Pay",
    body: "Overtime, bonuses, allowances",
  },
  {
    title: "Step 3: Deductions",
    body: "Taxes, benefits, other deductions",
  },
  {
    title: "Step 4: Currency Conversion",
    body: "Multi-currency conversion to base currency",
  },
]

const CalculationDetailsCard = () => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <h3 className="mb-6 text-lg font-semibold text-zinc-900">
      Calculation Details
    </h3>

    <div className="mb-6 rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
      <p className="mb-2 text-sm font-semibold text-zinc-900">
        How it works
      </p>

      <p className="mb-4 text-sm leading-relaxed text-zinc-500">
        We analyze your QuickBooks data including
        timesheets, pay rates, taxes, and deductions
        to calculate the exact payroll amount.
      </p>

      {/* <button className="text-sm font-semibold text-violet-700 transition hover:text-violet-900">
        Learn more
      </button> */}
    </div>

    <ul className="space-y-5">
      {calculationSteps.map((s) => (
        <li
          key={s.title}
          className="flex items-start gap-4"
        >
          <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <IoCheckmarkSharp size={14} />
          </span>

          <div>
            <p className="text-sm font-semibold text-zinc-900">
              {s.title}
            </p>

            <p className="mt-1 text-sm leading-relaxed text-zinc-500">
              {s.body}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
)

const DataSourcesCard = ({ emp }) => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <h3 className="mb-6 text-lg font-semibold text-zinc-900">
      Data Sources
    </h3>

    <ul className="space-y-4">
      {emp.dataSources.map((d) => (
        <li
          key={d.label}
          className="flex items-center justify-between gap-3 text-sm"
        >
          <span className="flex min-w-0 items-center gap-2 text-zinc-700">
            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500" />

            <span className="truncate">{d.label}</span>
          </span>

          <span className="flex-shrink-0 text-right tabular-nums text-zinc-500">
            {d.value}
          </span>
        </li>
      ))}
    </ul>
  </div>
)

const SupportCard = () => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <div className="mb-3 flex items-start gap-3">
      <LuCircleHelp
        className="mt-0.5 text-zinc-400"
        size={18}
      />

      <h3 className="text-lg font-semibold text-zinc-900">
        Need Help?
      </h3>
    </div>

    <p className="mb-6 text-sm leading-relaxed text-zinc-500">
      Learn more about payroll calculations or contact
      our support team.
    </p>

    {/* <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
      <FiMessageCircle size={16} />
      Contact Support
    </button> */}
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const EmployeePayrollDetail = () => {
  const { employeeId } = useParams()

  /* ── Live data state ───────────────────────────────────────── */
  const [emp, setEmp] = useState(null)
  const [loading, setLoading] = useState(true)
  const [aiData, setAiData] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("api_token")
    if (!token) { setLoading(false); return }

    const fetchData = async () => {
      setLoading(true)
      try {
        /* ── 1. Fetch QB employees ─────────────────────────── */
        const qbRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/integrations/quickbooks/employees`,
          { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
        )

        const rawEmployees =
          qbRes?.data?.data?.QueryResponse?.Employee || []

        const qbEmp = rawEmployees.find((e) => String(e.Id) === String(employeeId))

        if (!qbEmp) {
          // Fallback if not found
          setEmp(buildFallbackEmployee(employeeId))
          setLoading(false)
          return
        }

        const fullName =
          qbEmp.DisplayName ||
          `${qbEmp.GivenName || ""} ${qbEmp.FamilyName || ""}`.trim()

        const initials = fullName
          ?.split(" ")
          ?.map((n) => n?.[0])
          ?.join("")

        /* ── 2. Fetch salary config ────────────────────────── */
        let salaryConfig = null
        try {
          const salaryRes = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/employee-payment-accounts/${qbEmp.Id}`,
            { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
          )
          if (salaryRes.data?.success) {
            salaryConfig = salaryRes.data.data
          }
        } catch {
          // No salary config yet — that's fine
        }

        /* ── 3. Build base employee object ─────────────────── */
        const baseEmp = {
          name: fullName || "Employee",
          initials: initials || "??",
          avatarBg: "bg-violet-100 text-violet-700",
          imageSrc: null,
          role: salaryConfig?.job_title || "Employee",
          startDate: qbEmp.MetaData?.CreateTime
            ? new Date(qbEmp.MetaData.CreateTime).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
            : "—",
          email: qbEmp.PrimaryEmailAddr?.Address || "No email",
          phone: qbEmp.PrimaryPhone?.FreeFormNumber || "No phone",
          salary: salaryConfig?.salary || 0,
          hourlyRate: salaryConfig?.hourly_rate || 0,
          hoursPerPeriod: salaryConfig?.hours_per_period || 160,
          payFrequency: salaryConfig?.pay_frequency || "monthly",
          currency: salaryConfig?.currency || "USD",
          paymentMethod: salaryConfig?.payout_method === "wallet" ? "Wallet" : "Bank Transfer",
          paymentMethodSub: "Scheduled",

          // These will be overwritten by Gemini
          totalPay: "$0.00",
          totalHours: "160.00 hrs",
          payrollDate: new Date(Date.now() + 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          payrollDateSub: "Tomorrow",
          aiFindings: ["Fetching payroll breakdown..."],
          breakdown: [],
          totalBeforeDeductions: "$0.00",
          deductions: "$0.00",
          deductionsPct: "0%",
          earnings: [],
          totalEarnings: "$0.00",
          totalEarningsHours: "0.00 hrs",
          hoursBreakdown: { total: "160.00 hrs", delta: "—", regular: { label: "—", pct: 0 }, overtime: { label: "—", pct: 0 }, other: { label: "—", pct: 0 } },
          deductionRows: [],
          totalDeductions: "$0.00",
          netPay: "$0.00",
          netPayMethod: "via Bank Transfer",
          dataSources: [
            { label: "QuickBooks Employees", value: fullName },
            { label: "Salary Config", value: salaryConfig ? `$${parseFloat(salaryConfig.salary || 0).toLocaleString()}` : "Not configured" },
            { label: "Pay Frequency", value: salaryConfig?.pay_frequency || "monthly" },
            { label: "Currency", value: salaryConfig?.currency || "USD" },
          ],
        }

        setEmp(baseEmp)
        setLoading(false)

        /* ── 4. Call Gemini for full breakdown ──────────────── */
        setAiLoading(true)
        try {
          const geminiRes = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/gemini/analyze-employee-payroll`,
            {
              name: fullName,
              job_title: salaryConfig?.job_title || "Employee",
              role: salaryConfig?.job_title || "Employee",
              salary: parseFloat(salaryConfig?.salary || 0),
              hourly_rate: parseFloat(salaryConfig?.hourly_rate || 0),
              hours_per_period: parseFloat(salaryConfig?.hours_per_period || 160),
              pay_frequency: salaryConfig?.pay_frequency || "monthly",
              currency: salaryConfig?.currency || "USD",
            },
            { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
          )

          if (geminiRes.data?.success && geminiRes.data?.data) {
            const g = geminiRes.data.data
            setAiData(g)

            // Merge Gemini data into emp
            setEmp((prev) => ({
              ...prev,
              totalPay: g.totalPay || prev.totalPay,
              totalHours: g.totalHours || prev.totalHours,
              payrollDate: g.payrollDate || prev.payrollDate,
              breakdown: g.breakdown || prev.breakdown,
              totalBeforeDeductions: g.totalBeforeDeductions || prev.totalBeforeDeductions,
              deductions: g.deductions || prev.deductions,
              deductionsPct: g.deductionsPct || prev.deductionsPct,
              earnings: g.earnings || prev.earnings,
              totalEarnings: g.totalEarnings || prev.totalEarnings,
              totalEarningsHours: g.totalEarningsHours || prev.totalEarningsHours,
              hoursBreakdown: g.hoursBreakdown || prev.hoursBreakdown,
              deductionRows: g.deductionRows || prev.deductionRows,
              totalDeductions: g.totalDeductions || prev.totalDeductions,
              netPay: g.netPay || prev.netPay,
              netPayMethod: g.netPayMethod || prev.netPayMethod,
              aiFindings: g.findings || prev.aiFindings,
            }))
          }
        } catch (err) {
          console.error("Employee AI analysis failed:", err)
        } finally {
          setAiLoading(false)
        }
      } catch (err) {
        console.error("Failed to fetch employee data:", err)
        setEmp(buildFallbackEmployee(employeeId))
        setLoading(false)
      }
    }

    fetchData()
  }, [employeeId])

  /* ── Loading state ─────────────────────────────────────────── */
  if (loading || !emp) {
    return (
      <DashboardShell title="" subtitle="">
        <div className="flex flex-col items-center justify-center py-32">
          <LuLoaderCircle size={32} className="animate-spin text-violet-500 mb-4" />
          <p className="text-sm text-zinc-500">Loading employee data from QuickBooks...</p>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell title="" subtitle="">
      {/* Back */}
      <Link
        to="/business/payroll/analysis"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-900"
      >
        <IoArrowBack size={16} />
        Back to Payroll Analysis
      </Link>

      {/* Header */}
      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-[280px_1fr]">
        {/* Employee */}
        <div className="flex items-center gap-4 rounded-3xl border border-zinc-200 bg-white p-6">
          <Avatar className="h-14 w-14 flex-shrink-0">
            {emp.imageSrc && (
              <AvatarImage
                src={emp.imageSrc}
                alt={emp.name}
              />
            )}

            <AvatarFallback
              className={`${emp.avatarBg} text-sm font-semibold`}
            >
              {emp.initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
                {emp.name}
              </h2>

              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active
              </span>
            </div>

            <p className="text-sm text-zinc-500">
              {emp.role}
            </p>

            <p className="mt-1 text-xs text-zinc-400">
              Since {emp.startDate}
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <SummaryCard
            label="Total Payroll Amount"
            value={emp.totalPay}
            sub="This Pay Period"
            icon={HiOutlineUserGroup}
            iconBg="bg-violet-100"
            iconColor="text-violet-600"
          />

          <SummaryCard
            label="Total Hours Logged"
            value={emp.totalHours}
            sub="This Pay Period"
            icon={FiClock}
            iconBg="bg-sky-100"
            iconColor="text-sky-600"
          />

          <SummaryCard
            label="Payroll Date"
            value={emp.payrollDate}
            sub={emp.payrollDateSub}
            icon={FiCalendar}
            iconBg="bg-amber-100"
            iconColor="text-amber-600"
          />

          <SummaryCard
            label="Payment Method"
            value={emp.paymentMethod}
            sub={emp.paymentMethodSub}
            icon={TbBuildingBank}
            iconBg="bg-emerald-100"
            iconColor="text-emerald-600"
          />
        </div>
      </div>

      {/* Main */}
      <section className="flex min-w-0 items-start gap-6">
        {/* Left */}
        <div className="min-w-0 flex-1 space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <WhyCard emp={emp} aiData={aiData} aiLoading={aiLoading} />

            <AmountBreakdownCard emp={emp} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <EarningsTable emp={emp} />

            <HoursOverviewCard emp={emp} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <DeductionsTable emp={emp} />

            <NetPayCard emp={emp} />
          </div>
        </div>

        {/* Sidebar */}
        <aside
          className="flex-shrink-0 space-y-6"
          style={{ width: "320px" }}
        >
          <CalculationDetailsCard />

          <DataSourcesCard emp={emp} />

          <SupportCard />
        </aside>
      </section>
    </DashboardShell>
  )
}

/* -------------------------------------------------------------------------- */
/*  Fallback employee builder                                                  */
/* -------------------------------------------------------------------------- */

function buildFallbackEmployee(id) {
  return {
    name: `Employee #${id}`,
    initials: "??",
    avatarBg: "bg-zinc-100 text-zinc-600",
    imageSrc: null,
    role: "Employee",
    startDate: "—",
    totalPay: "$0.00",
    totalHours: "0.00 hrs",
    payrollDate: "—",
    payrollDateSub: "—",
    paymentMethod: "—",
    paymentMethodSub: "—",
    aiFindings: ["Employee not found in QuickBooks"],
    breakdown: [],
    totalBeforeDeductions: "$0.00",
    deductions: "$0.00",
    deductionsPct: "0%",
    earnings: [],
    totalEarnings: "$0.00",
    totalEarningsHours: "0.00 hrs",
    hoursBreakdown: { total: "0.00 hrs", delta: "—", regular: { label: "—", pct: 0 }, overtime: { label: "—", pct: 0 }, other: { label: "—", pct: 0 } },
    deductionRows: [],
    totalDeductions: "$0.00",
    netPay: "$0.00",
    netPayMethod: "—",
    dataSources: [],
  }
}

export default EmployeePayrollDetail