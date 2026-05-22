import { useState, useEffect } from "react"
import SelectDepositMethodModal from "../components/SelectDepositMethodModal"

const Deposit = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="swift deposit">
            <div className="bg-white px-4 pt-5 pb-3 w-100">
                <h3 className="fw-bold mb-4">Fund Your Wallet</h3>
                <div className="card border custom-rounded-x px-4  pt-2 pb-1 d-flex align-items-center justify-content-between text-center">
                    <div>
                        <img src="./img/canada.png" alt="Currency" />
                    </div>
                    <div>
                        <h6 className="mb-1 text-secondary">Canadian Dollar</h6>
                        <h1 className="amount-display fw-semibold">
                            <span className="currency-sign text-muted me-2">$</span>
                            <span className="amount">34,849</span>
                        </h1>
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <span className="text-muted">Total Fee</span>
                    <span className="fw-semibold">$0.20</span>
                </div>
                <div className="w-auto mt-4">
                    <div className="card w-100 py-2 px-3 custom-rounded mb-2">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex gap-2 align-items-center">
                                <img src="./img/mastercard.png" alt="Card Logo" />
                                <span className="text-muted fw-semibold">Pay with card</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="btn btn-dark custom-rounded fw-semibold btn-sm py-2 px-3"
                                >
                                Change
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="set-amount w-100 flex-column">
                    <div className="d-flex justify-content-center">
                        <div className="keypad">
                            <div className="row g-2">
                            {["1","2","3","4","5","6","7","8","9",".","0","⌫"].map((key) => (
                                <div className="col-4" key={key}>
                                <button
                                    className={`key-btn ${key === "⌫" ? "backspace" : ""}`}
                                    onClick={() => handleKeyPress(key)}
                                >
                                    {key}
                                </button>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex-row w-100 mt-3">
                        <button className="send-money btn btn-dark w-100 my-3 py-3 fw-semibold">Add $34,825</button>
                    </div>
                </div>
            </div>
            <SelectDepositMethodModal
                show={showModal}
                handleClose={() => setShowModal(false)}
            />
        </div>
    )
}

export default Deposit