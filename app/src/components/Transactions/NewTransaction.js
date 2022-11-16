import "milligram";

import { Breadcrumb, BreadcrumbItem } from "../../common/breadcrumbs";

function NewTransaction() {
  return (
    <section className="container" id="new-transaction">
      <h1>New Transaction</h1>
      <Breadcrumb>
        <BreadcrumbItem to="/transactions">
          Return to Transactions
        </BreadcrumbItem>
      </Breadcrumb>
    </section>
  );
}
export default NewTransaction;
