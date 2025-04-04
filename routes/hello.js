const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello!");
});

router.get("/:name", (req, res) => {
  res.send("hello! " + req.params.name);
});

router.post("/", (req, res) => {
  res.send(req.body);
});

module.exports = router;