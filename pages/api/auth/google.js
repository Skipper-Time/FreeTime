const { OAuth2Client } = require('google-auth-library');

const oAuth2Client = new OAuth2Client(
  process.env.clientId,
  process.env.clientSecret,
  'postmessage',
);

//oAuth2Client.on('tokens', (tokens) => {
//  if (tokens.refresh_token) {
//    // store the refresh_token in my database!
//    console.log(tokens.refresh_token);
//  }
//  console.log(tokens.access_token);
//});


export default async function handler(req, res) {
  // exchange code for tokens
  const { tokens } = await oAuth2Client.getToken(req.body.code);
  oAuth2Client.credentials = tokens;
  res.status(200).json(tokens);
}
