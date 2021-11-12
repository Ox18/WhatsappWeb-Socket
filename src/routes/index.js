import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  if (req.session.auth) {
    res.render("main");
  } else {
    res.redirect("/login");
  }
});

router.get("/login", (req, res) => {
  if (req.session.auth) {
    res.send("AUTORIZADO");
  } else {
    res.render("login", { layout: false });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    req.session.auth = true;
  }
  res.redirect("/");
});

export default router;
