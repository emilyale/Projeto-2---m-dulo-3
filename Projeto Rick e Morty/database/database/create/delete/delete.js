const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const { connection, personagens, db } = require("../connection");

router.use(function timelog(req, res, next) {
  next();
  console.log("Time: ", Date.now());
});

router.delete("/:id", async (req, res) => {
  await connection();
  const id = req.params.id;

  const quantidadePersonagens = await personagens.countDocuments({
    _id: ObjectId(id),
  });

  

  if (quantidadePersonagens !== 1) {
    res.status(404).send({ error: "Não encontrado" });
    return;
  }

  

  const result = await personagens.deleteOne({
    _id: ObjectId(id),
  });


  if (result.deletedCount !== 1) {
    res.status(500).send({ error: "Erro" });
    return;
  }

  res.send(204);
});

module.exports = router;