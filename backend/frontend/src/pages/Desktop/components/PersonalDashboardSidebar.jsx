import { IoHomeOutline } from "react-icons/io5";
import { GoCreditCard } from "react-icons/go";
import { TbArrowsExchange } from "react-icons/tb";
import { BsCreditCard2Front } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";
import { TbReportAnalytics } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuGoal } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

const PersonalDashboardSidebar = () => {
  return (
    <div className="swift desktop-view homepage p-md-4 p-3 bg-black">
      <header className="d-flex align-items-center justify-content-start">
        <img
          className="dashboard-logo"
          src="/img/logo-inverted.png"
          alt="Logo"
        />
      </header>

      <ul className="sidebar-items p-0">
        <li className="list-unstyled text-white px-3 d-flex align-items-center active">
          <IoHomeOutline size={25} className="me-3" />
          <a href="" className="text-decoration-none text-white">
            Dashboard
          </a>
        </li>

        <li className="list-unstyled text-white px-3 d-flex align-items-center">
          <GoCreditCard size={25} className="me-3" />
          <a href="" className="text-decoration-none text-white">
            Pay
          </a>
        </li>

        <li className="list-unstyled text-white px-3 d-flex align-items-center">
          <TbArrowsExchange size={25} className="me-3" />
          <a href="" className="text-decoration-none text-white">
            Transactions
          </a>
        </li>

        <li className="list-unstyled text-white px-3 d-flex align-items-center">
          <BsCreditCard2Front size={25} className="me-3" />
          <a href="" className="text-decoration-none text-white">
            Cards
          </a>
        </li>

        <li className="list-unstyled text-white px-3 d-flex align-items-center">
          <TbReportSearch size={25} className="me-3" />
          <a href="" className="text-decoration-none text-white">
            Expenses
          </a>
        </li>

        <li className="list-unstyled text-white px-3 d-flex align-items-center">
          <TbReportAnalytics size={25} className="me-3" />
          <a href="" className="text-decoration-none text-white">
            Reports
          </a>
        </li>

        <li className="list-unstyled text-white px-3 d-flex align-items-center">
          <IoDocumentTextOutline size={25} className="me-3" />
          <a href="" className="text-decoration-none text-white">
            Documents
          </a>
        </li>

        <li className="list-unstyled text-white px-3 d-flex align-items-center">
          <LuGoal size={25} className="me-3" />
          <a href="" className="text-decoration-none text-white">
            Goals
          </a>
        </li>

        <li className="list-unstyled text-white px-3 d-flex align-items-center">
          <IoSettingsOutline size={25} className="me-3" />
          <a href="" className="text-decoration-none text-white">
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PersonalDashboardSidebar;