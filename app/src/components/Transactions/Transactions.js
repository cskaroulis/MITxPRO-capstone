import "milligram";

import { Breadcrumb, BreadcrumbItem } from "../../common/breadcrumbs";

function Transactions() {
  return (
    <section className="container" id="transactions">
      <h1>Transactions</h1>
      <Breadcrumb>
        <BreadcrumbItem to="/">Return Home</BreadcrumbItem>
        <BreadcrumbItem to="/new-transaction">New Transaction</BreadcrumbItem>
      </Breadcrumb>
    </section>
  );
}
export default Transactions;
