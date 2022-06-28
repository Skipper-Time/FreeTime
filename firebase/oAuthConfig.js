const { OAuth2Client } = require('google-auth-library');
const updateTokensInDb = require('../methods/updateTokensInDb');

// this client handles all authentication with google API
const oAuth2Client = new OAuth2Client(
  process.env.clientId,
  process.env.clientSecret,
  'postmessage',
);

// add a listener that calls a function if the tokens are update
// in this case add them to firebase Db
oAuth2Client.on('tokens', async (tokens) => {
  if (tokens.refresh_token) {
    // store the refresh_token in database!
    await updateTokensInDb(tokens);
    console.log(tokens.refresh_token);
  }
  console.log(tokens.access_token);
});

module.exports = oAuth2Client;
