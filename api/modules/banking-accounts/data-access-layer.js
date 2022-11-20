// Banking Account Data Access Layer
const { db, collectionNames } = require("../datasources");
const {
  calculateBankingAccountBalance,
} = require("../banking-transactions/data-access-layer");

// methods

const create = (data) => {
  const { userAccountId, nickname, type, created } = data;
  const result = data;
  console.info(data);
  return new Promise((resolve, reject) => {
    db.collection(collectionNames.bankingAccounts)
      .add({ userAccountId, nickname, type, created })
      .then((docRef) => {
        result.bankingAccountId = docRef.id;
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getOne = (data) => {
  const { bankingAccountId } = data;
  return new Promise((resolve, reject) => {
    db.collection(collectionNames.bankingAccounts)
      .doc(bankingAccountId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve([{ ...doc.data() }]);
        } else {
          reject({
            errorMessage: "banking account not found",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

const getAll = (data) => {
  const { userAccountId } = data;
  return new Promise((resolve, reject) => {
    db.collection(collectionNames.bankingAccounts)
      .where("userAccountId", "==", userAccountId)
      .get()
      .then((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ bankingAccountId: doc.id, ...doc.data() });
        });
        return docs;
      })
      .then(async (docs) => {
        for (const doc of docs) {
          try {
            const { balance } = await calculateBankingAccountBalance(
              doc.bankingAccountId
            );
            doc.balance = balance;
          } catch (error) {
            reject(error);
          }
        }
        resolve({
          bankingAccounts: docs,
        });
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

const update = (data) => {
  const { bankingAccountId, nickname } = data;
  return new Promise((resolve, reject) => {
    const docRef = db
      .collection(collectionNames.bankingAccounts)
      .doc(bankingAccountId);
    return docRef
      .update({ nickname })
      .then(() => {
        resolve("bank account updated");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const discard = (data) => {
  const { bankingAccountId } = data;
  return new Promise((resolve, reject) => {
    const docRef = db
      .collection(collectionNames.bankingAccounts)
      .doc(bankingAccountId);
    return docRef
      .delete()
      .then(() => {
        resolve("bank account updated");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  create,
  getOne,
  getAll,
  update,
  discard,
};
