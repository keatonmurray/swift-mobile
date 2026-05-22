import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Spinner from "react-bootstrap/Spinner";

const Currencies = () => {

  const token = localStorage.getItem("api_token");
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);


  const handleRetrieveCurrencies = async () => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/retrieve-currencies`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const currencies = response?.data?.currencies?.data ?? [];
        setCurrencies(currencies ?? []);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    handleRetrieveCurrencies();
  }, []);

  // TO DO: 
  // Download flag images for all countries we support and replace the images with it according to case

  const getFlag = (code) => {
      switch (code) {
          case "CAD":
              return "/img/canada.png";
          case "GBP":
              return "/img/uk.png";
          case "EUR":
              return "/img/euro.png";
          case "AUD":
              return "/img/australia.png";
          case "USD":
              return "/img/usa.png";
          default:
              return "/img/usa.png";
      }
  };

  const currencyData = (currencies ?? []).map((currency) => ({
    name: currency.name,
    flag: getFlag(currency.code),
    symbol: currency.symbol,
}));

  return (
    <div className="swift currencies mx-auto">
      <div className="card border-0 custom-rounded-top px-4 pt-2 pb-4 mt-4 available-currencies">
        <div className="mb-4">
          <div className="border-bottom w-100">
            <h5 className="my-4 fw-semibold">Currencies Available</h5>
          </div>
        </div>

        <div className="w-100 mb-4">
          <input type="text" className="form-control py-2" placeholder="Search here" />
        </div>

        {/* Scrollable wrapper */}
        <div className="currency-list-wrapper">

          {loading ? (
            <div className="d-flex justify-content-center align-items-center py-5">
              <Spinner animation="border" role="status" variant="dark">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : currencyData.length === 0 ? (
            <div className="text-center text-muted py-4">
              No currencies available
            </div>
          ) : (
            currencyData.map((currency, index) => (
              <div
                key={index}
                className="card border-0 shadow-0 custom-rounded-x w-100 px-3 py-3 mt-2"
              >
                <div className="d-flex align-items-center justify-content-between mt-1">
                  <span className="fw-semibold">
                    <img src={currency.flag} className="flag me-1" alt="Flag" />
                    {currency.name}
                  </span>

                  <span className="text-success small fw-semibold">
                    {currency.value}
                  </span>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default Currencies;
