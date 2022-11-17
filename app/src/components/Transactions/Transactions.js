import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "milligram";

// token
import useToken from "../../common/useToken";

// state mgmt
import { useState as useGlobalState } from "@hookstate/core";
import store from "../../common/store";

import { Breadcrumb, BreadcrumbItem } from "../../common/breadcrumbs";

function Transactions() {
  const location = useLocation();
  const { currentAccountState } = useGlobalState(store);
  // const bankingAccountId = currentAccountState.get();
  const bankingAccountId = location.state.bankingAccountId;
  currentAccountState.set(bankingAccountId);
  const { token } = useToken();
  console.info(">>> bankingAccountId", bankingAccountId);

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
