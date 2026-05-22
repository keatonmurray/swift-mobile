import React, { useEffect, useState } from "react"
import {
  FiSearch,
  FiChevronDown,
  FiChevronRight,
  FiMoreHorizontal,
} from "react-icons/fi"

import axios from "axios"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"

/* -------------------------------------------------------------------------- */
/*  Styles                                                                     */
/* -------------------------------------------------------------------------- */

const statusStyles = {
  Active:
    "bg-emerald-50 text-emerald-700 border border-emerald-100",

  Disabled:
    "bg-red-50 text-red-700 border border-red-100",
}

const typeStyles = {
  Employee:
    "bg-violet-50 text-violet-700 border border-violet-100",

  Contractor:
    "bg-sky-50 text-sky-700 border border-sky-100",

  Vendor:
    "bg-amber-50 text-amber-700 border border-amber-100",
}

const recentActivity = [
  {
    title: "New recipient added",
    subtitle: "Sarah Johnson",
    color: "bg-emerald-500",
  },

  {
    title: "Recipient updated",
    subtitle: "Michael Lee",
    color: "bg-sky-500",
  },

  {
    title: "Verification pending",
    subtitle: "Emma Wilson",
    color: "bg-amber-500",
  },
]

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const Recipients = () => {
  const [qbEmployees, setQBEmployees] = useState([])

  const [loadingQBEmployees, setLoadingQBEmployees] =
    useState(false)

  const token = localStorage.getItem("api_token")

  /* -------------------------------------------------------------------------- */
  /*  Fetch QB Employees                                                        */
  /* -------------------------------------------------------------------------- */

  const getQBEmployees = async () => {
    try {
      setLoadingQBEmployees(true)

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/integrations/quickbooks/employees`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      const employees =
        response?.data?.data?.QueryResponse?.Employee ||
        []

      const formattedEmployees = employees.map(
        (employee) => ({
          id: employee?.Id || crypto.randomUUID(),

          name:
            employee?.DisplayName ||
            `${employee?.GivenName || ""} ${
              employee?.FamilyName || ""
            }`.trim() ||
            "Unknown Employee",

          firstName: employee?.GivenName || "",

          lastName: employee?.FamilyName || "",

          active: employee?.Active || false,

          email:
            employee?.PrimaryEmailAddr?.Address ||
            "No email",

          phone:
            employee?.PrimaryPhone
              ?.FreeFormNumber || null,

          address:
            employee?.PrimaryAddr?.Line1 || null,

          hiredDate:
            employee?.HiredDate || null,
        })
      )

      setQBEmployees(formattedEmployees)
    } catch (error) {
      console.error(
        "Failed to fetch QuickBooks employees:",
        error
      )
    } finally {
      setLoadingQBEmployees(false)
    }
  }

  useEffect(() => {
    getQBEmployees()
  }, [])

  /* -------------------------------------------------------------------------- */
  /*  Recipients                                                                 */
  /* -------------------------------------------------------------------------- */

  const recipients = qbEmployees.map((employee) => {
    const fullName =
      employee?.name || "Unknown Employee"

    return {
      id: employee?.id,

      name: fullName,

      initials: fullName
        .split(" ")
        .map((n) => n?.[0] || "")
        .join(""),

      email: employee?.email || "No email",

      country: "United States",

      flag: "🇺🇸",

      type: "Employee",

      currency: "USD",

      status: employee?.active
        ? "Active"
        : "Disabled",

      hiredDate: employee?.hiredDate || null,

      phone: employee?.phone || null,
    }
  })

  /* -------------------------------------------------------------------------- */
  /*  Summary                                                                    */
  /* -------------------------------------------------------------------------- */

  const totalRecipients = recipients.length

  const totalCountries = [
    ...new Set(
      recipients.map(
        (recipient) => recipient.country
      )
    ),
  ].length

  const summaryStatuses = [
    {
      label: "Active",

      count: recipients.filter(
        (recipient) =>
          recipient.status === "Active"
      ).length,

      color: "bg-green-500",
    },

    {
      label: "Disabled",

      count: recipients.filter(
        (recipient) =>
          recipient.status === "Disabled"
      ).length,

      color: "bg-red-500",
    },
  ]

  return (
    <DashboardShell
      title="Recipients"
      subtitle="Manage employees, contractors, and vendors you send payments to"
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <div className="flex items-center gap-2 h-9 bg-white border border-gray-200 rounded-full px-3 w-[220px]">
          <FiSearch
            size={13}
            className="text-gray-400 flex-shrink-0"
          />

          <input
            type="text"
            placeholder="Search recipients..."
            className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-gray-400 min-w-0"
          />
        </div>

        {/* {[
          "All Recipients",
          "All Countries",
          "All Types",
          "All Statuses",
        ].map((item) => (
          <button
            key={item}
            className="inline-flex items-center gap-1.5 h-9 text-[12px] text-gray-600 bg-white border border-gray-200 rounded-full px-3 hover:bg-gray-50 transition-colors"
          >
            {item}

            <FiChevronDown
              size={11}
              className="text-gray-400"
            />
          </button>
        ))} */}
      </div>

      {/* Main */}
      <section className="grid grid-cols-12 gap-4">
        {/* LEFT */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-gray-200 rounded-[20px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-left border-b border-gray-50">
                  {[
                    "Recipient",
                    "Country",
                    "Type",
                    "Currency",
                    "Status",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {loadingQBEmployees ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center text-sm text-gray-400"
                    >
                      Loading QuickBooks employees...
                    </td>
                  </tr>
                ) : recipients.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center text-sm text-gray-400"
                    >
                      No employees found.
                    </td>
                  </tr>
                ) : (
                  recipients.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                    >
                      {/* Recipient */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-[11px] font-semibold text-gray-600">
                            {r.initials}
                          </div>

                          <div>
                            <p className="text-[13px] font-medium text-gray-800 leading-tight">
                              {r.name}
                            </p>

                            <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
                              {r.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Country */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 text-[13px] text-gray-500">
                          <span className="text-base">
                            {r.flag}
                          </span>

                          {r.country}
                        </span>
                      </td>

                      {/* Type */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center text-[11px] font-semibold rounded-full px-2.5 py-1 ${
                            typeStyles[r.type] || ""
                          }`}
                        >
                          {r.type}
                        </span>
                      </td>

                      {/* Currency */}
                      <td className="px-5 py-4 text-[13px] font-semibold text-gray-900 tabular-nums">
                        {r.currency}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center text-[11px] font-semibold rounded-full px-2.5 py-1 ${
                            statusStyles[r.status] || ""
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          {/* <button className="h-8 w-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                            <FiMoreHorizontal size={13} />
                          </button>

                          <button className="h-8 w-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                            <FiChevronRight size={13} />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-50">
            <p className="text-[12px] text-gray-400">
              Showing {recipients.length} recipients
            </p>

            <div className="flex items-center gap-1.5">
              {/* {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`h-8 w-8 flex items-center justify-center rounded-xl text-[12px] font-medium transition-colors ${
                    page === 1
                      ? "bg-black text-white"
                      : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))} */}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <aside className="col-span-12 lg:col-span-4 space-y-4">
          {/* Summary */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-5">
            <h3 className="text-[14px] font-semibold text-gray-900 mb-0.5">
              Recipient Summary
            </h3>

            <p className="text-[12px] text-gray-400 mb-4">
              Overview of your payout network
            </p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-400">
                  Total Recipients
                </span>

                <span className="text-[14px] font-semibold text-gray-900 tabular-nums">
                  {totalRecipients}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-400">
                  Countries
                </span>

                <span className="text-[14px] font-semibold text-gray-900 tabular-nums">
                  {totalCountries}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3">
              {summaryStatuses.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full flex-shrink-0 ${item.color}`}
                    />

                    <span className="text-[13px] text-gray-600">
                      {item.label}
                    </span>
                  </div>

                  <span className="text-[13px] font-medium text-gray-900 tabular-nums">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-semibold text-gray-900">
                Recent Activity
              </h3>

              {/* <button className="text-[12px] font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                View all
              </button> */}
            </div>

            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3"
                >
                  <div
                    className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${item.color}`}
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-gray-800 leading-snug">
                      {item.title}
                    </p>

                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </DashboardShell>
  )
}

export default Recipients