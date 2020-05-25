const express = require("express");
const grapqlHTPP = require("express-graphql");
const app = express();

app.use("graphql", grapqlHTPP())

app.listen(8000, () =>{
    console.log("Listening on 8000")
})

