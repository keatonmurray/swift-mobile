import { Link, useNavigate } from "react-router-dom"
import {
  IoArrowBack,
  IoCheckmarkSharp,
} from "react-icons/io5"

import { HiOutlineSparkles } from "react-icons/hi2"

import {
  LuArrowRight,
  LuChevronDown,
  LuCircleHelp,
} from "react-icons/lu"

import {
  FiClock,
  FiCalendar,
  FiGlobe,
  FiMessageCircle,
} from "react-icons/fi"

import { HiOutlineUserGroup } from "react-icons/hi"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"
import AnimatedValue from "@/pages/Desktop/components/AnimatedValue"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

/* -------------------------------------------------------------------------- */
/*  Mock data                                                                  */
/* -------------------------------------------------------------------------- */

const summaryCards = [
  {
    label: "Total Payroll Amount",
    value: "$80,700.00",
    sub: "18 employees · 6 countries",
    icon: HiOutlineUserGroup,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    label: "Payment Currencies",
    value: "3",
    sub: "USD, EUR, PHP",
    icon: FiGlobe,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    label: "Payroll Date",
    value: "May 30, 2025",
    sub: "Tomorrow",
    icon: FiCalendar,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    label: "Total Hours Logged",
    value: "1,248.75 hrs",
    sub: "+45.5 hrs vs last period",
    subColor: "text-emerald-600",
    icon: FiClock,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
]

const aiFindings = [
  "18 employees across 6 countries",
  "1,248.75 total hours logged",
  "Regular pay, overtime, and bonuses included",
  "Statutory deductions and taxes applied",
  "Multi-currency conversion using current rates",
]

const breakdownRows = [
  {
    label: "Regular Pay",
    dot: "bg-violet-500",
    amount: "$65,800.00",
    pct: "81.6%",
  },
  {
    label: "Overtime Pay",
    dot: "bg-blue-500",
    amount: "$5,750.00",
    pct: "7.1%",
  },
  {
    label: "Bonuses & Incentives",
    dot: "bg-amber-500",
    amount: "$3,200.00",
    pct: "4.0%",
  },
  {
    label: "Allowances",
    dot: "bg-emerald-500",
    amount: "$2,150.00",
    pct: "2.7%",
  },
  {
    label: "Reimbursements",
    dot: "bg-pink-500",
    amount: "$1,800.00",
    pct: "2.2%",
  },
]

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

const dataSources = [
  {
    label: "QuickBooks Timesheets",
    value: "1,248.75 hours",
  },
  {
    label: "QuickBooks Payroll",
    value: "18 employees",
  },
  {
    label: "Tax Tables",
    value: "6 countries",
  },
  {
    label: "Currency Rates",
    value: "3 currencies",
  },
]

const employeeBreakdown = [
  {
    id: 1,
    name: "Sarah Chen",
    initials: "SC",
    avatarBg: "bg-rose-100 text-rose-700",
    imageSrc: "https://i.pravatar.cc/80?img=47",
    role: "Product Designer",
    hours: "160.00 hrs",
    regular: "$6,400.00",
    overtime: "$400.00",
    deductions: "-$192.00",
    total: "$6,608.00",
  },
  {
    id: 2,
    name: "Miguel Santos",
    initials: "MS",
    avatarBg: "bg-blue-100 text-blue-700",
    imageSrc: "https://i.pravatar.cc/80?img=12",
    role: "Software Engineer",
    hours: "168.50 hrs",
    regular: "$8,100.00",
    overtime: "$850.00",
    deductions: "-$243.00",
    total: "$8,707.00",
  },
]

/* -------------------------------------------------------------------------- */
/*  Components                                                                 */
/* -------------------------------------------------------------------------- */

const SummaryCard = ({ card }) => (
  <div className="flex min-w-0 items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-6">
    <div className="min-w-0 flex-1">
      <p className="mb-3 truncate text-sm text-zinc-500">
        {card.label}
      </p>

      <AnimatedValue
        value={card.value}
        duration={1400}
        className="mb-3 block text-2xl font-semibold tracking-tight text-zinc-900"
      />

      <p className={`text-sm ${card.subColor ?? "text-zinc-500"}`}>
        {card.sub}
      </p>
    </div>

    <span
      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.iconBg} ${card.iconColor}`}
    >
      <card.icon size={22} />
    </span>
  </div>
)

const WhyCard = () => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <h3 className="mb-6 text-lg font-semibold text-zinc-900">
      Why this payroll amount?
    </h3>

    <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
      <p className="mb-5 flex items-center gap-2 text-sm font-semibold text-zinc-900">
        <HiOutlineSparkles
          size={16}
          className="text-violet-600"
        />

        Gemini analyzed your payroll data and found:
      </p>

      <ul className="mb-6 space-y-4">
        {aiFindings.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 text-sm text-zinc-700"
          >
            <IoCheckmarkSharp
              size={16}
              className="mt-0.5 flex-shrink-0 text-emerald-600"
            />

            {f}
          </li>
        ))}
      </ul>

      <p className="mb-5 text-sm text-zinc-700">
        Total calculated amount:{" "}
        <span className="font-semibold text-zinc-900">
          $80,700.00
        </span>
      </p>

      {/* <button className="inline-flex h-12 w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
        View Calculation Breakdown

        <LuChevronDown size={16} />
      </button> */}
    </div>
  </div>
)

const AmountBreakdownCard = () => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <h3 className="mb-6 text-lg font-semibold text-zinc-900">
      Amount Breakdown
    </h3>

    <ul className="space-y-5">
      {breakdownRows.map((r) => (
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
          $78,700.00
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm text-zinc-700">
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          Deductions & Taxes
        </span>

        <div className="flex items-center gap-3">
          <span className="font-semibold tabular-nums text-rose-600">
            -$2,000.00
          </span>

          <span className="tabular-nums text-zinc-400">
            -2.5%
          </span>
        </div>
      </div>
    </div>

    <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-6">
      <span className="text-sm font-semibold text-zinc-900">
        Total Payroll Amount
      </span>

      <span className="text-lg font-semibold tabular-nums text-zinc-900">
        $80,700.00
      </span>
    </div>
  </div>
)

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

const DataSourcesCard = () => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <h3 className="mb-6 text-lg font-semibold text-zinc-900">
      Data Sources
    </h3>

    <ul className="space-y-4">
      {dataSources.map((d) => (
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

const EmployeeBreakdownCard = () => {
  const navigate = useNavigate()

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900">
          Employee Breakdown
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
                "Employee",
                "Hours Logged",
                "Regular Pay",
                "Overtime",
                "Deductions",
                "Total",
                "",
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
            {employeeBreakdown.map((e) => (
              <tr
                key={e.id}
                onClick={() =>
                  navigate(`/business/payroll/analysis/${e.id}`)
                }
                className="cursor-pointer border-t border-zinc-100 transition-colors hover:bg-zinc-50"
              >
                <td className="py-5 pr-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11">
                      {e.imageSrc && (
                        <AvatarImage
                          src={e.imageSrc}
                          alt={e.name}
                        />
                      )}

                      <AvatarFallback className={e.avatarBg}>
                        {e.initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-900">
                        {e.name}
                      </p>

                      <p className="mt-1 text-sm text-zinc-400">
                        {e.role}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-5 pr-6 text-sm tabular-nums text-zinc-500">
                  {e.hours}
                </td>

                <td className="py-5 pr-6 text-sm font-semibold tabular-nums text-zinc-900">
                  {e.regular}
                </td>

                <td className="py-5 pr-6 text-sm tabular-nums text-zinc-500">
                  {e.overtime}
                </td>

                <td className="py-5 pr-6 text-sm font-semibold tabular-nums text-rose-600">
                  {e.deductions}
                </td>

                <td className="py-5 pr-6 text-sm font-semibold tabular-nums text-zinc-900">
                  {e.total}
                </td>

                <td className="py-5 text-zinc-300">
                  <LuArrowRight size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-6">
        <p className="text-sm text-zinc-400">
          Showing 5 of 18 employees
        </p>

        {/* <button className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
          View All Employees

          <LuArrowRight size={14} />
        </button> */}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const PayrollAnalysis = () => {
  return (
    <DashboardShell
      title="Payroll Analysis"
      subtitle="AI-powered breakdown and explanation of your payroll bill"
    >
      <Link
        to="/business/payroll"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-900"
      >
        <IoArrowBack size={16} />
        Back to Payroll Review
      </Link>

      <section className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((c) => (
          <SummaryCard key={c.label} card={c} />
        ))}
      </section>

      <section className="flex min-w-0 items-start gap-6">
        <div className="min-w-0 flex-1 space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <WhyCard />
            <AmountBreakdownCard />
          </div>

          <EmployeeBreakdownCard />
        </div>

        <aside
          className="flex-shrink-0 space-y-6"
          style={{ width: "320px" }}
        >
          <CalculationDetailsCard />
          <DataSourcesCard />
          <SupportCard />
        </aside>
      </section>
    </DashboardShell>
  )
}

export default PayrollAnalysis