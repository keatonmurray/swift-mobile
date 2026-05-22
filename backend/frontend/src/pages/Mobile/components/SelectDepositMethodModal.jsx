import { Modal, Form } from "react-bootstrap";
import { CiCreditCard1 } from "react-icons/ci";
import { CiBank } from "react-icons/ci";
import { PiPaypalLogoThin } from "react-icons/pi";

const SelectDepositMethodModal = ({show, handleClose}) => {
  return (
    <Modal show={show} onHide={handleClose} centered contentClassName="border-0">
      <Modal.Body className="p-4">

        {/* Header */}
        <div className="text-center mb-4 position-relative">
          <button
            onClick={handleClose}
            className="btn-close position-absolute end-0 top-0"
            ></button>

          <div
            className="mx-auto mb-3"
            style={{
              width: "50px",
              height: "5px",
              borderRadius: "999px",
              background: "#dcdcdc",
            }}
          />

          <h4 className="fw-semibold mb-2">
            Select Deposit Method
          </h4>

          <p className="text-muted small mb-0">
            Deposits are credited in real time. Bank transfers may take 2-3 business days.
          </p>
        </div>

        {/* Primary Currency */}
        <div
          className="card border mb-3 border-success bg-success bg-opacity-10"
          style={{
            cursor: "pointer",
            borderRadius: "18px",
          }}
        >
          <div className="card-body py-3">
            <div className="d-flex align-items-center justify-content-between">

              <div className="d-flex align-items-center gap-1">
                <div className="wallet-icon">
                  <CiCreditCard1 className="wallet-svg" />
                </div>

                <div>
                  <div className="fw-semibold">
                    Credit/debit Card
                  </div>
                </div>
              </div>

              <Form.Check type="radio" checked readOnly />
            </div>
          </div>
        </div>

        {/* Bank Account 1 */}
        <div
          className="card border mb-3"
          style={{
            cursor: "pointer",
            borderRadius: "18px",
          }}
        >
          <div className="card-body py-3">
            <div className="d-flex align-items-center justify-content-between">

              <div className="d-flex align-items-center gap-1">
                <div className="wallet-icon">
                  <CiBank className="wallet-svg" />
                </div>

                <div>
                  <div className="fw-semibold">
                    Bank Transfer
                  </div>
                </div>
              </div>

              <Form.Check type="radio" />
            </div>
          </div>
        </div>

        {/* Bank Account 2 */}
        <div
          className="card border mb-3"
          style={{
            cursor: "pointer",
            borderRadius: "18px",
          }}
        >
          <div className="card-body py-3">
            <div className="d-flex align-items-center justify-content-between">

              <div className="d-flex align-items-center gap-1">
                <div className="wallet-icon">
                  <PiPaypalLogoThin className="wallet-svg" />
                </div>

                <div>
                  <div className="fw-semibold">
                    Pay with PayPal
                  </div>
                </div>
              </div>

              <Form.Check type="radio" />
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          className="btn-dark w-100 fw-semibold border-0 text-white py-3 mt-2"
          style={{ borderRadius: "16px" }}
        >
          Set as Primary
        </button>

      </Modal.Body>
    </Modal>
  );
};

export default SelectDepositMethodModal;