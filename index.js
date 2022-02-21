require("dotenv").config();
console.log("process.env.CLIENT_ID >", process.env.CLIENT_ID);

const express = require("express");
// instantiate the Express app
const app = express();

app.get("/", (req, res) => {
    res.send("Good morning beautiful  people");
});

// listen for a connection on port 8080
const port = 8080;
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});
