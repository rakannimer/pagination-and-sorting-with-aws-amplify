---
title: Pagination & Sorting with AWS Amplify
published: false
description: Fetching large lists of sorted data with Amplify and JS
tags: aws, amplify, javascript, graphql
---

In my previous post, [Server-Side Rendered Real-time Web App with Next.js, AWS Amplify & Next.js](https://dev.to/rakannimer/server-side-rendered-real-time-web-app-with-next-js-aws-amplify-graphql-2j49) we went into the details of setting up a Next.js React app and connecting it to Amplify on both the server and client-side.

In this post we'll be going through how to build a small topic-oriented chat app with Amplify that needs to fetch, paginate and sort large lists of data.

We will be using React for rendering and updating our UI, but the same code and logic can be applied with any framework.

## Requirements

The chat app should consist of 3 routes :

###1. `/conversation/[topicId]`

The topic conversation route to browse and discuss

Consists of :

- A scrollable view
- A text input field with a submit button
- A button at the top to load more messages

###2. `/conversations`

The user's dashboard route. A list of all the topics sorted by last update date in descending order (newest always at the top)

Consists of a scroll view with a list of conversations with the latest message and a button and a text field to create new topic

###3. `/me`

The user's profile route, used to edit the user's basic information

A form with 3 fields username, url, bio

## Creating our app skeleton

Let's start by creating our app's skeleton :

```sh

mkdir amplify-pagination-and-sorting
cd amplify-pagination-and-sorting
npm init -y
git init # Optional but recommended
printf "node_modules\n.cache\ndist" > .gitignore
mkdir src && touch src/index.html src/index.tsx
npm i -D parcel @types/react @types/react-dom typescript
npm i react react-dom immer
```

> [Parcel](https://parceljs.org/) is a "blazing fast, zero configuration web application bundler"

Now, we can add our HTML :

```html
<html lang="en">
  <body>
    <div id="root"></div>
    <script src="./index.tsx"></script>
  </body>
</html>
```

And our JS/TS :

```jsx
import * as React from "react";
import { render } from "react-dom";

const App = () => {
  return <div>Hello World</div>;
};
render(<App />, document.getElementById("root"));
```

And to be able to run the app we'll add a dev script to our package.json

```json
"scripts": {
  "dev": "parcel src/index.html"
}
```

Running : `npm run dev` should show a blank page with Hello World printed in it.

## Adding offline functionality

In this section we will build the app without connecting to the API, the offline part of the requirements. We will use react-native-web to be able to re-use the same code in a React Native app if we wanted to.

>
