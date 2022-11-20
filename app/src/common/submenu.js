import { Link } from "react-router-dom";

export const Submenu = ({ children }) => (
  <nav className="submenu" aria-label="Submenu">
    <ol>{children}</ol>
  </nav>
);

export const SubmenuItem = ({ children, to, state, ...props }) => (
  <li {...props}>
    <Link to={to} state={state}>
      {children}
    </Link>
  </li>
);
