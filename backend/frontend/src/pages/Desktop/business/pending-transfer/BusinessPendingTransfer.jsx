import DashboardShell from "../../components/DashboardShell"
import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import {
  IoCheckmarkCircle,
  IoClose,
  IoTimeOutline,
} from "react-icons/io5"

const BusinessPendingTransfer = () => {

  const token = localStorage.getItem("api_token")

  const [pendingTransfers, setPendingTransfers] = useState([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState(null)


  // ======================================================
  // Fetch pending transfers
  // ======================================================

  const getPendingWalletTransactions = async () => {

    try {

      setLoading(true)

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/get-pending-wallet-transactions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      setPendingTransfers(response.data?.data || [])

    } catch (error) {

      console.error(
        "Failed to fetch pending wallet transfers:",
        error.response?.data || error.message
      )

    } finally {

      setLoading(false)
    }
  }


  // ======================================================
  // Accept transfer
  // ======================================================

  const acceptTransfer = async (transferId) => {
    try {

      setProcessingId(transferId)

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/accept-wallet-transfer`,
        {
          transfer_id: transferId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      // ======================================================
      // Remove accepted transfer from UI
      // ======================================================

      setPendingTransfers((prev) =>
        prev.filter(
          (t) => t.rapyd_transfer_id !== transferId
        )
      )

    } catch (error) {

      console.error(
        "Failed to accept transfer:",
        error.response?.data || error.message
      )

    } finally {

      setProcessingId(null)
    }
  }


  // ======================================================
  // Load data
  // ======================================================

  useEffect(() => {
    getPendingWalletTransactions()
  }, [])


  // ======================================================
  // Stats
  // ======================================================

  const totalPending = pendingTransfers.length

  const pendingAmount = useMemo(() => {

    return pendingTransfers.reduce((sum, transfer) => {
      return sum + Number(transfer.amount || 0)
    }, 0)

  }, [pendingTransfers])


  return (
    <DashboardShell
        title="Pending Transfer"
      subtitle="Accept any pending transfers to add it into your total balance."
    >

      <div className="space-y-6">
        {/* ====================================================== */}
        {/* Summary cards */}
        {/* ====================================================== */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="rounded-[28px] border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">
              Total Pending
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-black">
              {totalPending}
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Transfers
            </p>
          </div>


          <div className="rounded-[28px] border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">
              Pending Amount
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-black">
              $
              {pendingAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              USD
            </p>
          </div>


          <div className="rounded-[28px] border border-zinc-200 bg-white p-5">
            <p className="text-sm text-zinc-500">
              Auto-debited in
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-black">
              7 days
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Auto-debit enabled
            </p>
          </div>
        </div>


        {/* ====================================================== */}
        {/* Transfers table */}
        {/* ====================================================== */}

        <div className="overflow-hidden rounded-[32px] border border-zinc-200 bg-white">

          <div className="border-b border-zinc-100 px-6 py-5">
            <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-black">
              Pending Transfers
            </h2>
          </div>


          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-200 border-t-black" />
            </div>
          )}


          {/* Empty state */}
          {!loading && pendingTransfers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
                <IoCheckmarkCircle className="text-3xl text-zinc-400" />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-black">
                No pending transfers
              </h3>

              <p className="mt-2 max-w-sm text-sm text-zinc-500">
                You currently have no pending wallet transfers awaiting approval.
              </p>
            </div>
          )}


          {/* Table */}
          {!loading && pendingTransfers.length > 0 && (

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="border-b border-zinc-100 bg-zinc-50/70">

                  <tr className="text-left">

                    <th className="px-6 py-4 text-xs font-medium uppercase tracking-[0.12em] text-zinc-400">
                      From
                    </th>

                    <th className="px-6 py-4 text-xs font-medium uppercase tracking-[0.12em] text-zinc-400">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-xs font-medium uppercase tracking-[0.12em] text-zinc-400">
                      Created
                    </th>

                    <th className="px-6 py-4 text-xs font-medium uppercase tracking-[0.12em] text-zinc-400">
                      Auto-debited in
                    </th>

                    <th className="px-6 py-4 text-xs font-medium uppercase tracking-[0.12em] text-zinc-400">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-[0.12em] text-zinc-400">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {pendingTransfers.map((transfer) => {

                    const senderName =
                      `${transfer.sender?.first_name || ""} ${transfer.sender?.last_name || ""}`

                    return (

                      <tr
                        key={transfer.id}
                        className="border-b border-zinc-100 last:border-none"
                      >

                        {/* Sender */}
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
                              {senderName?.charAt(0)}
                            </div>

                            <div>

                              <p className="text-sm font-semibold text-black">
                                {senderName}
                              </p>

                              <p className="mt-1 text-sm text-zinc-500">
                                {transfer.sender?.email}
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* Amount */}
                        <td className="px-6 py-5">

                          <p className="text-sm font-semibold text-black">
                            $
                            {Number(transfer.amount).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>

                          <span className="mt-2 inline-flex rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
                            {transfer.currency}
                          </span>

                        </td>


                        {/* Created */}
                        <td className="px-6 py-5">

                          <p className="text-sm font-medium text-black">
                            {new Date(
                              transfer.created_at
                            ).toLocaleDateString()}
                          </p>

                          <p className="mt-1 text-sm text-zinc-500">
                            {new Date(
                              transfer.created_at
                            ).toLocaleTimeString()}
                          </p>

                        </td>


                        {/* Expiration */}
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2 text-orange-500">

                            <IoTimeOutline className="text-lg" />

                            <span className="text-sm font-medium">
                            7 days
                            </span>

                          </div>

                        </td>


                        {/* Status */}
                        <td className="px-6 py-5">

                          <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                            Pending
                          </span>

                        </td>


                        {/* Actions */}
                        <td className="px-6 py-5">

                          <div className="flex items-center justify-end gap-3">

                            {/* <button
                              className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-100"
                            >
                              Decline
                            </button> */}

                            <button
                              onClick={() =>
                                acceptTransfer(
                                  transfer.rapyd_transfer_id
                                )
                              }
                              disabled={
                                processingId === transfer.rapyd_transfer_id
                              }
                              className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {processingId === transfer.rapyd_transfer_id
                                ? "Accepting..."
                                : "Accept"}
                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  })}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

    </DashboardShell>
  )
}

export default BusinessPendingTransfer