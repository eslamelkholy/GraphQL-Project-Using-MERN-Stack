const express = require("express");
const grapqlHTPP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

app.use('/graphql', grapqlHTPP({
    schema
}));

app.listen(8000, () =>{
    console.log("Listening on 8000")
})

