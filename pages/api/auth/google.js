const oAuth2Client = require('../../../firebase/oAuthConfig');

export default async function handler(req, res) {
  // get tokens from google login and insert them in to oath client
  // if tokens are updated they will be propogated to the Db
  // see line 11 of firebase/oAuthConfig
  const { tokens } = await oAuth2Client.getToken(req.body.code);
  oAuth2Client.credentials = tokens;
  res.status(200).json(tokens);
}
