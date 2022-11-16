import "milligram";

import { Breadcrumb, BreadcrumbItem } from "../../common/breadcrumbs";

function Transactions() {
  return (
    <section className="container" id="transactions">
      <h1>Transactions</h1>
      <Breadcrumb>
        <BreadcrumbItem to="/">Return Home</BreadcrumbItem>
        <BreadcrumbItem to="/new-transaction">Make a deposit</BreadcrumbItem>
        <BreadcrumbItem to="/new-transaction">Make a withdrawal</BreadcrumbItem>
      </Breadcrumb>
    </section>
  );
}
export default Transactions;
