import { createContext } from "react";
export const contextMgr = {
  token: "",
  user: {},
  accounts: [],
  transactions: [],
  updateUser(data) {
    this.user = Object.assign({}, data);
  },
  updateAccounts(data) {
    this.accounts = Object.assign({}, data);
  },
  updateTransactions(data) {
    this.transactions = Object.assign({}, data);
  },
};
export const AppContext = createContext();
