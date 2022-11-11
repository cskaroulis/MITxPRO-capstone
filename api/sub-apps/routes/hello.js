const firebase = require("../../datasources");

const router = require("express").Router();

router.get("/", function (req, res) {
  const email = req.query.email;
  const password = req.query.password;

  if (email === "fakename012@fakedomain.net" && password === "fakepassword") {
    const auth = firebase.auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        const user = { isAuthenticated: true };
        console.log("user:", user);
        res.send(user);
      })
      .catch((error) => {
        console.error("auth:", error);
        res.send({
          isAuthenticated: false,
          errorCode: error.code,
          errorMessage: error.message,
        });
      });
  }
});

module.exports = router;
