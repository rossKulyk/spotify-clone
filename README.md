# spotify-clone

Spotify clone web app is build with Node.js, Express, React, Spotify API and OAuth.

What is OAuth ?

-   OAuth (Open Authorization) is a secure, industry-standard protocol that allows you to approve one application interacting with another on your behalf without giving away your password. OAuth lets you pass authorization between apps over HTTPS with access tokens.

Roles in OAuth:

-   OAuth is a way to authorize an app without giving away your username and password, there are 4 main roles in order to get a unique access token that only your app can use to access resources from a service.

Roles:

-   Resource Server: The API which stores data the application wants to access (Spotify API)
-   Resource Owner: owns the data in the resource server (the user who wants to log into the app with Spotify is the owner of their Spotify account)
-   Client: The application that wants to access your data (the app/spotify-clone)
-   Authorization Server: The server that receives requests from the client for access tokens and issues them upon successful authentication and consent by the resource owner (Spotify Accounts Service)

Scopes in OAuth:

-   Scopes are used to specify exactly which resources should be available to the client that is asking for authorization. They provide users of third-party apps with the confidence that only the information they choose to share will be shared, and nothing more. The resource server (in our case, the Spotify API) is in charge of defining these scope values, and which resources they relate to.

Tokens in OAuth:

-   The app need a unique access token to successfully access resources on the Spotify API. With every API request access token should be included in the HTTP request headers. If not, the Spotify API won't know that the app has been authorized by the user, and will reject all requests for any data.
-   OAuth tokens have a limited time in which they are valid. After a while, all tokens expire. Once expired, need to request another one or refresh it.

OAuth flow. 6 main steps:

-   Client obtains client ID and client secret. Before any client or server requests are even made, there are two things the client (the app/spotify-clone) needs in order to kick off the OAuth flow: the client ID and the client secret. These are two strings that are used to identify and authenticate your specific app when requesting an access token. The app's unique client ID and client secret that can be found in the developer dashboard. With these 2 values we can initiate the OAuth flow.

-   Client requests authorization to access data from Spotify. The client (the app/spotify-clone) sends an authorization request containing the client ID and secret to the authorization server (the Spotify Accounts Service). This request also includes any scopes the client needs and a redirect URI which the authorization server should send the access token to.

-   Spotify authorizes access to client. The authorization server (Spotify) authenticates the client (the app/spotify-clone) using the client ID and secret, then verifies that the requested scopes are permitted.

-   User grants app access to their Spotify data. The user is redirected to a page on the Spotify authorization server where they can grant the app access to their Spotify account.

-   Client receives access token from Spotify. Once the user grants access by logging into Spotify, the authorization server redirects the user back to the client (the app/spotify-clone) with an access token. A refresh token is also returned with the access token.

-   Client uses access token to request data from Spotify. Finally, the client can use the access token to access resources from the resource server (the Spotify API).
