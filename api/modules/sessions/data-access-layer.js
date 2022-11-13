// User Sessions Data Access Layer

const { firebase } = require("../datasources");

const create = (data) => {
  const { email, password } = data;
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        const { uid } = result.user;
        return resolve({
          userCredentialsId: uid,
        });
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

const discard = () => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        return resolve();
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

module.exports = { create, discard };
