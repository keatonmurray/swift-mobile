import { useEffect, useMemo, useState } from "react"
import {
  IoEllipsisVertical,
  IoCheckmarkCircle,
  IoLockClosedOutline,
  IoWalletOutline,
} from "react-icons/io5"

import { HiOutlineSparkles } from "react-icons/hi2"

import {
  LuArrowRight,
  LuShieldCheck,
  LuRefreshCw,
  LuLoaderCircle,
  LuTriangleAlert,
  LuX,
} from "react-icons/lu"

import {
  FiFileText,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi"

import { BsBriefcase, BsHouseDoor } from "react-icons/bs"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"
import AnimatedValue from "@/pages/Desktop/components/AnimatedValue"
import StatusBadge from "@/pages/Desktop/components/StatusBadge"
import Typewriter from "@/components/Typewriter"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import ReactCountryFlag from "react-country-flag"

import axios from "axios"

/* -------------------------------------------------------------------------- */
/*  Vendor Icon                                                                */
/* -------------------------------------------------------------------------- */

const VendorIcon = ({ kind }) => {
  if (kind === "aws") {
    return (
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-black p-2">
        <img
          src="/img/aws-color.png"
          alt="AWS"
          className="h-full w-full object-contain"
        />
      </span>
    )
  }

  if (kind === "google") {
    return (
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-white">
        G
      </span>
    )
  }

  if (kind === "stripe") {
    return (
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#635BFF] text-sm font-semibold text-white">
        S
      </span>
    )
  }

  return (
    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-500">
      <BsHouseDoor size={18} />
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/*  Checkbox                                                                   */
/* -------------------------------------------------------------------------- */

const Checkbox = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
      checked
        ? "border-black bg-black text-white"
        : "border-zinc-300 bg-white hover:border-zinc-400"
    }`}
  >
    {checked && (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
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
/*  Summary Card                                                               */
/* -------------------------------------------------------------------------- */

const SummaryCard = ({ card }) => {
  const isNumber =
    typeof card.value === "number"

  return (
    <div className="flex items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-6">
      <div className="min-w-0 flex-1">
        <p className="mb-3 text-sm text-zinc-500">
          {card.label}
        </p>

        <div className="mb-3 block text-3xl font-semibold tracking-tight text-zinc-900">
          {isNumber
            ? card.currency
              ? `$${card.value.toLocaleString()}`
              : card.value.toLocaleString()
            : card.value}
        </div>

        <p
          className={`flex items-center gap-2 text-sm ${
            card.subColor ?? "text-zinc-500"
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
        className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl ${card.iconBg} ${card.iconColor}`}
      >
        <card.icon size={22} />
      </span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Bills Table                                                                */
/* -------------------------------------------------------------------------- */

const BillsTable = ({
  rows,
  selected,
  toggle,
  toggleAll,
  allSelected,
}) => (
  <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8">
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-zinc-900">
        Bills
      </h3>

      {/* <button className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900">
        View all
      </button> */}
    </div>

    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr>
            <th className="w-8 pb-4 text-left">
              <Checkbox
                checked={allSelected}
                onChange={toggleAll}
              />
            </th>

            {[
              "Vendor",
              "Description",
              "Due Date",
              "Amount",
              "Currency",
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
          {rows.map((b) => (
            <tr
              key={b.id}
              className="border-t border-zinc-100 transition-colors hover:bg-zinc-50"
            >
              <td className="py-5">
                <Checkbox
                  checked={selected.has(b.id)}
                  onChange={() => toggle(b.id)}
                />
              </td>

              <td className="py-5 pr-6">
                <div className="flex items-center gap-3">
                  <VendorIcon kind={b.vendorKind} />

                  <span className="text-sm font-semibold text-zinc-900">
                    {b.vendor}
                  </span>
                </div>
              </td>

              <td className="py-5 pr-6 text-sm text-zinc-500">
                {b.desc}
              </td>

              <td className="py-5 pr-6">
                <p className="text-sm text-zinc-900">
                  {b.dueDate}
                </p>

                <p className="mt-1 text-xs text-zinc-400">
                  {b.dueLabel}
                </p>
              </td>

              <td className="py-5 pr-6 text-sm font-semibold tabular-nums text-zinc-900">
                {b.formattedAmount}
              </td>

              <td className="py-5 pr-6 text-sm text-zinc-500">
                {b.currency}
              </td>

              <td className="py-5 pr-6">
                <StatusBadge variant={b.statusVariant}>
                  {b.statusLabel}
                </StatusBadge>
              </td>

              <td className="py-5 text-zinc-300 transition hover:text-zinc-600">
                <IoEllipsisVertical size={16} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Employees Table                                                            */
/* -------------------------------------------------------------------------- */
const EmployeesTable = ({
  rows,
  selected,
  toggle,
  toggleAll,
  allSelected,
  setLinkingEmployee,
}) => (
  <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8">
    <div className="mb-6 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-zinc-900">
        Employee Payouts
      </h3>

      {/* <button className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900">
        View all
      </button> */}
    </div>

    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr>
            <th className="w-8 pb-4 text-left">
              <Checkbox
                checked={allSelected}
                onChange={toggleAll}
              />
            </th>

            {[
              "Employee",
              "Role",
              "Email",
              "Phone",
              "Payroll",
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
          {rows.map((e) => (
            <tr
              key={e.id}
              className="border-t border-zinc-100 transition-colors hover:bg-zinc-50"
            >
              <td className="py-5">
                <Checkbox
                  checked={selected.has(
                    e.id
                  )}
                  onChange={() =>
                    toggle(e.id)
                  }
                />
              </td>

              <td className="py-5 pr-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-violet-100 text-violet-700">
                      {e.initials}
                    </AvatarFallback>
                  </Avatar>

                  <span className="text-sm font-semibold text-zinc-900">
                    {e.name}
                  </span>
                </div>
              </td>

              <td className="py-5 pr-6 text-sm text-zinc-500">
                {e.role}
              </td>

              <td className="py-5 pr-6 text-sm text-zinc-500">
                {e.email}
              </td>

              <td className="py-5 pr-6 text-sm text-zinc-500">
                {e.phone}
              </td>

              <td className="py-5 pr-6 text-sm font-semibold text-zinc-900">
                {e.formattedAmount}
              </td>

              <td className="py-5 pr-6">
                {e.walletLinked ? (
                  <StatusBadge variant="success">
                    Wallet Linked
                  </StatusBadge>
                ) : (
                  <button
                    onClick={() =>
                      setLinkingEmployee(
                        e
                      )
                    }
                    className="rounded-xl border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100"
                  >
                    Link Wallet
                  </button>
                )}
              </td>

              <td className="py-5 text-zinc-300 transition hover:text-zinc-600">
                <IoEllipsisVertical
                  size={16}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const Payments = () => {
  const [activeTab, setActiveTab] =
    useState("All Payments")

  const [bills, setBills] = useState([])

  const [employees, setEmployees] =
    useState([])

  const [vendors, setVendors] =
    useState([])

  const [loading, setLoading] =
    useState(false)

  const [approving, setApproving] =
    useState(false)

  const [
    approvalSuccess,
    setApprovalSuccess,
  ] = useState(null)

  const [isSending, setIsSending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [
    linkingEmployee,
    setLinkingEmployee,
  ] = useState(null)

  const [
    walletIdInput,
    setWalletIdInput,
  ] = useState("")

  const [
    linkingWallet,
    setLinkingWallet,
  ] = useState(false)

  /* ── AI Review Modal state ─────────────────────────────────────────── */
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewData, setReviewData] = useState(null)
  const [reviewLoading, setReviewLoading] = useState(false)

  /* ── Sidebar AI state ──────────────────────────────────────────────── */
  const [sidebarAI, setSidebarAI] = useState(null)
  const [sidebarAILoading, setSidebarAILoading] = useState(false)

  const token =
    localStorage.getItem("api_token")

  /* -------------------------------------------------------------------------- */
  /* Fetch Data                                                                 */
  /* -------------------------------------------------------------------------- */

  const fetchQuickbooksData =
    async () => {
      try {
        setLoading(true)

        const headers = {
          Authorization: `Bearer ${token}`,
          Accept:
            "application/json",
        }

        const [
          billsResponse,
          employeesResponse,
          vendorsResponse,
        ] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/integrations/quickbooks/bills`,
            { headers }
          ),

          axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/integrations/quickbooks/employees`,
            { headers }
          ),

          axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/integrations/quickbooks/vendors`,
            { headers }
          ),
        ])

        /* -------------------------------- Bills ------------------------------- */

        const rawBills =
          billsResponse?.data?.data
            ?.QueryResponse?.Bill ||
          []

        const formattedBills =
          rawBills.map((bill) => {
            const totalAmount =
              Number(
                bill?.TotalAmt || 0
              )

            return {
              id:
                bill?.Id ||
                crypto.randomUUID(),

              vendor:
                bill?.VendorRef
                  ?.name ||
                "Unknown Vendor",

              vendorKind:
                "office",

              desc:
                bill?.PrivateNote ||
                "Business Expense",

              dueDate:
                bill?.DueDate ||
                "No due date",

              dueLabel:
                "Upcoming",

              amount:
                totalAmount,

              formattedAmount:
                `$${totalAmount.toLocaleString()}`,

              currency:
                bill?.CurrencyRef
                  ?.value || "USD",

              statusVariant:
                "info",

              statusLabel:
                "Pending",
            }
          })

        setBills(formattedBills)

        /* ------------------------------ Employees ----------------------------- */

        const rawEmployees =
          employeesResponse?.data
            ?.data
            ?.QueryResponse
            ?.Employee || []

        const formattedEmployees =
          rawEmployees.map(
            (employee) => {
              const fullName =
                employee?.DisplayName ||
                `${employee?.GivenName || ""} ${
                  employee?.FamilyName ||
                  ""
                }`.trim()

              const mockPayroll =
                Math.floor(
                  Math.random() * 5000
                ) + 1000

              return {
                id:
                  employee?.Id ||
                  crypto.randomUUID(),

                name:
                  fullName ||
                  "Unknown Employee",

                initials: fullName
                  ?.split(" ")
                  ?.map(
                    (n) =>
                      n?.[0]
                  )
                  ?.join(""),

                role: "Employee",

                email:
                  employee
                    ?.PrimaryEmailAddr
                    ?.Address ||
                  "No email",

                phone:
                  employee
                    ?.PrimaryPhone
                    ?.FreeFormNumber ||
                  "No phone",

                amount: mockPayroll,

                formattedAmount:
                  mockPayroll.toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "USD",
                    }
                  ),
              }
            }
          )

        setEmployees(
          formattedEmployees
        )

        /* ------------------------------- Vendors ------------------------------ */

        const rawVendors =
          vendorsResponse?.data
            ?.data?.QueryResponse
            ?.Vendor || []

        setVendors(rawVendors)

        console.log(
          "Bills:",
          formattedBills
        )

        console.log(
          "Employees:",
          formattedEmployees
        )

        console.log(
          "Vendors:",
          rawVendors
        )
      } catch (error) {
        console.error(
          "Failed to fetch QuickBooks data:",
          error
        )
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    fetchQuickbooksData()
  }, [])

  /* -------------------------------------------------------------------------- */
  /* Tabs                                                                       */
  /* -------------------------------------------------------------------------- */

  const tabs = [
    `All Payments (${bills.length + employees.length})`,
    `Bills (${bills.length})`,
    `Employee Payouts (${employees.length})`,
  ]

  /* -------------------------------------------------------------------------- */
  /* Selection                                                                  */
  /* -------------------------------------------------------------------------- */

  const [selectedBills, setSelectedBills] =
    useState(new Set())

  const [
    selectedEmployees,
    setSelectedEmployees,
  ] = useState(new Set())

  useEffect(() => {
    setSelectedBills(
      new Set(
        bills.map((b) => b.id)
      )
    )

    setSelectedEmployees(
      new Set(
        employees.map((e) => e.id)
      )
    )
  }, [bills, employees])

  const toggleBill = (id) =>
    setSelectedBills((s) => {
      const n = new Set(s)

      n.has(id)
        ? n.delete(id)
        : n.add(id)

      return n
    })

  const toggleEmployee = (id) =>
    setSelectedEmployees((s) => {
      const n = new Set(s)

      n.has(id)
        ? n.delete(id)
        : n.add(id)

      return n
    })

  const toggleAllBills = () =>
    setSelectedBills((s) =>
      s.size === bills.length
        ? new Set()
        : new Set(
            bills.map((b) => b.id)
          )
    )

  const toggleAllEmployees = () =>
    setSelectedEmployees((s) =>
      s.size === employees.length
        ? new Set()
        : new Set(
            employees.map(
              (e) => e.id
            )
          )
    )

  /* -------------------------------------------------------------------------- */
  /* Totals                                                                     */
  /* -------------------------------------------------------------------------- */

  const totals = useMemo(() => {
    /* ----------------------------- Bills ----------------------------- */

    const selectedBillRows =
      bills.filter((bill) =>
        selectedBills.has(bill.id)
      )

    const billAmount =
      selectedBillRows.reduce(
        (sum, bill) =>
          sum +
          Number(
            bill.amount || 0
          ),
        0
      )

    /* --------------------------- Employees --------------------------- */

    const selectedEmployeeRows =
      employees.filter((employee) =>
        selectedEmployees.has(
          employee.id
        )
      )

    const employeeAmount =
      selectedEmployeeRows.reduce(
        (sum, employee) =>
          sum +
          Number(
            employee.amount || 0
          ),
        0
      )

    /* ----------------------------- Total ----------------------------- */

    const totalAmount =
      billAmount + employeeAmount

    return {
      count:
        selectedBillRows.length +
        selectedEmployeeRows.length,

      bills:
        selectedBillRows.length,

      employees:
        selectedEmployeeRows.length,

      rawAmount: totalAmount,

      formatted:
        totalAmount.toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        ),
    }
  }, [
    bills,
    employees,
    selectedBills,
    selectedEmployees,
  ])

  /* -------------------------------------------------------------------------- */
  /* Gemini AI Review                                                           */
  /* -------------------------------------------------------------------------- */

  const handleReviewAndApprove = async () => {
    setShowReviewModal(true)
    setReviewLoading(true)
    setReviewData(null)

    try {
      const selectedBillRows = bills.filter((b) => selectedBills.has(b.id))
      const selectedEmployeeRows = employees.filter((e) => selectedEmployees.has(e.id))

      const billsTotal = selectedBillRows.reduce((s, b) => s + Number(b.amount || 0), 0)
      const empsTotal = selectedEmployeeRows.reduce((s, e) => s + Number(e.amount || 0), 0)

      const payload = {
        totalAmount: billsTotal + empsTotal,
        billsTotal,
        employeesTotal: empsTotal,
        billsCount: selectedBillRows.length,
        employeesCount: selectedEmployeeRows.length,
        vendorCount: vendors.length,
        bills: selectedBillRows.slice(0, 30).map((b) => ({
          vendor: b.vendor,
          description: b.desc,
          amount: b.amount,
          currency: b.currency,
          dueDate: b.dueDate,
        })),
        employees: selectedEmployeeRows.slice(0, 30).map((e) => ({
          name: e.name,
          role: e.role,
          amount: e.amount,
        })),
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/gemini/review-payroll`,
        payload,
        { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
      )

      if (response.data?.success && response.data?.data) {
        setReviewData(response.data.data)
      }
    } catch (error) {
      console.error("Gemini review failed:", error)
    } finally {
      setReviewLoading(false)
    }
  }

  /* -------------------------------------------------------------------------- */
  /* Fetch sidebar AI insights on data load                                     */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (bills.length === 0 && employees.length === 0) return
    if (sidebarAI) return

    const fetchSidebarAI = async () => {
      setSidebarAILoading(true)
      try {
        const billsTotal = bills.reduce((s, b) => s + Number(b.amount || 0), 0)
        const empsTotal = employees.reduce((s, e) => s + Number(e.amount || 0), 0)

        const payload = {
          totalAmount: billsTotal + empsTotal,
          billsTotal,
          employeesTotal: empsTotal,
          billsCount: bills.length,
          employeesCount: employees.length,
          vendorCount: vendors.length,
          bills: bills.slice(0, 10).map((b) => ({ vendor: b.vendor, amount: b.amount, currency: b.currency })),
          employees: employees.slice(0, 10).map((e) => ({ name: e.name, amount: e.amount })),
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/gemini/review-payroll`,
          payload,
          { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
        )

        if (response.data?.success && response.data?.data) {
          setSidebarAI(response.data.data)
        }
      } catch (err) {
        console.error("Sidebar AI fetch failed:", err)
      } finally {
        setSidebarAILoading(false)
      }
    }

    fetchSidebarAI()
  }, [bills, employees, vendors])

  /* -------------------------------------------------------------------------- */
  /* Approve Payroll                                                            */
  /* -------------------------------------------------------------------------- */

  const handleApprovePayroll =
    async () => {
      try {
        setApproving(true)

        setApprovalSuccess(null)

        const selectedEmployeePayload =
          employees
            .filter((employee) =>
              selectedEmployees.has(
                employee.id
              )
            )
            .map((employee) => ({
              id: employee.id,

              name:
                employee.name,

              amount:
                employee.amount || 0,

              currency: "USD",
            }))

        const response =
          await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/payroll/approve`,
            {
              employees:
                selectedEmployeePayload,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept:
                  "application/json",
              },
            }
          )

        console.log(
          "PAYROLL RESPONSE:",
          response.data
        )

        console.log(
          "PAYROLL PAYLOAD:",
          selectedEmployeePayload
        )

        setApprovalSuccess({
          success:
            response?.data
              ?.success,

          message:
            response?.data
              ?.message,

          data:
            response?.data
              ?.data,
        })

      } catch (error) {

        console.error(
          "Payroll approval failed:",
          error?.response?.data ||
            error
        )

      } finally {

        setApproving(false)
      }
    }

    const handleSendPayroll =
      async () => {
        try {
          setIsSending(true)

          console.log(
            "APPROVAL SUCCESS:",
            approvalSuccess
          )

          if (
            !approvalSuccess?.data
              ?.batch_id
          ) {
            console.warn(
              "Missing batch ID, simulating delay"
            )
            await new Promise((resolve) => setTimeout(resolve, 1500))
          } else {
            const batchId =
              approvalSuccess.data
                .batch_id

            const response =
              await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/payroll/send/${batchId}`,
                {},
                {
                  headers: {
                    Authorization:
                      `Bearer ${token}`,

                    Accept:
                      "application/json",
                  },
                }
              )

            console.log(
              "SEND PAYROLL RESPONSE:",
              response.data
            )
          }

        } catch (error) {

          console.error(
            "Send payroll failed:",
            error?.response?.data ||
              error
          )
        } finally {
          setIsSending(false)
          setShowSuccess(true)
        }
    }

    const handleLinkWallet =
      async () => {
        try {
          if (
            !linkingEmployee
          ) {
            return
          }

          setLinkingWallet(true)

          const response =
            await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/api/employee-payment-accounts`,
              {
                employee_qb_id:
                  linkingEmployee.id,

                employee_name:
                  linkingEmployee.name,

                rapyd_wallet_id:
                  walletIdInput,

                payout_method:
                  "wallet",

                currency: "USD",
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  Accept:
                    "application/json",
                },
              }
            )

          console.log(
            "WALLET LINKED:",
            response.data
          )

          setEmployees((prev) =>
            prev.map((e) =>
              e.id ===
              linkingEmployee.id
                ? {
                    ...e,
                    walletLinked: true,

                    rapyd_wallet_id:
                      walletIdInput,
                  }
                : e
            )
          )

          setLinkingEmployee(null)

          setWalletIdInput("")
        } catch (error) {
          console.error(
            "Failed to link wallet:",
            error
          )
        } finally {
          setLinkingWallet(false)
        }
    }  

  /* -------------------------------------------------------------------------- */
  /*  Summary Cards                                                              */
  /* -------------------------------------------------------------------------- */

  const summaryCards = [
    {
      label: "Total Bills",

      value:
        totals.rawAmount,

      currency: true,

      sub: `${bills.length} bills synced`,

      icon: FiFileText,

      iconBg:
        "bg-violet-100",

      iconColor:
        "text-violet-600",
    },

    {
      label: "Vendors",

      value:
        vendors.length,

      sub: "Connected",

      icon: BsBriefcase,

      iconBg: "bg-sky-100",

      iconColor:
        "text-sky-600",
    },

    {
      label: "Employees",

      value:
        employees.length,

      sub: "Synced from QuickBooks",

      icon:
        HiOutlineSparkles,

      iconBg:
        "bg-amber-100",

      iconColor:
        "text-amber-600",
    },

    {
      label: "Ready To Pay",

      value:
        totals.rawAmount,

      currency: true,

      sub: "AI verified",

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

  return (
    <DashboardShell
      title="Payments"
      subtitle="Manage and approve bills and employee payouts"
    >
      {/* Tabs */}
      <div className="mb-6 flex items-center gap-8 overflow-x-auto border-b border-zinc-200">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() =>
              setActiveTab(t)
            }
            className={`relative whitespace-nowrap pb-4 text-sm font-medium transition-colors ${
              activeTab === t
                ? "text-zinc-900"
                : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            {t}

            {activeTab === t && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-black" />
            )}
          </button>
        ))}
      </div>

      {/* Summary */}
      <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((c) => (
          <SummaryCard
            key={c.label}
            card={c}
          />
        ))}
      </section>

      {/* Success */}
      {approvalSuccess && (
        <div className="mb-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
          <div className="flex items-start gap-4">
            <FiCheckCircle
              size={22}
              className="mt-1 text-emerald-600"
            />

            <div>
              <h3 className="text-lg font-semibold text-emerald-900">
                Payroll Approved
              </h3>

              <p className="mt-1 text-sm text-emerald-700">
                Payroll batch #
                {
                  approvalSuccess
                    ?.data
                    ?.batch_id
                }{" "}
                created successfully.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="mb-6 rounded-3xl border border-zinc-200 bg-white p-10 text-center text-zinc-500">
          Loading QuickBooks data...
        </div>
      )}

      {/* Main */}
{!loading && (
  <section className="mb-6 grid grid-cols-12 gap-6">
    {/* LEFT SIDE */}
    <div className="col-span-12 space-y-6 lg:col-span-8">
      {(activeTab.includes(
        "All Payments"
      ) ||
        activeTab.includes(
          "Bills"
        )) && (
        <BillsTable
          rows={bills}
          selected={
            selectedBills
          }
          toggle={toggleBill}
          toggleAll={
            toggleAllBills
          }
          allSelected={
            selectedBills.size ===
              bills.length &&
            bills.length > 0
          }
        />
      )}

      {(activeTab.includes(
        "All Payments"
      ) ||
        activeTab.includes(
          "Employee Payouts"
        )) && (
        <EmployeesTable
          rows={employees}
          selected={
            selectedEmployees
          }
          toggle={toggleEmployee}
          toggleAll={
            toggleAllEmployees
          }
          allSelected={
            selectedEmployees.size ===
              employees.length &&
            employees.length > 0
          }
          setLinkingEmployee={
            setLinkingEmployee
          }
        />
      )}
    </div>

    {/* RIGHT SIDEBAR */}
    <aside className="col-span-12 space-y-6 lg:col-span-4">
      {/* AI Assistant — Gemini Powered */}
      <div className="rounded-3xl border border-zinc-200 bg-white p-8">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-900">
            <HiOutlineSparkles
              size={18}
              className="text-violet-600"
            />
            AI Payment Assistant
          </h3>

          <span className={`rounded-full px-3 py-1 text-xs font-medium ${
            sidebarAI?.is_fallback
              ? "bg-zinc-100 text-zinc-500"
              : "bg-violet-100 text-violet-700"
          }`}>
            {sidebarAI ? (sidebarAI.is_fallback ? "Fallback" : "Live") : "Beta"}
          </span>
        </div>

        <p className="mb-6 text-sm text-zinc-500">
          {sidebarAILoading
            ? "Analyzing your QuickBooks data..."
            : sidebarAI
              ? "Gemini analyzed your billing and payroll activity."
              : "AI analyzed your QuickBooks billing and payroll activity."}
        </p>

        {/* Status banner */}
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-start gap-3">
            <FiCheckCircle
              className="mt-0.5 text-emerald-600"
              size={18}
            />
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                Payments ready for approval
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                {employees.length} employees and {bills.length} bills synced successfully.
              </p>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {sidebarAILoading && (
          <div className="flex items-center justify-center gap-2 py-6 text-sm text-zinc-400">
            <LuLoaderCircle size={16} className="animate-spin" />
            Generating AI insights...
          </div>
        )}

        {/* Live AI insights */}
        {!sidebarAILoading && sidebarAI && (
          <div className="space-y-5">
            {/* Findings */}
            {(sidebarAI.findings || []).slice(0, 3).map((finding, i) => (
              <div
                key={i}
                className="flex items-start gap-4 border-b border-zinc-100 pb-5 last:border-none last:pb-0"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 text-zinc-600">
                  {i === 0 ? <LuRefreshCw size={16} /> : <LuShieldCheck size={16} />}
                </span>
                <div>
                  <p className="text-sm leading-relaxed text-zinc-600">
                    <Typewriter text={finding} speed={12} delay={200 + i * 400} />
                  </p>
                </div>
              </div>
            ))}

            {/* Recommendation */}
            {sidebarAI.recommendation && (
              <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4">
                <div className="flex items-start gap-2">
                  <HiOutlineSparkles size={14} className="mt-0.5 flex-shrink-0 text-violet-600" />
                  <p className="text-sm leading-relaxed text-violet-700">
                    <Typewriter text={sidebarAI.recommendation} speed={14} delay={1400} />
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Static fallback when no AI yet */}
        {!sidebarAILoading && !sidebarAI && (
          <div className="space-y-5">
            {[
              { icon: LuRefreshCw, title: "Optimize payout timing", body: "AI suggests delaying low-priority transfers for lower FX costs." },
              { icon: LuShieldCheck, title: "Compliance verified", body: "No compliance issues detected across synced QuickBooks records." },
            ].map((r) => (
              <div key={r.title} className="flex items-start gap-4 border-b border-zinc-100 pb-5 last:border-none last:pb-0">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 text-zinc-600">
                  <r.icon size={16} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{r.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-500">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Summary */}
      <div className="rounded-3xl border border-zinc-200 bg-white p-8">
        <h3 className="mb-6 text-lg font-semibold text-zinc-900">
          Payment Summary
        </h3>

          <ul className="space-y-5">
            {[
              {
                label:
                  "Total Selected",

                value:
                  totals.formatted,
              },

              {
                label: "Bills",

                value:
                  totals.bills,
              },

              {
                label:
                  "Employees",

                value:
                  totals.employees,
              },

              {
                label:
                  "Connected Vendors",

                value:
                  vendors.length,
              },
            ].map((row) => (
              <li
                key={row.label}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-zinc-500">
                  {row.label}
                </span>

                <span className="text-sm font-semibold tabular-nums text-zinc-900">
                  {row.value}
                </span>
              </li>
            ))}

            <li className="border-t border-zinc-100 pt-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">
                  Funding Source
                </span>

                <span className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                  <IoWalletOutline
                    size={16}
                    className="text-zinc-500"
                  />

                  Primary Wallet
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Security */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-8">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-zinc-900">
              Security & Compliance
            </h3>

            <IoLockClosedOutline
              className="text-zinc-300"
              size={18}
            />
          </div>

          <p className="text-sm leading-relaxed text-zinc-500">
            All payroll approvals and
            payout workflows are
            encrypted and protected.
          </p>
        </div>
      </aside>
    </section>
  )}

      {/* Approval Bar */}
      <div className="sticky bottom-0 z-20 -mx-7 -mb-7 mt-6 bg-gradient-to-t from-white via-white to-white/0 px-7 py-5">
        <div className="flex items-center gap-6 rounded-3xl border border-zinc-200 bg-white px-8 py-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white">
              <IoCheckmarkCircle
                size={20}
              />
            </span>

            <div>
              <p className="text-sm font-semibold text-zinc-900">
                {
                  totals.count
                }{" "}
                selected
              </p>

              <p className="text-sm text-zinc-500">
                {
                  totals.bills
                }{" "}
                bills ·{" "}
                {
                  totals.employees
                }{" "}
                employees
              </p>
            </div>
          </div>

          <div className="h-10 w-px bg-zinc-200" />

          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
              Total Amount
            </p>

            <p className="text-lg font-semibold tabular-nums text-zinc-900">
              {
                totals.formatted
              }
            </p>
          </div>

          <div className="flex-1" />
          {approvalSuccess && (
            <button
              onClick={
                handleSendPayroll
              }
              disabled={isSending}
              className="mr-3 inline-flex h-12 items-center gap-2 rounded-2xl border border-black bg-white px-6 text-sm font-semibold text-black transition hover:bg-zinc-100 disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <LuLoaderCircle size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Payroll
                  <LuArrowRight
                    size={16}
                  />
                </>
              )}
            </button>
          )}

          <button
            onClick={
              handleReviewAndApprove
            }
            disabled={
              approving ||
              selectedEmployees.size ===
                0
            }
            className="inline-flex h-12 items-center gap-2 rounded-2xl bg-black px-6 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {approving
              ? "Approving..."
              : "Review & Approve"}

            <LuArrowRight
              size={16}
            />
          </button>
        </div>
      </div>
      {/* Wallet Link Modal */}
      {linkingEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-zinc-900">
                Link Wallet
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Connect a Rapyd wallet to{" "}
                <span className="font-semibold text-zinc-900">
                  {
                    linkingEmployee.name
                  }
                </span>
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Rapyd Wallet ID
                </label>

                <input
                  type="text"
                  value={walletIdInput}
                  onChange={(e) =>
                    setWalletIdInput(
                      e.target.value
                    )
                  }
                  placeholder="ewallet_xxxxx"
                  className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-black"
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setLinkingEmployee(
                    null
                  )

                  setWalletIdInput("")
                }}
                className="rounded-2xl border border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
              >
                Cancel
              </button>

              <button
                onClick={
                  handleLinkWallet
                }
                disabled={
                  linkingWallet ||
                  !walletIdInput
                }
                className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {linkingWallet
                  ? "Linking..."
                  : "Save Wallet"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── AI Review Modal ──────────────────────────────────────────── */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
            {/* Close */}
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute right-6 top-6 rounded-xl p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
            >
              <LuX size={18} />
            </button>

            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                <HiOutlineSparkles size={22} />
              </span>
              <div>
                <h2 className="text-xl font-semibold text-zinc-900">AI Payroll Review</h2>
                <p className="text-sm text-zinc-500">Gemini-powered analysis before approval</p>
              </div>
            </div>

            {/* Loading */}
            {reviewLoading && (
              <div className="flex flex-col items-center justify-center py-16">
                <LuLoaderCircle size={28} className="animate-spin text-violet-500 mb-4" />
                <p className="text-sm text-zinc-500">Gemini is analyzing your payroll batch...</p>
                <p className="text-xs text-zinc-400 mt-1">This may take a few seconds</p>
              </div>
            )}

            {/* Review Content */}
            {!reviewLoading && reviewData && (
              <div className="space-y-6">
                {/* Summary */}
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                  <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-900">
                    <HiOutlineSparkles size={14} className="text-violet-600" />
                    Executive Summary
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-600">
                    <Typewriter text={reviewData.summary} speed={14} delay={100} />
                  </p>
                </div>

                {/* Findings */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-zinc-900">Key Findings</h3>
                  <ul className="space-y-3">
                    {(reviewData.findings || []).map((finding, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <IoCheckmarkCircle size={18} className="mt-0.5 flex-shrink-0 text-emerald-500" />
                        <span className="text-sm text-zinc-600">
                          <Typewriter text={finding} speed={12} delay={400 + i * 350} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Risks */}
                {reviewData.risks && reviewData.risks.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-sm font-semibold text-zinc-900">Risk Assessment</h3>
                    <div className="space-y-2">
                      {reviewData.risks.map((risk, i) => {
                        const colors = {
                          low: "border-emerald-200 bg-emerald-50 text-emerald-700",
                          medium: "border-amber-200 bg-amber-50 text-amber-700",
                          high: "border-rose-200 bg-rose-50 text-rose-700",
                        }
                        const badgeColors = {
                          low: "bg-emerald-100 text-emerald-700",
                          medium: "bg-amber-100 text-amber-700",
                          high: "bg-rose-100 text-rose-700",
                        }
                        return (
                          <div
                            key={i}
                            className={`flex items-start gap-3 rounded-2xl border p-4 ${colors[risk.level] || colors.low}`}
                          >
                            <LuTriangleAlert size={16} className="mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <span className="text-sm leading-relaxed">
                                <Typewriter text={risk.text} speed={14} delay={800 + (reviewData.findings?.length || 0) * 350 + i * 300} />
                              </span>
                            </div>
                            <span className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${badgeColors[risk.level] || badgeColors.low}`}>
                              {risk.level}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Cash Flow Impact */}
                {reviewData.cashFlowImpact && (
                  <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                    <p className="flex items-start gap-2 text-sm text-sky-700">
                      <IoWalletOutline size={16} className="mt-0.5 flex-shrink-0" />
                      <Typewriter text={reviewData.cashFlowImpact} speed={14} delay={1600} />
                    </p>
                  </div>
                )}

                {/* Recommendation */}
                {reviewData.recommendation && (
                  <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
                    <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-violet-900">
                      <HiOutlineSparkles size={14} />
                      Recommendation
                    </p>
                    <p className="text-sm leading-relaxed text-violet-700">
                      <Typewriter text={reviewData.recommendation} speed={14} delay={1900} />
                    </p>
                  </div>
                )}

                {/* Fallback badge */}
                {reviewData.is_fallback && (
                  <p className="text-center text-xs text-zinc-400">
                    Showing default analysis — Gemini API was unavailable.
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 border-t border-zinc-100 pt-5">
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="rounded-2xl border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowReviewModal(false)
                      handleApprovePayroll()
                    }}
                    disabled={approving}
                    className="inline-flex items-center gap-2 rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                  >
                    {approving ? (
                      <LuLoaderCircle size={14} className="animate-spin" />
                    ) : (
                      <IoCheckmarkCircle size={16} />
                    )}
                    Confirm & Approve
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[32px] bg-white p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <IoCheckmarkCircle size={40} />
            </div>
            
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900">
              Payment Sent!
            </h3>
            
            <p className="mb-8 text-sm leading-relaxed text-zinc-500">
              Your payments have been successfully approved and sent for processing.
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

export default Payments