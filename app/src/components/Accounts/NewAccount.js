import "milligram";

import { Breadcrumb, BreadcrumbItem } from "../../common/breadcrumbs";

function NewAccount() {
  return (
    <section className="container" id="new-account">
      <h1>New Account</h1>
      <Breadcrumb>
        <BreadcrumbItem to="/">Return Home</BreadcrumbItem>
      </Breadcrumb>
    </section>
  );
}
export default NewAccount;
