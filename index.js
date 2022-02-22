require("dotenv").config();
// console.log("process.env.CLIENT_ID >", process.env.CLIENT_ID);
const querystring = require("querystring"); // allows to parse and stringify query strings
const express = require("express");
// instantiate the Express app
const app = express();
const axios = require("axios");

// store env variable
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get("/", (req, res) => {
    res.send("Good morning beautiful  people");
});

// generata a random str with numbers and letters
const generateRandomString = (length) => {
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// state key
const stateKey = "spotify_auth_state";

// request authorization from Spotify
app.get("/login", (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // provides access details about the logged-in user account and user email.
    const scope = "user-read-private user-read-email";

    // set state for security measure to protect agains cross-site request forgery
    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope
    });

    // redirect URI is a route of the app that we want the Spotify Accounts Service to redirect the user to once they've authorized our app
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// exchange the authorization code for an access token
app.get("/callback", (req, res) => {
    // get the authorization code from query param
    const code = req.query.code || null;
    console.log("/calback REQ.QUERY.CODE > ", code);

    // request to the Spotify Accounts Service /api/token to get access token
    axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: querystring.stringify({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: REDIRECT_URI
        }),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${new Buffer.from(
                `${CLIENT_ID}:${CLIENT_SECRET}`
            ).toString("base64")}`
        }
    })
        .then((response) => {
            console.log("/api/token RESPONSE.DATA > ", response.data);
            if (response.status === 200) {
                //
                // access token request data from Spotify API
                // const { access_token, token_type } = response.data;

                // axios
                //     .get("https://api.spotify.com/v1/me", {
                //         headers: {
                //             Authorization: `${token_type} ${access_token}`
                //         }
                //     })
                //     .then((response) => {
                //         res.send(
                //             `<pre>${JSON.stringify(
                //                 response.data,
                //                 null,
                //                 2
                //             )}</pre>`
                //         );
                //     })
                //     .catch((error) => {
                //         res.send(error);
                //     });

                // testing
                const { refresh_token } = response.data;

                axios
                    .get(
                        `http://localhost:8080/refresh_token?refresh_token=${refresh_token}`
                    )
                    .then((response) => {
                        res.send(
                            `<pre>${JSON.stringify(
                                response.data,
                                null,
                                2
                            )}</pre>`
                        );
                    })
                    .catch((error) => {
                        res.send(error);
                    });
            } else {
                res.send(response);
            }
        })
        .catch((error) => {
            res.send(error);
        });
});

// request a new access token with refresh token.
app.get("/refresh_token", (req, res) => {
    const { refresh_token } = req.query;

    axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        data: querystring.stringify({
            grant_type: "refresh_token",
            refresh_token: refresh_token
        }),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${new Buffer.from(
                `${CLIENT_ID}:${CLIENT_SECRET}`
            ).toString("base64")}`
        }
    })
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
});

// listen for a connection on port 8080
const port = 8080;
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});
