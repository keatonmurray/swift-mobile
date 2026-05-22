import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="page-404 container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-yellow-primary">
      
      <div className="text-center px-3">
        
        {/* Big 404 */}
        <div className="page-not-found">
            <img src="/img/404.png" alt="404 Page Not Found" />
        </div>

        {/* Message */}
        <h1 className="mb-2 text-dark fw-semibold">Device switch detected</h1>

        <p className="mb-4 text-dark">
          It looks like you've switched devices. You may have to re-login to enter mobile mode.
        </p>

        {/* Action buttons */}
        <div className="d-flex justify-content-center flex-wrap">
          <Link to="/" className="btn fw-semibold px-5 py-3 border-0 btn-dark">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;