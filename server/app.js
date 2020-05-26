const grapqlHTPP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const db = mongoose.connect("mongodb://localhost:27017/GraphQL");

app.use('/graphql', grapqlHTPP({
    schema,
    graphiql:true
}));

app.listen(8000, () =>{
    console.log("Listening on 8000")
})

