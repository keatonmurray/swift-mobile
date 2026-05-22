import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import {
  MdOutlinePerson,
  MdOutlineEmail,
  MdOutlineBadge,
  MdOutlineCalendarToday,
  MdKeyboardArrowDown,
  MdCheck,
} from "react-icons/md"

import {
  ChevronLeft,
  CircleHelp,
} from "lucide-react"

import { countries } from "../constants/countries"

const CreateWallet = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const userId = localStorage.getItem("user_id");

  // -----------------------------------
  // STEP 1 FIELDS
  // -----------------------------------

  const [firstName, setFirstName] = useState("")

  const [lastName, setLastName] = useState("")

  const [email, setEmail] = useState("")

  const [birthdate, setBirthdate] = useState("")

  const [country, setCountry] = useState("US")

  const [nationality, setNationality] = useState("US")

  const [identificationNumber, setIdentificationNumber] = useState("")

  // -----------------------------------
  // STEP 2 FIELDS
  // -----------------------------------

  const [currency, setCurrency] = useState("USD")

  // -----------------------------------
  // EWALLET
  // -----------------------------------

  const [ewalletId, setEwalletId] = useState(localStorage.getItem("personal_ewallet") || "")

  // -----------------------------------
  // ANIMATION
  // -----------------------------------

  useEffect(() => {
    const t = setTimeout(() => setVisible(true),80)
    return () => clearTimeout(t)
  }, [])

  const enter = (delay = 0) => ({
    opacity: visible ? 1 : 0,

    transform: visible
      ? "translateY(0)"
      : "translateY(20px)",

    transition:
      `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  })

  // -----------------------------------
  // STYLES
  // -----------------------------------

  const inputStyle = {
    height: 58,

    borderRadius: 18,

    border:
      "1px solid rgba(255,255,255,0.08)",

    background:
      "rgba(255,255,255,0.03)",

    color: "#fff",

    backdropFilter: "blur(14px)",
  }

  const iconStyle = {
    color:
      "rgba(255,255,255,0.42)",

    minWidth: 18,
  }

    // -----------------------------------
    // RETRIEVE EWALLET
    // -----------------------------------

    const handleRetrieveWallet = async () => {
        try {
            const token = localStorage.getItem("api_token")
            const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/retrieve-personal-wallet`,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            )

            const walletData = response.data?.data?.wallet_rapyd
            const retrievedWalletId = walletData?.id

            if (retrievedWalletId) {
                setEwalletId(retrievedWalletId)

                localStorage.setItem(
                    "personal_ewallet",
                    retrievedWalletId
                )

                return retrievedWalletId
            }
            return null
        } catch (error) {
            console.error(error)
            return null
        }
    }

    // -----------------------------------
    // STEP 1 SUBMIT
    // -----------------------------------

    const handleCreateWallet = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            const token = localStorage.getItem("api_token")

            try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/create-personal-wallet`,
                {
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    birthdate,
                    country,
                    nationality,
                    identification_number: identificationNumber,
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
                }
            )

            console.log("Wallet created:", response.data)
            } catch (createError) {
            console.log(
                "Wallet already exists:",
                createError?.response?.data
            )
            }

            // ALWAYS RETRIEVE EWALLET
            const retrievedWalletId = await handleRetrieveWallet()

            // SAVE
            setEwalletId(retrievedWalletId)

            localStorage.setItem(
            "personal_ewallet",
            retrievedWalletId
            )

            // NEXT STEP
            setStep(2)
        } catch (error) {
            console.error(error)

            console.log(error?.response?.data)
        } finally {
            setLoading(false)
        }
    }

    // -----------------------------------
    // STEP 2 SUBMIT
    // -----------------------------------

    const handleCreateCurrencyAccount = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            const token = localStorage.getItem("api_token")
            let finalEwallet = ewalletId

            if (!finalEwallet) {
                finalEwallet = localStorage.getItem("personal_ewallet")
            }

            if (!finalEwallet) {
                finalEwallet = await handleRetrieveWallet()
            }

            const response = await axios.post( `${import.meta.env.VITE_API_BASE_URL}/api/create-personal-currency-account`, {
                ewallet: finalEwallet,
                country,
                currency,
                requested_currency: currency,
                merchant_reference_id:
                `swift_${Date.now()}`,
                },{
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            )
            navigate(`/dashboard/${userId}`)
        } catch (error) {
            console.log(error?.response?.data)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="bg-main-pallette min-vh-100 text-white d-flex flex-column">

      {/* HEADER */}
      <div className="container-fluid px-4 pt-4">

        <div
          style={enter(0)}
          className="d-flex justify-content-between align-items-center"
        >
          <Link
            to="/dashboard"
            className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center top-cta-btn"
          >
            <ChevronLeft
              size={18}
              color="white"
            />
          </Link>

          <h4 className="mb-0 fw-semibold">
            Create Wallet
          </h4>

          <Link
            to="#"
            className="btn btn-dark rounded-circle top-cta-btn d-flex align-items-center justify-content-center"
          >
            <CircleHelp
              size={18}
              color="white"
            />
          </Link>
        </div>
      </div>

      {/* MAIN */}
      <main className="px-4 pb-5">

        {/* STEPPER */}
        <div
          className="d-flex align-items-center justify-content-center gap-3 mt-4"
          style={enter(0.05)}
        >

          {/* STEP 1 */}
          <div className="d-flex align-items-center gap-2">

            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: 50,
                height: 31,
                borderRadius: "50%",

                background:
                  step >= 1
                    ? "#D9FF43"
                    : "rgba(255,255,255,0.1)",

                color:
                  step >= 1
                    ? "#000"
                    : "#fff",
              }}
            >
              {step > 1
                ? <MdCheck size={22} />
                : "1"}
            </div>

            <span
              style={{
                color:
                  step >= 1
                    ? "#D9FF43"
                    : "rgba(255,255,255,0.65)",

                fontSize: 15,
              }}
            >
              Creating Your Wallet
            </span>
          </div>

          <div
            style={{
              width: 34,
              height: 1,
              background:
                "rgba(255,255,255,0.14)",
            }}
          />

          {/* STEP 2 */}
          <div className="d-flex align-items-center gap-2">

            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: 50,
                height: 31,
                borderRadius: "50%",

                background:
                  step >= 2
                    ? "#D9FF43"
                    : "rgba(255,255,255,0.1)",

                color:
                  step >= 2
                    ? "#000"
                    : "#fff",
              }}
            >
              2
            </div>

            <span
              style={{
                color:
                  step >= 2
                    ? "#D9FF43"
                    : "rgba(255,255,255,0.65)",

                fontSize: 15,
              }}
            >
              Setting up your currency
            </span>
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div
              className="mt-4"
              style={enter(0.1)}
            >
              <h1 className="text-white fw-semibold mb-3 fs-42">
                Create your wallet
              </h1>
            </div>

            <form
              className="mt-4"
              style={enter(0.15)}
              onSubmit={
                handleCreateWallet
              }
            >

              {/* FIRST NAME */}
              <div className="mb-4">

                <label className="form-label text-white fw-medium">
                  First name
                </label>

                <div
                  className="d-flex align-items-center gap-3 px-3"
                  style={inputStyle}
                >

                  <MdOutlinePerson
                    size={20}
                    style={iconStyle}
                  />

                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(
                        e.target.value
                      )
                    }
                    className="form-control border-0 bg-transparent text-white shadow-none p-0"
                    required
                  />
                </div>
              </div>

              {/* LAST NAME */}
              <div className="mb-4">

                <label className="form-label text-white fw-medium">
                  Last name
                </label>

                <div
                  className="d-flex align-items-center gap-3 px-3"
                  style={inputStyle}
                >

                  <MdOutlinePerson
                    size={20}
                    style={iconStyle}
                  />

                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(
                        e.target.value
                      )
                    }
                    className="form-control border-0 bg-transparent text-white shadow-none p-0"
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="mb-4">

                <label className="form-label text-white fw-medium">
                  Email
                </label>

                <div
                  className="d-flex align-items-center gap-3 px-3"
                  style={inputStyle}
                >

                  <MdOutlineEmail
                    size={20}
                    style={iconStyle}
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    className="form-control border-0 bg-transparent text-white shadow-none p-0"
                    required
                  />
                </div>
              </div>

              {/* BIRTHDATE */}
              <div className="mb-4">

                <label className="form-label text-white fw-medium">
                  Birthdate
                </label>

                <div
                  className="d-flex align-items-center gap-3 px-3"
                  style={inputStyle}
                >

                  <MdOutlineCalendarToday
                    size={18}
                    style={iconStyle}
                  />

                  <input
                    type="date"
                    value={birthdate}
                    onChange={(e) =>
                      setBirthdate(
                        e.target.value
                      )
                    }
                    className="form-control border-0 bg-transparent text-white shadow-none p-0"
                    required
                  />
                </div>
              </div>

              {/* COUNTRY */}
              <div className="mb-4">

                <label className="form-label text-white fw-medium">
                  Country
                </label>

                <div
                  className="d-flex align-items-center gap-3 px-3"
                  style={inputStyle}
                >

                  <select
                    value={country}
                    onChange={(e) =>
                      setCountry(
                        e.target.value
                      )
                    }
                    className="form-select border-0 bg-transparent text-white shadow-none p-0"
                    required
                  >
                    {countries.map(
                      (country) => (
                        <option
                          key={country.code}
                          value={country.code}
                        >
                          {country.name}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* NATIONALITY */}
              <div className="mb-4">

                <label className="form-label text-white fw-medium">
                  Nationality
                </label>

                <div
                  className="d-flex align-items-center gap-3 px-3"
                  style={inputStyle}
                >

                  <select
                    value={nationality}
                    onChange={(e) =>
                      setNationality(
                        e.target.value
                      )
                    }
                    className="form-select border-0 bg-transparent text-white shadow-none p-0"
                    required
                  >
                    {countries.map(
                      (country) => (
                        <option
                          key={country.code}
                          value={country.code}
                        >
                          {country.name}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* IDENTIFICATION */}
              <div className="mb-4">

                <label className="form-label text-white fw-medium">
                  Identification Number
                </label>

                <div
                  className="d-flex align-items-center gap-3 px-3"
                  style={inputStyle}
                >

                  <MdOutlineBadge
                    size={20}
                    style={iconStyle}
                  />

                  <input
                    type="text"
                    value={
                      identificationNumber
                    }
                    onChange={(e) =>
                      setIdentificationNumber(
                        e.target.value
                      )
                    }
                    className="form-control border-0 bg-transparent text-white shadow-none p-0"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn w-100 btn-branded"
              >
                {loading
                  ? "Creating..."
                  : "Continue"}
              </button>

            </form>

            <br /><br />
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (

          <form
            className="mt-5"
            onSubmit={
              handleCreateCurrencyAccount
            }
          >

            <div className="mb-5">

              <label className="form-label text-white fw-medium">
                Currency
              </label>

              <div
                className="d-flex align-items-center gap-3 px-3"
                style={inputStyle}
              >

                <select
                  value={currency}
                  onChange={(e) =>
                    setCurrency(
                      e.target.value
                    )
                  }
                  className="form-select border-0 bg-transparent text-white shadow-none p-0"
                >
                  <option value="USD">
                    USD
                  </option>

                  <option value="EUR">
                    EUR
                  </option>

                  <option value="GBP">
                    GBP
                  </option>

                  <option value="PHP">
                    PHP
                  </option>
                </select>

                <MdKeyboardArrowDown
                  size={22}
                  style={{
                    color:
                      "rgba(255,255,255,0.4)",
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-100 btn-branded"
            >
              {loading
                ? "Creating..."
                : "Create Currency Account"}
            </button>

          </form>
        )}
      </main>
    </div>
  )
}

export default CreateWallet