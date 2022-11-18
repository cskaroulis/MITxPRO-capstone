import { Link } from "react-router-dom";

export const Breadcrumb = ({ children }) => (
  <nav className="breadcrumb" aria-label="Breadcrumb">
    <ol>{children}</ol>
  </nav>
);

export const BreadcrumbItem = ({ children, to, state, ...props }) => (
  <li {...props}>
    <Link to={to} state={state}>
      {children}
    </Link>
  </li>
);
