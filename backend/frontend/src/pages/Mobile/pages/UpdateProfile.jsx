import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import { RiErrorWarningFill } from "react-icons/ri";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

  const [avatarSrc, setAvatarSrc] = useState("/img/profile.png");
  const [avatarFile, setAvatarFile] = useState(null); // ✅ FIX

  const [file, setFile] = useState(null); // preview ONLY
  const [idFile, setIdFile] = useState(null); // ✅ FIX real file

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const avatarPickerRef = useRef(null);
  const idPickerRef = useRef(null);

  const userId = localStorage.getItem("user_id");


  const countries = [
    { code: "AF", name: "Afghanistan" },
    { code: "AL", name: "Albania" },
    { code: "DZ", name: "Algeria" },
    { code: "AD", name: "Andorra" },
    { code: "AO", name: "Angola" },
    { code: "AG", name: "Antigua and Barbuda" },
    { code: "AR", name: "Argentina" },
    { code: "AM", name: "Armenia" },
    { code: "AU", name: "Australia" },
    { code: "AT", name: "Austria" },
    { code: "AZ", name: "Azerbaijan" },
    { code: "BS", name: "Bahamas" },
    { code: "BH", name: "Bahrain" },
    { code: "BD", name: "Bangladesh" },
    { code: "BB", name: "Barbados" },
    { code: "BY", name: "Belarus" },
    { code: "BE", name: "Belgium" },
    { code: "BZ", name: "Belize" },
    { code: "BJ", name: "Benin" },
    { code: "BT", name: "Bhutan" },
    { code: "BO", name: "Bolivia" },
    { code: "BA", name: "Bosnia and Herzegovina" },
    { code: "BW", name: "Botswana" },
    { code: "BR", name: "Brazil" },
    { code: "BN", name: "Brunei" },
    { code: "BG", name: "Bulgaria" },
    { code: "BF", name: "Burkina Faso" },
    { code: "BI", name: "Burundi" },
    { code: "CV", name: "Cabo Verde" },
    { code: "KH", name: "Cambodia" },
    { code: "CM", name: "Cameroon" },
    { code: "CA", name: "Canada" },
    { code: "CF", name: "Central African Republic" },
    { code: "TD", name: "Chad" },
    { code: "CL", name: "Chile" },
    { code: "CN", name: "China" },
    { code: "CO", name: "Colombia" },
    { code: "KM", name: "Comoros" },
    { code: "CG", name: "Congo — Brazzaville" },
    { code: "CD", name: "Congo — Kinshasa" },
    { code: "CR", name: "Costa Rica" },
    { code: "HR", name: "Croatia" },
    { code: "CU", name: "Cuba" },
    { code: "CY", name: "Cyprus" },
    { code: "CZ", name: "Czech Republic" },
    { code: "DK", name: "Denmark" },
    { code: "DJ", name: "Djibouti" },
    { code: "DM", name: "Dominica" },
    { code: "DO", name: "Dominican Republic" },
    { code: "EC", name: "Ecuador" },
    { code: "EG", name: "Egypt" },
    { code: "SV", name: "El Salvador" },
    { code: "GQ", name: "Equatorial Guinea" },
    { code: "ER", name: "Eritrea" },
    { code: "EE", name: "Estonia" },
    { code: "SZ", name: "Eswatini" },
    { code: "ET", name: "Ethiopia" },
    { code: "FJ", name: "Fiji" },
    { code: "FI", name: "Finland" },
    { code: "FR", name: "France" },
    { code: "GA", name: "Gabon" },
    { code: "GM", name: "Gambia" },
    { code: "GE", name: "Georgia" },
    { code: "DE", name: "Germany" },
    { code: "GH", name: "Ghana" },
    { code: "GR", name: "Greece" },
    { code: "GD", name: "Grenada" },
    { code: "GT", name: "Guatemala" },
    { code: "GN", name: "Guinea" },
    { code: "GW", name: "Guinea‑Bissau" },
    { code: "GY", name: "Guyana" },
    { code: "HT", name: "Haiti" },
    { code: "HN", name: "Honduras" },
    { code: "HU", name: "Hungary" },
    { code: "IS", name: "Iceland" },
    { code: "IN", name: "India" },
    { code: "ID", name: "Indonesia" },
    { code: "IR", name: "Iran" },
    { code: "IQ", name: "Iraq" },
    { code: "IE", name: "Ireland" },
    { code: "IL", name: "Israel" },
    { code: "IT", name: "Italy" },
    { code: "JM", name: "Jamaica" },
    { code: "JP", name: "Japan" },
    { code: "JO", name: "Jordan" },
    { code: "KZ", name: "Kazakhstan" },
    { code: "KE", name: "Kenya" },
    { code: "KI", name: "Kiribati" },
    { code: "KP", name: "North Korea" },
    { code: "KR", name: "South Korea" },
    { code: "KW", name: "Kuwait" },
    { code: "KG", name: "Kyrgyzstan" },
    { code: "LA", name: "Laos" },
    { code: "LV", name: "Latvia" },
    { code: "LB", name: "Lebanon" },
    { code: "LS", name: "Lesotho" },
    { code: "LR", name: "Liberia" },
    { code: "LY", name: "Libya" },
    { code: "LI", name: "Liechtenstein" },
    { code: "LT", name: "Lithuania" },
    { code: "LU", name: "Luxembourg" },
    { code: "MG", name: "Madagascar" },
    { code: "MW", name: "Malawi" },
    { code: "MY", name: "Malaysia" },
    { code: "MV", name: "Maldives" },
    { code: "ML", name: "Mali" },
    { code: "MT", name: "Malta" },
    { code: "MH", name: "Marshall Islands" },
    { code: "MR", name: "Mauritania" },
    { code: "MU", name: "Mauritius" },
    { code: "MX", name: "Mexico" },
    { code: "FM", name: "Micronesia" },
    { code: "MD", name: "Moldova" },
    { code: "MC", name: "Monaco" },
    { code: "MN", name: "Mongolia" },
    { code: "ME", name: "Montenegro" },
    { code: "MA", name: "Morocco" },
    { code: "MZ", name: "Mozambique" },
    { code: "MM", name: "Myanmar" },
    { code: "NA", name: "Namibia" },
    { code: "NR", name: "Nauru" },
    { code: "NP", name: "Nepal" },
    { code: "NL", name: "Netherlands" },
    { code: "NZ", name: "New Zealand" },
    { code: "NI", name: "Nicaragua" },
    { code: "NE", name: "Niger" },
    { code: "NG", name: "Nigeria" },
    { code: "MK", name: "North Macedonia" },
    { code: "NO", name: "Norway" },
    { code: "OM", name: "Oman" },
    { code: "PK", name: "Pakistan" },
    { code: "PW", name: "Palau" },
    { code: "PA", name: "Panama" },
    { code: "PG", name: "Papua New Guinea" },
    { code: "PY", name: "Paraguay" },
    { code: "PE", name: "Peru" },
    { code: "PH", name: "Philippines" },
    { code: "PL", name: "Poland" },
    { code: "PT", name: "Portugal" },
    { code: "QA", name: "Qatar" },
    { code: "RO", name: "Romania" },
    { code: "RU", name: "Russia" },
    { code: "RW", name: "Rwanda" },
    { code: "KN", name: "Saint Kitts and Nevis" },
    { code: "LC", name: "Saint Lucia" },
    { code: "VC", name: "Saint Vincent" },
    { code: "WS", name: "Samoa" },
    { code: "SM", name: "San Marino" },
    { code: "ST", name: "Sao Tome and Principe" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "SN", name: "Senegal" },
    { code: "RS", name: "Serbia" },
    { code: "SC", name: "Seychelles" },
    { code: "SL", name: "Sierra Leone" },
    { code: "SG", name: "Singapore" },
    { code: "SK", name: "Slovakia" },
    { code: "SI", name: "Slovenia" },
    { code: "SB", name: "Solomon Islands" },
    { code: "SO", name: "Somalia" },
    { code: "ZA", name: "South Africa" },
    { code: "SS", name: "South Sudan" },
    { code: "ES", name: "Spain" },
    { code: "LK", name: "Sri Lanka" },
    { code: "SD", name: "Sudan" },
    { code: "SR", name: "Suriname" },
    { code: "SE", name: "Sweden" },
    { code: "CH", name: "Switzerland" },
    { code: "SY", name: "Syria" },
    { code: "TJ", name: "Tajikistan" },
    { code: "TZ", name: "Tanzania" },
    { code: "TH", name: "Thailand" },
    { code: "TL", name: "Timor‑Leste" },
    { code: "TG", name: "Togo" },
    { code: "TO", name: "Tonga" },
    { code: "TT", name: "Trinidad and Tobago" },
    { code: "TN", name: "Tunisia" },
    { code: "TR", name: "Turkey" },
    { code: "TM", name: "Turkmenistan" },
    { code: "UG", name: "Uganda" },
    { code: "UA", name: "Ukraine" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "GB", name: "United Kingdom" },
    { code: "US", name: "United States" },
    { code: "UY", name: "Uruguay" },
    { code: "UZ", name: "Uzbekistan" },
    { code: "VU", name: "Vanuatu" },
    { code: "VA", name: "Vatican City" },
    { code: "VE", name: "Venezuela" },
    { code: "VN", name: "Vietnam" },
    { code: "YE", name: "Yemen" },
    { code: "ZM", name: "Zambia" },
    { code: "ZW", name: "Zimbabwe" }
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("api_token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserProfile(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.first_name);
      setLastName(userProfile.last_name);
      setEmail(userProfile.email);
      setCountry(userProfile.country);
      setAvatarSrc(userProfile.profile_avatar || "/img/profile.png");

      // ⚠️ DO NOT store file path as file object
      setFile(null);
      setIdFile(null);
    }
  }, [userProfile]);

  // ---------------- AVATAR ----------------
  const triggerFileSelect = () => avatarPickerRef.current.click();

  const handleAvatarChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB");
      return;
    }

    setAvatarFile(selectedFile); // ✅ real file
    setAvatarSrc(URL.createObjectURL(selectedFile)); // preview
  };

  // ---------------- ID ----------------
  const triggerIdSelect = () => idPickerRef.current.click();

  const handleIdFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB");
      return;
    }

    setIdFile(selectedFile); // ✅ real file
    setFile(URL.createObjectURL(selectedFile)); // preview
  };

  // ---------------- SUBMIT ----------------
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      console.log("🔥 SUBMIT FIRED");

      const formData = new FormData();

      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("country", country);
      formData.append("kyc_status", "pending");

      // ✅ FIXED FILES
      if (idFile) {
        formData.append("id_photo", idFile);
      }

      if (avatarFile) {
        formData.append("profile_avatar", avatarFile);
      }

      // optional password
      if (password) {
        formData.append("password", password);
        formData.append("password_confirmation", confirmPassword);
      }

      formData.append("_method", "PUT");

      const token = localStorage.getItem("api_token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Profile updated successfully!");
      console.log(response.data);
    } catch (error) {
      console.log(error);

      if (error.response?.data?.errors) {
        Object.values(error.response.data.errors).forEach((msg) => {
          toast.error(msg);
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  if (!userProfile) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <ClipLoader size={50} />
      </div>
    );
  }

  return (
    <div className="swift update-profile mx-4">
      <form onSubmit={handleProfileUpdate}>
        <div className="d-flex align-items-center justify-content-center">
          <img
            src={avatarSrc}
            className="user-profile img-fluid"
            alt="Profile Photo"
            onClick={triggerFileSelect}
          />
          <input
            type="file"
            accept="image/*"
            ref={avatarPickerRef}
            onChange={handleAvatarChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="text-center mt-2 mb-4">
          <div className="d-flex align-items-center gap-1 justify-content-center m-0">
            {(userProfile.kyc_status === "pending" ||
              userProfile.kyc_status === "rejected") && (
              <GoUnverified size={20} style={{ color: "orange" }} />
            )}
            {userProfile.kyc_status === "approved" && (
              <MdVerified size={20} style={{ color: "green" }} />
            )}
            <h4 className="fw-semibold mb-0">
              {userProfile.first_name} {userProfile.last_name}
            </h4>
          </div>

          <p className="text-secondary">
            {userProfile.kyc_status === "approved"
              ? "Verified Account"
              : "Unverified Account"}
          </p>
        </div>

        <div className="d-flex align-items-start justify-content-start kyc-info custom-rounded-x">
          <div className="text-center">
            <RiErrorWarningFill size={35} className="warning-icon mb-1" />
            <p className="fw-semibold text-center mb-0">
              Updating your profile information is subject to KYC approval. We
              will review your information within 3–5 business days.
            </p>
          </div>
        </div>

        <div className="w-100 d-flex align-items-center justify-content-center my-4">
          <div className="w-100">
            <input
              type="text"
              value={firstName}
              className="form-control py-3 mb-2"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              value={lastName}
              className="form-control py-3 mb-2"
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              value={email}
              className="form-control py-3 mb-2"
              onChange={(e) => setEmail(e.target.value)}
            />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="form-control py-3 mb-2"
            >
              <option value="" disabled>
                Country
              </option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>

            <input
              type="password"
              className="form-control py-3 mb-2"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control py-3 mb-2"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* ID UPLOAD */}
            <div
              onClick={triggerIdSelect}
              className="border custom-rounded-x p-4 text-center mb-3"
              style={{
                borderStyle: "dashed",
                cursor: "pointer",
                background: "#f8f9fa",
              }}
            >
              <input
                type="file"
                accept="image/*"
                ref={idPickerRef}
                onChange={handleIdFileChange}
                style={{ display: "none" }}
              />
              <div className="fw-semibold">
                {file ? "ID Selected" : "Tap to upload your ID"}
              </div>
              <small className="text-muted">JPG, PNG (max 5MB)</small>
            </div>

            {file && (
              <div className="d-flex align-items-center justify-content-center w-100">
                <img
                  src={file}
                  alt="ID preview"
                  className="img-fluid rounded mb-3 w-100"
                  style={{ maxHeight: "250px" }}
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-dark fw-semibold py-3 w-100 mt-3"
            >
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;