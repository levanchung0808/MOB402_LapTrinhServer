var express = require("express");
var router = express.Router();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

const userController = require("../components/users/user_controller");

// Passport session setup.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

//config passport (Authentication FB)
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_KEY,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      profileFields: ["email", "name"],
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        console.log("profile", profile);
        console.log("accessToken", accessToken);
        return done(null, profile);
      });
    }
  )
);

module.exports = (function () {
  router.get("/", function (req, res) {
    if (req.session && req.session.user) {
      res.render("index", { user: req.user });
    } else {
      res.render("dang-nhap");
    }
    // res.render("index", { user: req.user });
    // if (req.session && req.session.user) {
    //   res.redirect("/");
    // } else {
    //   res.render("dang-nhap");
    // }
  });

  router.get("/login", function (req, res) {
    //Return to page login
  });

  router.get("/account", ensureAuthenticated, function (req, res) {
    res.render("account", { user: req.user });
  });

  router.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: "email" })
  );

  router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/",
      failureRedirect: "/login",
    }),
    function (req, res) {
      res.redirect("/nguoi-dung");
    }
  );

  router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // * http://localhost:3000/dang-nhap
  // * get: chạy ra login
  router.get("/dang-nhap", function (req, res, next) {
    if (req.session && req.session.user) {
      res.redirect("/");
    } else {
      res.render("dang-nhap");
    }
  });
  // * post: thực hiện login
  router.post("/dang-nhap", async function (req, res, next) {
    const { username, password } = req.body;
    const user = await userController.login(username, password);
    if (user) {
      req.session.user = user;
      // res.redirect("/");
      res.redirect("/");
    } else {
      res.redirect("/dang-nhap");
    }
  });

  // * http://localhost:3000/dang-xuat
  // * get: chạy đăng xuất
  router.get("/dang-xuat", function (req, res, next) {
    req.session.destroy(function (err) {
      //nếu đăng xuất thành công sẽ xoá session
      res.redirect("/dang-nhap");
    });
  });

  return router;
})();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
