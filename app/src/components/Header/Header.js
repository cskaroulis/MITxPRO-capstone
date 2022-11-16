import { Link } from "react-router-dom";
import "milligram";

const Header = () => {
  return (
    <nav className="navigation">
      <section className="container" id="header">
        <Link to={"/"}>
          <h1 className="title">
            <strong>Capstone Bank</strong>
          </h1>
        </Link>
        <ul className="navigation-list float-right">
          <li className="navigation-item">
            <Link to={"/logout"}>
              <h1 className="title">Logout</h1>
            </Link>
          </li>
        </ul>
      </section>
    </nav>
  );
};
export default Header;
