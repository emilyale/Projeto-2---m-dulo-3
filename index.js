const express = require("express");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

require("dotenv").config();
require("express-async-errors");

var cors = require("cors");


const home = require("./components/home/home");
const readAll = require("./components/read-all/read-all");
const readById = require("./components/read/read");
const delete = require("./components/delete/delete");
const atualizar = require("./components/update/update");
const criar = require("./components/create/create");


(async () => {
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;

  const app = express();
  app.use(express.json());

  const port = process.env.PORT || 3000;
  const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.z7qeo.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  const options = {
    useUnifiedTopology: true,
  };

  console.info("Conectando o mongo");

  const client = await mongodb.MongoClient.connect(connectionString, options);

  console.info("Conectado ao mongo!");

  const db = client.db("blueed_db");
  const personagens = db.collection("personagens");

  const getPersonagensValidas = () => personagens.find({}).toArray();

  const getPersonagemById = async (id) =>
    personagens.findOne({ _id: ObjectId(id) });



  app.use(cors());

  

  app.options("*", cors());

 

  app.use("/home", home);



  app.use("/personagens/read-all", readAll);


  app.use("/personagens/read-by-id/", readById);


  app.use("/personagens/create/", criar);

  

  app.use("/personagens/update/", atualizar);



  app.use("/personagens/delete/", del);

  

  app.all("*", function (req, res) {
    res.status(404).send({ message: "Endpoint não encontrado" });
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || "Erro",
      },
    });
  });
  app.listen(port, () => {
    console.info(`App rodando em http://localhost:${port}/home`);
  });
})();