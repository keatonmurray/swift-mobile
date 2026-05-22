import AddBeneficiaryFormModal from "../../../components/transfer/AddBeneficiaryFormModal";

import { useEffect } from "react";
import { Carousel } from "bootstrap";
import { useState } from "react";

import cardLogo from '../../../../public/img/mastercard.png';
import person1 from '../../../../public/img/person1.jpg';
import person2 from '../../../../public/img/person2.jpg';
import person3 from '../../../../public/img/person3.jpg';

const Transfer = () => {

  // Initialize keypad state
  const [amount, setAmount] = useState("0");

  // Initialize form state
  const [showForm, setFormState] = useState(false);

  useEffect(() => {
    const el = document.getElementById("transferCarousel");
    if (!el) return;

    const carousel = new Carousel(el, {
      interval: false,
      ride: false,
      touch: true,
      wrap: true
    });

    const handleSlide = (event) => {
      const indicators = el.querySelectorAll(".carousel-indicators button");
      indicators.forEach(btn => btn.classList.remove("active"));
      indicators[event.to]?.classList.add("active");
    };

    el.addEventListener("slide.bs.carousel", handleSlide);

    return () => {
      el.removeEventListener("slide.bs.carousel", handleSlide);
      carousel.dispose();
    };
  }, []);

  const cardNumbers =[
    {cardNumber: "4121491291024212", cardType: "Mastercard", initials: "M", cardLogo: cardLogo},
    {cardNumber: "4232819271829056", cardType: "Mastercard", initials: "M", cardLogo: cardLogo},
    {cardNumber: "4325213465783323", cardType: "Mastercard", initials: "M", cardLogo: cardLogo}
  ];

  const beneficiaries = [
    {name: "Theresa", profilePhoto: person1},
    {name: "Adam", profilePhoto: person2},
    {name: "Christina", profilePhoto: person3},
    {name: "Steven", profilePhoto: person1},
    {name: "Alex", profilePhoto: person2},
    {name: "John", profilePhoto: person3},
    {name: "Ryan", profilePhoto: person1},

  ]

  // Handle keypress with useState
  const handleKeyPress = (key) => {
    if (key === "⌫") {
      setAmount((prev) => prev.slice(0, -1) || "0");
      return;
    }

    if (key === ".") {
      if (amount.includes(".")) return;
      setAmount(amount + ".");
      return;
    }

    // prevent leading zeros like 000
    if (amount === "0") {
      setAmount(key);
    } else {
      setAmount(amount + key);
    }
  };

  // Handle add new beneficiary form modal with useState
  const handleForm = () => {
    setFormState(true)
  }

  const formattedAmount = Number(amount || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="swift transfer">
      <div className="bg-white px-4 py-5 w-100">
        <h3 className="fw-bold mb-3">Send Money</h3>

        <div id="transferCarousel" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#transferCarousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#transferCarousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#transferCarousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div className="carousel-inner">
            {cardNumbers.map((c, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div className="card border-0 p-3 account-details w-100">
                  <div className="d-flex align-items-center">
                    <div className="card-container text-white">{c.initials}</div>
                    <div className="card-details ms-2 text-white w-100">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <p className="lead fw-semibold p-0 m-0">{c.cardType}</p>
                          <p className="small fw-semibold p-0 m-0">
                            {c.cardNumber}
                          </p>
                        </div>
                        <div className="text-end">
                          <img src={cardLogo} alt="Card Logo" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <>
          {/* Backdrop */}
          <div className="modal-backdrop-blur" onClick={() => setFormState(false)} />

          {/* Modal */}
          <AddBeneficiaryFormModal />
        </>
      )}

      <div className="beneficiary-container container my-4">
        <p className="lead fw-bold">Beneficiary</p>
        <div className="list">
          <ul className="beneficiary-list">
            <li className="beneficiary-item text-center add-new">
              <button onClick={handleForm} className="avatar border-0">+</button>
              <span className="name small fw-semibold">Add</span>
            </li>
            {beneficiaries.map((p, index) => (
              <li className="beneficiary-item text-center">
                <img src={p.profilePhoto} alt="Theresa Webb" />
                <span className="name small fw-semibold">{p.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

     <div className="set-amount bg-white p-4 w-100">
        <div className="text-center mb-4">
          <h1 className="fw-semibold">${formattedAmount}</h1>
          <p className="text-muted">You have $123,456.00 available</p>
        </div>

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

        <button className="send-money btn btn-dark w-100 my-3 py-3 fw-semibold">
          Send ${formattedAmount}
        </button>
      </div>
    </div>
  );
};

export default Transfer;
