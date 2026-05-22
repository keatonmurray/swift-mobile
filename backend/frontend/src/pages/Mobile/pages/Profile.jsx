import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import ClipLoader from "react-spinners/ClipLoader";

import axios from "axios"

const Profile = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("api_token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (!user)
  return (
     <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }} // full viewport height
    >
        <ClipLoader color="#36d7b7" size={50} />
    </div>
  );

  const handleLogout = async (e) => {
        try {
            await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/logout`,
            {},
            {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("api_token")}`
                }
            }
            );
            localStorage.removeItem("api_token");
            toast.success("Logged out successfully");
            navigate("/login");

        } catch (error) {
            console.error(error);
            toast.error("Logout failed. Please try again.");
        }
   };

  return (
    <div className="swift profile">
        <div className="d-flex align-items-center justify-content-center">
            <div className="text-center">
                <img src={user.profile_avatar ?? "/img/profile.png"} className="user-profile img-fluid" alt="Profile Photo" />
                <div className="d-flex align-items-center gap-1 justify-content-center m-0">
                    {(user.kyc_status === "pending" || user.kyc_status === "rejected") && (
                        <GoUnverified size={20} style={{ color: "orange" }} />
                    )}
                    {user.kyc_status === "approved" && (
                        <MdVerified size={20} style={{ color: "green" }} />
                    )}
                    <h4 className="fw-semibold mb-0">
                        {user.first_name} {user.last_name}
                    </h4>
                </div>
                <p className="text-secondary">
                    {user.kyc_status === "approved" ? "Verified Account" : "Unverified Account"}
                </p>
            </div>
        </div>
        <div className="profile-nav-menu w-100 my-4">
            <ul className="list-group">
                <Link to={`/update-profile/${userId}`} className="list-group-item fw-semibold py-4 px-3 border-top-0 d-flex align-items-center">
                    <img src="/img/pen.png" alt="Edit" />
                    Update Profile
                </Link>
                <Link className="list-group-item fw-semibold py-4 px-3 border-top-0 d-flex align-items-center">
                    <img src="/img/invoice.png" alt="Invoices" />
                    Request Bank Statement
                </Link>
                <Link className="list-group-item fw-semibold py-4 px-3 border-top-0 d-flex align-items-center">
                    <img src="/img/payments.png" alt="Payments" />
                    Review Transactions
                </Link>
                <Link className="list-group-item fw-semibold py-4 px-3 border-top-0 d-flex align-items-center">
                    <img src="/img/calculator.png" alt="Accounts" />
                    Manage Accounts
                </Link>
                <Link
                    to="#" // prevents navigation
                    onClick={handleLogout}
                    className="list-group-item fw-semibold py-4 px-3 border-top-0 d-flex align-items-center"
                    style={{ border: "none", background: "none", width: "100%", textAlign: "left" }}
                    >
                    <img src="/img/logout.png" alt="Logout" />
                    Logout
                </Link>
            </ul>
        </div>
    </div>
  )
}

export default Profile