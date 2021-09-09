const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const { connection, personagens, db } = require("../connection");

router.use(function timelog(req, res, next) {
  next();
  console.log("Time: ", Date.now());
});

router.get("/:id", async (req, res) => {
  await connection();
  const id = req.params.id;
  console.log(id);
  const personagem = await personagens.findOne({ _id: ObjectId(id) });
  if (!personagem) {
    res
      .status(404)
      .send({ error: "Não encontrado" });
    return;
  }
  res.send(personagem);
});

