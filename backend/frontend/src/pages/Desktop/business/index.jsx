import { Route } from "react-router-dom"
import DashboardLayout from "@/layouts/DashboardLayout"
import BusinessSidebar from "./components/BusinessSidebar"
import Overview from "./overview/Overview"

// Add more imports as pages are built:
// import Accounts from "./accounts/Accounts"
// import Transactions from "./transactions/Transactions"
// import Payments from "./payments/Payments"
// import Payouts from "./payouts/Payouts"
// import Reports from "./reports/Reports"
// import AiInsights from "./ai-insights/AiInsights"
// import Automations from "./automations/Automations"
// import Recipients from "./recipients/Recipients"
// import Settings from "./settings/Settings"

const BusinessRoutes = (
  <Route element={<DashboardLayout sidebar={<BusinessSidebar />} />}>
    <Route index element={<Overview />} />
    {/* Uncomment as you build each page: */}
    {/* <Route path="accounts" element={<Accounts />} /> */}
    {/* <Route path="transactions" element={<Transactions />} /> */}
    {/* <Route path="payments" element={<Payments />} /> */}
    {/* <Route path="payouts" element={<Payouts />} /> */}
    {/* <Route path="reports" element={<Reports />} /> */}
    {/* <Route path="ai-insights" element={<AiInsights />} /> */}
    {/* <Route path="automations" element={<Automations />} /> */}
    {/* <Route path="recipients" element={<Recipients />} /> */}
    {/* <Route path="settings" element={<Settings />} /> */}
  </Route>
)

export default BusinessRoutes
