const axios = require('axios');

/*
Insert access token and refresh token in to firebase db with email
*/

async function updateTokensInDb(tokens) {
  console.log('==========UPDATING TOKEN=========')
  const accessToken = tokens.access_token;
  const refreshToken = tokens.refresh_token;

  const idUrl =
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`;

  try {
    const idInfo = await axios.get(idUrl);

    const email = idInfo.data.email

    // TODO insert/update the email, refresh token, and access token
    // in firebase DB
  } catch (error) {
    console.log(error);
  }
}

module.exports = updateTokensInDb;
