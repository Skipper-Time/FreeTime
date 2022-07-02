# FreeTime

![Screen Shot 2022-07-02 at 12 31 24 PM](https://user-images.githubusercontent.com/100612152/177014060-122df0bf-607c-4cc5-af1c-d06dfcc26456.png)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview
Full stack project ...

<img src="" alt="" width=70% height=auto>

## Table of Contents
- [Description](#description)
- [Installation](#installation-and-setup)
- [Technologies](#technologies)
- [Project Details](#project-details)
- [Contributor](#contributors)

## Description
description

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
> description
<img src="" alt="" width=70% height=auto>

### Calendar Events View
> description
<img src="" alt="" width=70% height=auto>

### Friends
> description
<img src="" alt="" width=70% height=auto>

### Notifications
> description
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
