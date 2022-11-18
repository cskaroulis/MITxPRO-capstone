import { Link } from "react-router-dom";

import { store } from "../../common/store";

import "milligram";

const Header = () => {
  const firstName = store.get("firstName");
  const email = store.get("email");
  const greeting = `Hello ${firstName} (${email})`;

  return (
    <nav className="navigation">
      <section className="container" id="header">
        <Link to={"/"}>
          <h1 className="title">
            <strong>Capstone Bank</strong>
          </h1>
        </Link>
        <ul className="navigation-list float-right">
          <li className="navigation-item greeting">{greeting}</li>
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
