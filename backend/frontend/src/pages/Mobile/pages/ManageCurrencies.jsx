import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Spinner from "react-bootstrap/Spinner";

const ManageCurrencies = () => {
    const { id } = useParams()
    const token = localStorage.getItem("api_token");
    const userId = localStorage.getItem("user_id");

    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleRetrieveCurrencies = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/retrieve-personal-wallet`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCurrencies(response.data.data.wallet_rapyd.accounts ?? []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            handleRetrieveCurrencies();
        }
    }, [userId]);

    // TO DO: 
    // Download flag images for all countries we support and replace the images with it according to case

    const getFlag = (currency) => {
        switch (currency) {
            case "USD":
                return "/img/usa.png";
            case "CAD":
                return "/img/canada.png";
            case "GBP":
                return "/img/uk.png";
            case "EUR":
                return "/img/euro.png";
            default:
                return "/img/default.png";
        }
    };


    const currencyData = Array.isArray(currencies)
        ? currencies.map((acc) => ({
            name: acc?.currency,
            flag: getFlag(acc?.currency),
            balance: Number(acc?.balance ?? 0).toFixed(2),
        }))
    : [];

    return (
        <div className="swift manage-currencies">
            <div className="d-flex align-items-center justify-content-center py-4 my-4">
                <div className="w-100 px-4">
                    <div className="mb-4">
                        <div className="my-4 w-100 d-flex justify-content-between align-items-center">
                            <h5 className=" fw-semibold m-0">Your Currencies</h5>
                            <Link to="/currencies">
                                <figure className="settings-icon m-0">
                                    <img src="/img/settings.png" alt="Settings" />
                                </figure>
                            </Link>
                        </div>
                    </div>

                    <br />

                    <div className="currency-list-wrapper">

                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center py-5">
                                <div className="spinner-border text-dark" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : currencyData.length === 0 ? (
                            <div className="text-center text-muted py-4">
                                No currencies found
                            </div>
                        ) : (
                            currencyData.map((currency, index) => (
                                <Link to={`/currency-details/${userId}`} className="text-decoration-none">
                                    <div
                                        key={index}
                                        className="card border-0 shadow-0 custom-rounded-x w-100 px-3 py-3 mt-2"
                                    >
                                        <div className="d-flex align-items-center justify-content-between mt-1">
                                            <span className="fw-semibold">
                                                <img
                                                    src={currency.flag}
                                                    className="flag me-2"
                                                    alt="Flag"
                                                />
                                                {currency.name}
                                            </span>

                                            <span className="text-success small fw-semibold">
                                                {currency.balance} {currency.name}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}

                        <Link to={`/create-personal-currency/${userId}`}
                            className={loading ? "d-none" : "mt-4 btn btn-dark w-100 py-3 btn-rounded border-0 px-4 fw-semibold"}
                            disabled={loading}
                        >
                            Add more currencies
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageCurrencies