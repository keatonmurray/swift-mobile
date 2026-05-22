import React, { useState, useEffect } from "react";
import { BsCurrencyExchange } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePersonalCurrency = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");

    const [country, setCountry] = useState("");
    const [currency, setCurrency] = useState("");
    const [requestedCurrency, setRequestedCurrency] = useState("");
    const [wallet, setWallet] = useState("");
    const [ewallet, setEwallet] = useState("");
    const [ewalletId, setEwalletId] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const countryCurrencyMap = {
        // North America
        US: "USD",
        CA: "CAD",
        MX: "MXN",

        // Central America & Caribbean
        AG: "XCD",
        BS: "BSD",
        BB: "BBD",
        BZ: "BZD",
        CR: "CRC",
        CU: "CUP",
        DM: "XCD",
        DO: "DOP",
        SV: "USD",
        GD: "XCD",
        GT: "GTQ",
        HT: "HTG",
        HN: "HNL",
        JM: "JMD",
        KN: "XCD",
        LC: "XCD",
        VC: "XCD",
        TT: "TTD",
        PA: "PAB",
        NI: "NIO",

        // South America
        AR: "ARS",
        BO: "BOB",
        BR: "BRL",
        CL: "CLP",
        CO: "COP",
        EC: "USD",
        GY: "GYD",
        PY: "PYG",
        PE: "PEN",
        SR: "SRD",
        UY: "UYU",
        VE: "VES",

        // Europe
        AL: "ALL",
        AD: "EUR",
        AT: "EUR",
        BA: "BAM",
        BE: "EUR",
        BG: "BGN",
        BY: "BYN",
        CH: "CHF",
        CY: "EUR",
        CZ: "CZK",
        DE: "EUR",
        DK: "DKK",
        EE: "EUR",
        ES: "EUR",
        FI: "EUR",
        FR: "EUR",
        GB: "GBP",
        GR: "EUR",
        HR: "EUR",
        HU: "HUF",
        IE: "EUR",
        IS: "ISK",
        IT: "EUR",
        LI: "CHF",
        LT: "EUR",
        LU: "EUR",
        LV: "EUR",
        MC: "EUR",
        MD: "MDL",
        ME: "EUR",
        MK: "MKD",
        MT: "EUR",
        NL: "EUR",
        NO: "NOK",
        PLN: "PLN",
        PT: "EUR",
        RO: "RON",
        RS: "RSD",
        RU: "RUB",
        SE: "SEK",
        SI: "EUR",
        SK: "EUR",
        SM: "EUR",
        TR: "TRY",
        UA: "UAH",
        VA: "EUR",

        // Asia
        AF: "AFN",
        AM: "AMD",
        AZ: "AZN",
        BD: "BDT",
        BH: "BHD",
        BN: "BND",
        BT: "BTN",
        CN: "CNY",
        GE: "GEL",
        HK: "HKD",
        ID: "IDR",
        IL: "ILS",
        IN: "INR",
        IQ: "IQD",
        IR: "IRR",
        JP: "JPY",
        JO: "JOD",
        KG: "KGS",
        KH: "KHR",
        KP: "KPW",
        KR: "KRW",
        KW: "KWD",
        KZ: "KZT",
        LA: "LAK",
        LB: "LBP",
        LK: "LKR",
        MM: "MMK",
        MN: "MNT",
        MV: "MVR",
        MY: "MYR",
        NP: "NPR",
        OM: "OMR",
        PH: "PHP",
        PK: "PKR",
        QA: "QAR",
        SA: "SAR",
        SG: "SGD",
        SY: "SYP",
        TH: "THB",
        TJ: "TJS",
        TL: "USD",
        TM: "TMT",
        TW: "TWD",
        UZ: "UZS",
        VN: "VND",
        YE: "YER",

        // Africa
        AO: "AOA",
        BF: "XOF",
        BI: "BIF",
        BJ: "XOF",
        BW: "BWP",
        CD: "CDF",
        CF: "XAF",
        CG: "XAF",
        CI: "XOF",
        CM: "XAF",
        CV: "CVE",
        DJ: "DJF",
        DZ: "DZD",
        EG: "EGP",
        ER: "ERN",
        ET: "ETB",
        GA: "XAF",
        GH: "GHS",
        GM: "GMD",
        GN: "GNF",
        GQ: "XAF",
        KE: "KES",
        KM: "KMF",
        LR: "LRD",
        LS: "LSL",
        LY: "LYD",
        MA: "MAD",
        MG: "MGA",
        ML: "XOF",
        MR: "MRU",
        MU: "MUR",
        MW: "MWK",
        MZ: "MZN",
        NA: "NAD",
        NE: "XOF",
        NG: "NGN",
        RW: "RWF",
        SC: "SCR",
        SD: "SDG",
        SL: "SLL",
        SN: "XOF",
        SO: "SOS",
        SS: "SSP",
        ST: "STN",
        SZ: "SZL",
        TD: "XAF",
        TG: "XOF",
        TN: "TND",
        TZ: "TZS",
        UG: "UGX",
        ZA: "ZAR",
        ZM: "ZMW",
        ZW: "ZWL",

        // Oceania
        AU: "AUD",
        FJ: "FJD",
        KI: "AUD",
        MH: "USD",
        FM: "USD",
        NR: "AUD",
        NZ: "NZD",
        PG: "PGK",
        PW: "USD",
        SB: "SBD",
        WS: "WST",
        TO: "TOP",
        TV: "AUD",
        VU: "VUV"
    };

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
        { code: "CG", name: "Congo - Brazzaville" },
        { code: "CD", name: "Congo - Kinshasa" },
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
        { code: "GW", name: "Guinea-Bissau" },
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
        { code: "PLN", name: "Poland" },
        { code: "PT", name: "Portugal" },
        { code: "QA", name: "Qatar" },
        { code: "RO", name: "Romania" },
        { code: "RU", name: "Russia" },
        { code: "RW", name: "Rwanda" },
        { code: "KN", name: "Saint Kitts and Nevis" },
        { code: "LC", name: "Saint Lucia" },
        { code: "VC", name: "Saint Vincent and the Grenadines" },
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
        { code: "TL", name: "Timor-Leste" },
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

    const handleRetrieveWallet = async () => {
        const token = localStorage.getItem("api_token");

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/retrieve-personal-wallet`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const walletData = response.data?.data?.wallet_rapyd;
            const walletId = walletData?.id;

            setWallet(walletData || null);
            setEwalletId(walletId);

        } catch (error) {
            console.error(error);
            setWallet(null);
            setEwalletId("");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (userId) {
            handleRetrieveWallet();
        }
    }, [userId]);

    const handleOpenCurrency = async (walletId) => {
        try {
            const payload = {
                country,
                currency,
                ewallet: walletId,
                description: "Personal currency account",
                merchant_reference_id: `cur_${Date.now()}`,
                metadata: {
                    source: "frontend",
                    user_id: userId,
            },
                requested_currency: requestedCurrency,
            };

            const token = localStorage.getItem("api_token");

            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/create-personal-currency-account`,
                payload,
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Currency opened successfully!");
            navigate(`/dashboard/${userId}`);
        } catch (error) {
            toast.error("Please try again later");
        }
    };

    const handleSubmitCurrency = async (e) => {
        e.preventDefault();
        await handleOpenCurrency(ewalletId);
    };

  return (
    <div className="swift personal-wallet d-flex justify-content-center h-100">
      <div className="px-4 w-100">

        {/* INFO BOX */}
        <div className="d-flex align-items-start justify-content-start info custom-rounded-x">
          <div className="text-center">
            <BsCurrencyExchange size={50} className="currency-icon mb-2" />
            <p className="fw-semibold text-center mb-0">
                Select a recipient country to configure your currency account. The selected country determines the currency your wallet will hold.            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="w-100 d-flex align-items-center justify-content-center my-4">
          <form className="w-100" onSubmit={handleSubmitCurrency}>

            {/* COUNTRY */}
            <select
              value={country}
              onChange={(e) => {
                const selectedCountry = e.target.value;
                setCountry(selectedCountry);

                const mappedCurrency = countryCurrencyMap[selectedCountry] || "";

                setCurrency(mappedCurrency);
                setRequestedCurrency(mappedCurrency);
              }}
              className="form-control py-3 mb-2"
            >
              <option value="" disabled>
                Select Country
              </option>

              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* CURRENCY (auto-filled) */}
            {/* COMMENTED - REDUNDANT FIELD */}
            {/* <input
              type="text"
              value={currency}
              className="form-control py-3 mb-2"
              placeholder="Currency"
              disabled
            /> */}

            {/* REQUESTED CURRENCY (auto-filled) */}
            <input
              type="text"
              value={requestedCurrency}
              className="form-control py-3 mb-2"
              placeholder="Requested Currency"
              disabled
            />

            {/* EWALLET (readonly) */}
            <input
                type="text"
                value={ewalletId}
                className="form-control py-3 mb-2"
                placeholder="Ewallet ID"
                readOnly
            />

            {/* SUBMIT */}
            <button
              type="submit"
              className="btn btn-dark fw-semibold py-3 w-100 mt-3 btn-rounded"
              disabled={!currency}
            >
              Open Currency Account
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default CreatePersonalCurrency;