const express = require("express");
const mongodb = require("mongodb");

require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.z7qeo.mongodb.net/${dbName}?retyWrites=true&w=majority`;

const options = {
  useUnifiedTopology: true,
};

const client = new mongodb.MongoClient(connectionString, options)
const db = client.db("blue_db");
const personagens = db.collection("personagens");

async function connection() {
  try{
    await client.connect()
    console.log("Connected to MongoDB")
  }
  catch(err){
    console.log(err)
  }  
};

module.exports = { connection,db, personagens};