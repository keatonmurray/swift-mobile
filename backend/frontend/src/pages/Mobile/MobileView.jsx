import { Routes, Route, useLocation } from "react-router-dom";

// Bootstrap is scoped to Mobile only — Desktop is pure Tailwind
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Transfer from "./pages/Transfer";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Currencies from "./pages/Currencies";
import Deposit from "./pages/Deposit";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import PrivateRoute from "../../routes/PrivateRoutes";
import ManageCurrencies from "./pages/ManageCurrencies";
import AccountType from "./pages/AccountType";
import CreatePersonalWallet from "./pages/CreatePersonalWallet";
import CreatePersonalCurrency from "./pages/CreatePersonalCurrency";
import CurrencyDetails from "./pages/CurrencyDetails";
import Footer from "../../components/Footer";
import PageNotFound from "./pages/PageNotFound";

// Routes where the footer should never appear
const HIDE_FOOTER_ROUTES = ["/", "/login", "/register", "/select-account-type"];

const MobileView = () => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("api_token");
  const showFooter = isAuthenticated && !HIDE_FOOTER_ROUTES.includes(location.pathname);

  return (
    <div>
      <div className="page-wrapper">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/select-account-type"
            element={<AccountType />}
          />

          {/* =========================
              PERSONAL ROUTES
          ========================== */}
          <Route element={<PrivateRoute allowedType="personal" />}>
            <Route
              path="/dashboard/:id"
              element={<Dashboard />}
            />

            <Route
              path="/transfer"
              element={<Transfer />}
            />

            <Route
              path="/currencies"
              element={<Currencies />}
            />

            <Route
              path="/currency-details/:id"
              element={<CurrencyDetails />}
            />

            <Route
              path="/deposit"
              element={<Deposit />}
            />

            <Route
              path="/profile/:id"
              element={<Profile />}
            />

            <Route
              path="/update-profile/:id"
              element={<UpdateProfile />}
            />

            <Route
              path="/your-currencies/:id"
              element={<ManageCurrencies />}
            />

            <Route
              path="/create-personal-wallet"
              element={<CreatePersonalWallet />}
            />

            <Route
              path="/create-personal-currency/:id"
              element={<CreatePersonalCurrency />}
            />
          </Route>

          {/* 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>

      {showFooter && <Footer />}
    </div>
  );
};

export default MobileView;