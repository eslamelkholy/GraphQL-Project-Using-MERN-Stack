const grapqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const schema = require("./schema/schema");

const db = mongoose.connect("mongodb://localhost:27017/GraphQL");

app.use(bodyParser.json());
app.use(cors());

app.use('/graphql', grapqlHttp({
    schema,
    rootValue:{ },
    graphiql:true
}));

app.listen(8000, () =>{
    console.log("Listening on 8000")
})

