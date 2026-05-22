import { Route } from "react-router-dom"
import DashboardLayout from "@/layouts/DashboardLayout"
import PersonalSidebar from "./components/PersonalSidebar"
import Overview from "./overview/Overview"

// Add more imports as pages are built:
// import Pay from "./pay/Pay"
// import Transactions from "./transactions/Transactions"
// import Cards from "./cards/Cards"
// import Expenses from "./expenses/Expenses"
// import Reports from "./reports/Reports"
// import Documents from "./documents/Documents"
// import Goals from "./goals/Goals"
// import Settings from "./settings/Settings"

const PersonalRoutes = (
  <Route element={<DashboardLayout sidebar={<PersonalSidebar />} />}>
    <Route index element={<Overview />} />
    {/* Uncomment as you build each page: */}
    {/* <Route path="pay" element={<Pay />} /> */}
    {/* <Route path="transactions" element={<Transactions />} /> */}
    {/* <Route path="cards" element={<Cards />} /> */}
    {/* <Route path="expenses" element={<Expenses />} /> */}
    {/* <Route path="reports" element={<Reports />} /> */}
    {/* <Route path="documents" element={<Documents />} /> */}
    {/* <Route path="goals" element={<Goals />} /> */}
    {/* <Route path="settings" element={<Settings />} /> */}
  </Route>
)

export default PersonalRoutes
