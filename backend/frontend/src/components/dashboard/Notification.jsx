import { IoMdArrowRoundBack } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { FaBell } from "react-icons/fa";

const Notification = ({notification, setNotification}) => {
  const closeNotification = () => {
      setNotification(false);
  }

  return (
    <div className={`notification-popup-wrapper ${notification ? "open" : ""}`}>
      <div className="d-flex align-items-center justify-content-between">
        <IoMdArrowRoundBack size={25} onClick={closeNotification}/>
        <BsThreeDots size={25}/>
      </div>
      <div className="d-flex align-items-center justify-content-center gap-2 my-3">
        <FaBell size={25} />
        <h3 className="fw-bold mb-0">Notifications</h3>
      </div>

      {/* Notification List */}
      <ul className="notification-list list-unstyled flex-grow-1 overflow-auto">
        <li className="notification-item px-3 py-4 mb-2 custom-rounded-x bg-light d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center justify-content-center gap-2">
            <img src="/img/person1.jpg" alt="Profile" />
            <div>
              <span className="fw-bold">Money in from John Doe</span>
              <span className="text-secondary fw-normal d-block small"><span className="fw-semibold">John Doe</span> has sent you <span className="fw-semibold">$10,000.</span></span>
            </div>
          </div>
        </li>
        <li className="notification-item px-3 py-4 mb-2 custom-rounded-x bg-light d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center justify-content-center gap-2">
            <img src="/img/person1.jpg" alt="Profile" />
            <div>
              <span className="fw-bold">Money in from John Doe</span>
              <span className="text-secondary fw-normal d-block small"><span className="fw-semibold">John Doe</span> has sent you <span className="fw-semibold">$10,000.</span></span>
            </div>
          </div>
        </li>
         <li className="notification-item px-3 py-4 mb-2 custom-rounded-x bg-light d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center justify-content-center gap-2">
            <img src="/img/person1.jpg" alt="Profile" />
            <div>
              <span className="fw-bold">Money in from John Doe</span>
              <span className="text-secondary fw-normal d-block small"><span className="fw-semibold">John Doe</span> has sent you <span className="fw-semibold">$10,000.</span></span>
            </div>
          </div>
        </li>
        {/* Add more items as needed */}
      </ul>
    </div>
  )
}

export default Notification