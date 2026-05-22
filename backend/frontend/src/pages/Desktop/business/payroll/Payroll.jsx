import React, {
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  Link,
  useNavigate,
} from "react-router-dom"

import axios from "axios"

import {
  IoCheckmarkCircle,
  IoLockClosedOutline,
  IoWalletOutline,
  IoClose,
  IoSettingsOutline,
} from "react-icons/io5"

import { HiOutlineSparkles } from "react-icons/hi2"

import {
  LuArrowRight,
  LuShieldCheck,
  LuRefreshCw,
  LuFilter,
  LuChevronDown,
  LuLoaderCircle,
} from "react-icons/lu"

import {
  FiClock,
  FiCalendar,
  FiGlobe,
  FiCheckCircle,
} from "react-icons/fi"

import { HiOutlineUserGroup } from "react-icons/hi"

import ReactCountryFlag from "react-country-flag"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"
import AnimatedValue from "@/pages/Desktop/components/AnimatedValue"
import StatusBadge from "@/pages/Desktop/components/StatusBadge"
import Typewriter from "@/components/Typewriter"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

/* -------------------------------------------------------------------------- */
/* AI RECOMMENDATIONS                                                         */
/* -------------------------------------------------------------------------- */

const aiRecommendations = [
  {
    icon: LuRefreshCw,
    title: "Optimize payout timing",
    body:
      "AI detected possible savings opportunities on international payouts.",
  },

  {
    icon: FiClock,
    title: "Review scheduled payrolls",
    body:
      "Some employees are marked inactive in QuickBooks.",
  },

  {
    icon: LuShieldCheck,
    title: "Compliance verified",
    body:
      "No compliance issues detected across payroll records.",
  },
]

/* -------------------------------------------------------------------------- */
/* CHECKBOX                                                                    */
/* -------------------------------------------------------------------------- */

const Checkbox = ({
  checked,
  onChange,
}) => (
  <button
    onClick={onChange}
    className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${checked
        ? "border-black bg-black text-white"
        : "border-zinc-300 bg-white hover:border-zinc-400"
      }`}
  >
    {checked && (
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
      >
        <path
          d="M2 5l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </button>
)

/* -------------------------------------------------------------------------- */
/* SUMMARY CARD                                                                */
/* -------------------------------------------------------------------------- */

const SummaryCard = ({
  card,
}) => (
  <div className="flex items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-6">
    <div className="min-w-0 flex-1">
      <p className="mb-3 text-sm text-zinc-500">
        {card.label}
      </p>

      <AnimatedValue
        value={card.value}
        duration={1400}
        className="mb-3 block text-3xl font-semibold tracking-tight text-zinc-900"
      />

      <p
        className={`flex items-center gap-2 text-sm ${card.subColor ?? "text-zinc-500"
          }`}
      >
        {card.subDot && (
          <span
            className={`h-2 w-2 rounded-full ${card.subDot}`}
          />
        )}

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

/* -------------------------------------------------------------------------- */
/* PAYOUTS TABLE                                                               */
/* -------------------------------------------------------------------------- */

const PayoutsTable = ({
  rows,
  selected,
  toggle,
  toggleAll,
  allSelected,
  loading,
}) => {
  const navigate =
    useNavigate()

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900">
          Employee Payouts
        </h3>

        {/* <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50">
            All Currencies

            <LuChevronDown
              size={14}
              className="text-zinc-400"
            />
          </button>

          <button className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50">
            <LuFilter size={14} />
            Filter
          </button>
        </div> */}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr>
              <th className="w-8 pb-4 text-left">
                <Checkbox
                  checked={
                    allSelected
                  }
                  onChange={
                    toggleAll
                  }
                />
              </th>

              {[
                "Employee",
                "Country",
                "Currency",
                "Amount",
                "Method",
                "Status",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="pb-4 pr-6 text-left text-xs font-medium uppercase tracking-wide text-zinc-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-14 text-center text-sm text-zinc-400"
                >
                  Loading QuickBooks employees...
                </td>
              </tr>
            ) : rows.length ===
              0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-14 text-center text-sm text-zinc-400"
                >
                  No employees found.
                </td>
              </tr>
            ) : (
              rows.map((e) => (
                <tr
                  key={e.id}
                  className="cursor-pointer border-t border-zinc-100 transition-colors hover:bg-zinc-50"
                  onClick={() =>
                    navigate(
                      `/business/payroll/analysis/${e.id}`
                    )
                  }
                >
                  <td
                    className="py-5"
                    onClick={(
                      ev
                    ) =>
                      ev.stopPropagation()
                    }
                  >
                    <Checkbox
                      checked={selected.has(
                        e.id
                      )}
                      onChange={() =>
                        toggle(
                          e.id
                        )
                      }
                    />
                  </td>

                  <td className="py-5 pr-6">
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        {e.imageSrc && (
                          <AvatarImage
                            src={
                              e.imageSrc
                            }
                            alt={
                              e.name
                            }
                          />
                        )}

                        <AvatarFallback
                          className={
                            e.avatarBg
                          }
                        >
                          {
                            e.initials
                          }
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="text-sm font-semibold text-zinc-900">
                          {e.name}
                        </p>

                        <p className="mt-1 text-xs text-zinc-400">
                          {e.role}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-5 pr-6 text-sm text-zinc-500">
                    <span className="inline-flex items-center gap-2">
                      <ReactCountryFlag
                        countryCode={
                          e.countryCode
                        }
                        svg
                        style={{
                          width:
                            "1.1em",
                          height:
                            "0.8em",
                          borderRadius:
                            "2px",
                        }}
                      />

                      {e.country}
                    </span>
                  </td>

                  <td className="py-5 pr-6 text-sm text-zinc-500">
                    {e.currency}
                  </td>

                  <td className="py-5 pr-6 text-sm font-semibold tabular-nums text-zinc-900">
                    {e.amount}
                  </td>

                  <td className="py-5 pr-6">
                    <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                      {e.method}
                    </span>
                  </td>

                  <td className="py-5 pr-6">
                    {e.status ===
                    "ready" ? (
                      <StatusBadge variant="success">
                        Ready
                      </StatusBadge>
                    ) : (
                      <StatusBadge variant="info">
                        Scheduled
                      </StatusBadge>
                    )}
                  </td>

                  <td className="py-5 text-zinc-300 transition hover:text-zinc-600">
                    <LuArrowRight
                      size={16}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* AI ASSISTANT                                                                */
/* -------------------------------------------------------------------------- */

const AIPayrollAssistant =
  () => (
    <div className="rounded-3xl border border-zinc-200 bg-white p-8">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-900">
          <HiOutlineSparkles
            size={18}
            className="text-violet-600"
          />

          AI Payroll Assistant
        </h3>

        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
          Beta
        </span>
      </div>

      <p className="mb-6 text-sm text-zinc-500">
        AI analyzed your
        QuickBooks payroll
        activity.
      </p>

      <div className="space-y-5">
        {aiRecommendations.map(
          (r) => (
            <div
              key={r.title}
              className="flex items-start gap-4 border-b border-zinc-100 pb-5 last:border-none last:pb-0"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 text-zinc-600">
                <r.icon
                  size={16}
                />
              </span>

              <div>
                <p className="text-sm font-semibold text-zinc-900">
                  {r.title}
                </p>

                <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                  {r.body}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )

/* -------------------------------------------------------------------------- */
/* SECURITY CARD                                                               */
/* -------------------------------------------------------------------------- */

const SecurityCard = () => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-8">
    <div className="mb-3 flex items-start justify-between">
      <h3 className="text-lg font-semibold text-zinc-900">
        Security &
        Compliance
      </h3>

      <IoLockClosedOutline
        className="text-zinc-300"
        size={18}
      />
    </div>

    <p className="text-sm leading-relaxed text-zinc-500">
      All payrolls are
      encrypted and securely
      processed through
      Rapyd's payout
      infrastructure.
    </p>
  </div>
)

const ApprovalBar = ({
  selectedCount,
  employeesCount,
  totalAmount,
  onSend,
  isSending,
}) => (
  <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white">
          <IoCheckmarkCircle size={20} />
        </span>

        <div>
          <p className="text-sm font-semibold text-zinc-900">
            {selectedCount} selected
          </p>

          <p className="text-sm text-zinc-500">
            {employeesCount} employees
          </p>
        </div>
      </div>

      <div className="h-10 w-px bg-zinc-200" />

      <div>
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
          Total Selected
        </p>

        <p className="text-lg font-semibold tabular-nums text-zinc-900">
          {totalAmount}
        </p>
      </div>

      <div className="h-10 w-px bg-zinc-200" />

      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600">
          <FiClock size={18} />
        </span>

        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
            Processing Time
          </p>

          <p className="text-sm font-semibold text-zinc-900">
            1–2 business days
          </p>
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        {/* <button className="inline-flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
          <IoClose size={16} />
          Reject Payroll
        </button> */}

        {/* <button className="inline-flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
          <FiCalendar size={15} />
          Save for Later
        </button> */}

        <button 
          onClick={onSend}
          disabled={isSending || selectedCount === 0}
          className="inline-flex h-12 items-center gap-2 rounded-2xl bg-black px-6 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isSending ? (
            <>
              <LuLoaderCircle size={16} className="animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Approve & Send Payroll
              <LuArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  </div>
)

/* -------------------------------------------------------------------------- */
/* PAGE                                                                        */
/* -------------------------------------------------------------------------- */

const Payroll = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(() => new Set())
  const [aiData, setAiData] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [
    loadingEmployees,
    setLoadingEmployees,
  ] = useState(false)

  const [processing, setProcessing] =
    useState(false)


  /* -------------------------------------------------------------------------- */
  /* FETCH QB EMPLOYEES                                                         */
  /* -------------------------------------------------------------------------- */

  const fetchQBEmployees =
    async () => {
      try {
        setLoadingEmployees(
          true
        )

        const response =
          await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/integrations/quickbooks/employees`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,

                Accept:
                  "application/json",
              },
            }
          )

        const qbEmployees =
          response?.data?.data
            ?.QueryResponse
            ?.Employee || []

        const formattedEmployees =
          qbEmployees.map(
            (
              employee
            ) => {
              const fullName =
                employee?.DisplayName ||
                `${employee?.GivenName || ""} ${
                  employee?.FamilyName ||
                  ""
                }`.trim()

              const payrollAmount =
                Math.floor(
                  Math.random() *
                    5000
                ) + 1000

              return {
                id:
                  employee?.Id ||
                  crypto.randomUUID(),

                name:
                  fullName ||
                  "Unknown Employee",

                initials:
                  fullName
                    ?.split(
                      " "
                    )
                    ?.map(
                      (
                        n
                      ) =>
                        n?.[0]
                    )
                    ?.join(
                      ""
                    ) ||
                  "NA",

                avatarBg:
                  "bg-violet-100 text-violet-700",

                imageSrc:
                  null,

                role:
                  "Employee",

                country:
                  "United States",

                countryCode:
                  "US",

                amount:
                  payrollAmount.toLocaleString(
                    "en-US",
                    {
                      style:
                        "currency",

                      currency:
                        "USD",
                    }
                  ),

                usd:
                  payrollAmount,

                currency:
                  "USD",

                method:
                  "Wallet",

                status:
                  employee?.Active
                    ? "ready"
                    : "scheduled",

                selected:
                  true,
              }
            }
          )

        setEmployees(
          formattedEmployees
        )

        setSelected(
          new Set(
            formattedEmployees.map(
              (
                e
              ) =>
                e.id
            )
          )
        )
      } catch (error) {
        console.error(
          "Failed to fetch QB employees:",
          error
        )
      } finally {
        setLoadingEmployees(
          false
        )
      }
    }

  useEffect(() => {
    fetchQBEmployees()
  }, [])

  /* -------------------------------------------------------------------------- */
  /* SELECTION                                                                  */
  /* -------------------------------------------------------------------------- */

  const toggle = (id) =>
    setSelected((s) => {
      const n =
        new Set(s)

      if (n.has(id)) {
        n.delete(id)
      } else {
        n.add(id)
      }

      return n
    })

  const toggleAll = () =>
    setSelected((s) =>
      s.size ===
      employees.length
        ? new Set()
        : new Set(
            employees.map(
              (e) =>
                e.id
            )
          )
    )

  const handleSendPayroll = async () => {
    setIsSending(true)
    // Replace this timeout with your actual API call when ready
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSending(false)
    setShowSuccess(true)
  }

  const totals = useMemo(() => {
    const selectedEmployees =
      employees.filter(
        (e) =>
          selected.has(
            e.id
          )
      )

    const amount =
      selectedEmployees.reduce(
        (
          sum,
          emp
        ) =>
          sum +
          emp.usd,
        0
      )

    return {
      count:
        selectedEmployees.length,

      amount,

      formatted:
        amount.toLocaleString(
          "en-US",
          {
            style:
              "currency",

            currency:
              "USD",
          }
        ),
    }
  }, [
    selected,
    employees,
  ])

  /* -------------------------------------------------------------------------- */
  /* SUMMARY CARDS                                                              */
  /* -------------------------------------------------------------------------- */

  const summaryCards =
    useMemo(() => {
      const totalPayroll =
        employees.reduce(
          (
            sum,
            emp
          ) =>
            sum +
            emp.usd,
          0
        )

      const currencies =
        [
          ...new Set(
            employees.map(
              (e) =>
                e.currency
            )
          ),
        ]

      return [
        {
          label:
            "Total Payroll Amount",

          value:
            totalPayroll.toLocaleString(
              "en-US",
              {
                style:
                  "currency",

                currency:
                  "USD",
              }
            ),

          sub: `${employees.length} employees · ${currencies.length} currencies`,

          icon:
            HiOutlineUserGroup,

          iconBg:
            "bg-violet-100",

          iconColor:
            "text-violet-600",
        },

        {
          label:
            "Payment Currencies",

          value:
            currencies.length.toString(),

          sub:
            currencies.join(
              ", "
            ) ||
            "No currencies",

          icon:
            FiGlobe,

          iconBg:
            "bg-sky-100",

          iconColor:
            "text-sky-600",
        },

        {
          label:
            "Earliest Payout Date",

          value:
            "Today",

          sub:
            "Ready to process",

          icon:
            FiCalendar,

          iconBg:
            "bg-amber-100",

          iconColor:
            "text-amber-600",
        },

        {
          label:
            "Cash After Payroll",

          value:
            `$${(
              104152.65 -
              totalPayroll
            ).toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}`,

          sub:
            "Healthy",

          subDot:
            "bg-emerald-500",

          subColor:
            "text-emerald-600",

          icon:
            IoWalletOutline,

          iconBg:
            "bg-emerald-100",

          iconColor:
            "text-emerald-600",
        },
      ]
    }, [employees])

  /* -------------------------------------------------------------------------- */
  /* APPROVE PAYROLL                                                            */
  /* -------------------------------------------------------------------------- */

  const handleApprovePayroll =
    async () => {
      try {
        setProcessing(
          true
        )

        await new Promise(
          (
            resolve
          ) =>
            setTimeout(
              resolve,
              1200
            )
        )

        const selectedIds =
          Array.from(
            selected
          )

        setEmployees(
          (prev) =>
            prev.filter(
              (
                emp
              ) =>
                !selectedIds.includes(
                  emp.id
                )
            )
        )

        setSelected(
          new Set()
        )
      } catch (error) {
        console.error(
          error
        )
      } finally {
        setProcessing(
          false
        )
      }
    }

  return (
    <DashboardShell
      title="Payroll Review"
      subtitle="Review and approve employee payments"
      actions={
        <Link
          to="/business/payroll/settings"
          className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
        >
          <IoSettingsOutline
            size={16}
          />

          Settings
        </Link>
      }
    >
      {/* SUMMARY */}
      {/* <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map(
          (c) => (
            <SummaryCard
              key={c.label}
              card={c}
            />
          )
        )}
      </section> */}

      {/* MAIN */}
      <section className="mb-6 grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-6 lg:col-span-8">
          <PayoutsTable
            rows={
              employees
            }
            selected={
              selected
            }
            toggle={toggle}
            toggleAll={
              toggleAll
            }
            allSelected={
              selected.size ===
                employees.length &&
              employees.length >
                0
            }
            loading={
              loadingEmployees
            }
          />
        </div>

        <aside className="col-span-12 space-y-6 lg:col-span-4">
          <AIPayrollAssistant />

          <SecurityCard />
        </aside>
      </section>

      {/* Approval Bar */}
      <ApprovalBar
        selectedCount={totals.count}
        employeesCount={totals.count}
        totalAmount={totals.formatted}
        onSend={handleSendPayroll}
        isSending={isSending}
      />

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[32px] bg-white p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <IoCheckmarkCircle size={40} />
            </div>
            
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900">
              Payroll Sent!
            </h3>
            
            <p className="mb-8 text-sm leading-relaxed text-zinc-500">
              Your payroll has been successfully approved and sent for processing.
            </p>
            
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full rounded-2xl bg-black py-4 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}

export default Payroll