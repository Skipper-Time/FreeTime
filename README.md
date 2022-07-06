# FreeTime

## Overview
FreeTime is a social application that allows users to import their Google calendars to find mutual free time among friends. It makes scheduling events easier, with the visual display of overlapping free time, displated in a calendar format. Its primary goal is to encourage people to seek friendship, bonding, and a feeling of belonging outside of work. 

![Screen Shot 2022-07-02 at 12 31 24 PM](https://user-images.githubusercontent.com/100612152/177014060-122df0bf-607c-4cc5-af1c-d06dfcc26456.png)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

<img src="" alt="" width=70% height=auto>

## Table of Contents
- [Description](#description)
- [Installation](#installation-and-setup)
- [Technologies](#technologies)
- [Project Details](#project-details)
- [Contributor](#contributors)

## Description
This project was built by a team of 7 developers over the span of 1 week. .....


---

## Installation and Setup
1. Fork and clone the repo and navigate to the root directory.

2. To install dependencies:
```
npm install
```

3. To run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open http://localhost:3000 in your browser

5. Firebase setup: 
Create a New Project and add the information to next.config.js
```
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@babel/preset-react',
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  // your custom config goes here
  reactStrictMode: true,
  env: {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    projectId: "PROJECT_ID",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID",
    clientId: "NEED TO FILL THIS IN WITH WHERE CLIENTID IS FOUND",
    clientSecret: "NEED TO FILL THIS IN WITH WHERE CLIENTSECRET IS FOUND",
  },
});
```

---

## Technologies
- [Next.js](https://nextjs.org/docs)
- [React](https://reactjs.org/)
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Firebase](https://firebase.google.com/docs)
- [Vercel](https://vercel.com/docs)
- [Chakra UI](https://chakra-ui.com/getting-started)

---

## Project Details
### Login / Sign up Page
> This page features a modal where users can either log in or sign up via Google authentication to access their personal calendars. If signing up as a new account, user will grant the app read/write access to user's personal Google calendar.
<img src="" alt="" width=70% height=auto>

### Calendar Events View
> This is where the user is able to see his/her personal calendar, with the "free time" slots emphasized. When friends are selected from the friends list, calendar view will change to display overlapping free time of selected users. The user is then able to create an event with selected participants. 
<img src="" alt="" width=70% height=auto>

### New Event
> Clicking on a "free" slot on the calendar opens up this modal. It allows users to enter in information for an event then create the event by sending a Google calendar invite to all selected participants. 
<img src="" alt="" width=70% height=auto>

### Friends
> The friends side drawer features 2 lists - current friends and all other users. The user can select current friends to find overlapping calendar times. Or, the user can add a user to the friends list by searching via email or username. 
<img src="" alt="" width=70% height=auto>

### Notifications
> The notification tab's back end is still in development, but it will display a user's pending friend requests or event invitations to be accepted or declined. The number by the bell indicates the current number of unread notifications. 
<img src="" alt="" width=70% height=auto>

---

### Contributors
- [Aaron Bowers](https://github.com/aaron-bowers)
- [Andres Arango](https://github.com/arangotang)
- [Donna Szeto](https://github.com/donnalikestocode)
- [Dustin Deitch](https://github.com/deitchdustin)
- [Hang Yin](https://github.com/hangyin2020)
- [Jessica Zhou](https://github.com/jessicazhou86)
- [Jordan Sweet](https://github.com/jsbmg)
