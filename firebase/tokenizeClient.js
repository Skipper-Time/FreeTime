import { google } from 'googleapis';

const queryDbForTokens = require('../methods/queryDbForTokens');
const oAuth2Client = require('../firebase/oAuthConfig');

const tokenizeClient = async (email) => {
  const tokens = await queryDbForTokens(email);

  oAuth2Client.setCredentials({
    refresh_token: tokens.refreshToken,
    access_token: tokens.accessToken,
  });

  const calendar = google.calendar({
      version: "v3",
      auth: oAuth2Client,
  });

  return calendar;
}

export default tokenizeClient;
