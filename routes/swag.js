const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("get swag");
});

router.get("/:pserson", (req, res) => {
  res.send(req.params.pserson);
});

router.post("/", (req, res) => {
  res.send(req.body);
});

module.exports = router;