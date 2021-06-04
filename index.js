const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./passport-setup");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.send("Hello World"));
app.get("/succeed", (req, res) => res.send("Succeed!"));
app.get("/failed", (req, res) => res.send("Failed!"));

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    res.redirect("/succeed");
  }
);

app.listen(3000, () => console.log(`Example app listening on port ${3000}!`));
