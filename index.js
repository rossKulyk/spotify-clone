require("dotenv").config();
// console.log("process.env.CLIENT_ID >", process.env.CLIENT_ID);
const querystring = require("querystring"); // allows to parse and stringify query strings

const express = require("express");
// instantiate the Express app
const app = express();

// store env variable
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get("/", (req, res) => {
    res.send("Good morning beautiful  people");
});

// The redirect URI is a route of our app that we want the Spotify Accounts Service to redirect the user to once they've authorized our app (i.e. successfully logged into Spotify).

// login route to redirect to the Spotify Accounts Service with client_id, redicrect_uri
app.get("/login", (req, res) => {
    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URI
    });

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// listen for a connection on port 8080
const port = 8080;
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});
