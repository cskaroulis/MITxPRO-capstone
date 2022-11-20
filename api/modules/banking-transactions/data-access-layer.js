// Banking Transactions
// Data Access Layer
const { db, collectionNames } = require("../../common/datasources");

// create method

const create = async (data) => {
  const { userAccountId, bankingAccountId, type, amount, created } = data;
  const result = data;

  // ensure we have sufficient funds for withdrawals
  if (type === "withdrawal") {
    const { balance } = await calculateBankingAccountBalance(bankingAccountId);
    if (balance < amount) {
      return Promise.reject({ errorMessage: "Insufficient funds." });
    }
  }

  return new Promise(function (resolve, reject) {
    db.collection(collectionNames.bankingTransactions)
      .add({ userAccountId, bankingAccountId, type, amount, created })
      .then((docRef) => {
        result.transactionId = docRef.id;
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// getOne method

const getOne = (data) => {
  const { transactionId } = data;
  return new Promise((resolve, reject) => {
    db.collection(collectionNames.bankingTransactions)
      .doc(transactionId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve([{ ...doc.data() }]);
        } else {
          reject({
            errorMessage: "banking transaction not found",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

// getAll method

const getAll = (data) => {
  const { bankingAccountId } = data;
  return new Promise((resolve, reject) => {
    db.collection(collectionNames.bankingTransactions)
      .where("bankingAccountId", "==", bankingAccountId)
      .orderBy("created", "desc")
      .get()
      .then((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ bankingTransactionId: doc.id, ...doc.data() });
        });
        return docs;
      })
      .then(async (docs) => {
        try {
          const { balance } = await calculateBankingAccountBalance(
            bankingAccountId
          );
          resolve({
            balance,
            bankingTransactions: docs,
          });
        } catch (error) {
          reject(error);
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

// calculateBankingAccountBalance method
// Given an account banking id
// this method loops through the account's transactions
// and calculates the account total.
// This ensures we always get an accurate balance.
const calculateBankingAccountBalance = (bankingAccountId) => {
  return new Promise((resolve, reject) => {
    db.collection(collectionNames.bankingTransactions)
      .where("bankingAccountId", "==", bankingAccountId)
      .get()
      .then((querySnapshot) => {
        let balance = 0;
        querySnapshot.forEach((doc) => {
          const { type, amount } = doc.data();
          balance = type === "deposit" ? balance + amount : balance - amount;
        });
        resolve({ balance });
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

module.exports = {
  create,
  getOne,
  getAll,
  calculateBankingAccountBalance,
};
