const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const {connection, personagens, db} = require("../connection");
  
  router.use(function timelog(req, res, next) {
    next();
    console.log("Time: ", Date.now());
  });

router.get("/", async (req, res) => {
  await connection();
  const getPersonagens = await personagens.find({}).toArray();
  res.send(getPersonagens);
});

module.exports = router;