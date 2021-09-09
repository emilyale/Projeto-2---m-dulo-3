const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const { connection, personagens, db } = require("../connection");

router.use(function timelog(req, res, next) {
  next();
  console.log("time: ", Date.now());
});

router.use("/", async (req, res) => {
  await connection();
  const objeto = req.body;

  if (!objeto || !objeto.nome || !objeto.imagemUrl) {
    res.status(400).send({
      error:
        "Personagem inválido",
    });
    return;
  };

  const result = await personagens.insertOne(objeto);
    console.log(result);

  if (result.acknowledged == false) {
    res.status(500).send({ error: "ERRO" });
    return;
  };

  res.status(200).send(objeto);


});

