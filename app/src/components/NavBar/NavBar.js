import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [currentPage, setCurrentPage] = React.useState();

  const currentPageClass = (pageId) => {
    return currentPage === pageId ? "current-page-link" : "";
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-custom">
        <Link to="/">BadBank</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/logout">Logout</Link>
            </li>

            <li className="nav-item">
              <Link to="/Accounts">Accounts</Link>
            </li>
            <li className="nav-item">
              <Link to="/Tr">Accounts</Link>
              <a
                className={`nav-link ${currentPageClass("withdraw")} tip`}
                href="#/withdraw/"
                onClick={() => setCurrentPage("withdraw")}
                id="tip-withdraw"
              >
                Withdraw
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${currentPageClass("all-data")} tip`}
                href="#/all-data/"
                onClick={() => setCurrentPage("all-data")}
                id="tip-all-data"
              >
                All Data
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
