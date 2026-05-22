import { IoHomeOutline } from "react-icons/io5";
import { GoCreditCard } from "react-icons/go";
import { TbArrowsExchange } from "react-icons/tb";
import { BsCreditCard2Front } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuGoal } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { RiGeminiLine } from "react-icons/ri";
import { MdOutlinePayments } from "react-icons/md";
import { RiRobot2Line } from "react-icons/ri";
import { AiOutlineTeam } from "react-icons/ai";

const BusinessDashboardSIdebar = () => {
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
            Overview
          </a>
        </li>

        <li className="list-unstyled text-white px-3 d-flex align-items-center">
          <GoCreditCard size={25} className="me-3" />
          <a href="" className="text-decoration-none text-white">
            Accounts
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
            Payments
          </a>
        </li>

        <li className="list-unstyled text-white px-3 d-flex align-items-center">
          <MdOutlinePayments size={25} className="me-3" />
          <a href="" className="text-decoration-none text-white">
            Payouts
          </a>
        </li>

        <li className="list-unstyled text-white px-3 d-flex align-items-center">
          <TbReportAnalytics size={25} className="me-3" />
          <a href="" className="text-decoration-none text-white">
            Reports
          </a>
        </li>

        <li className="list-unstyled text-white px-3 d-flex align-items-center">
          <RiGeminiLine size={25} className="me-3" />
          <a href="" className="text-decoration-none text-white">
            AI Insights
          </a>
        </li>

        <li className="list-unstyled text-white px-3 d-flex align-items-center">
          <RiRobot2Line size={25} className="me-3" />
          <a href="" className="text-decoration-none text-white">
            Automations
          </a>
        </li>

        <li className="list-unstyled text-white px-3 d-flex align-items-center">
          <AiOutlineTeam size={25} className="me-3" />
          <a href="" className="text-decoration-none text-white">
            Recipients
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
  )
}

export default BusinessDashboardSIdebar