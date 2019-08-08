## Building a group chat app with AWS Amplify

The motivation behind this example is to explore the handling of live lists of sorted data with Amplify API (AppSync & GraphQL Transformer).

The app consists of 3 routes:

- `channel?id={id}` A chat room identified by an id. A user can send and receive messages in real-time. Messages are sorted by descending message creation data (newest at the bottom).

- `channels` A list of channels sorted by ascending last update date (newest always at the top).

- `me` A form that a user can fill to share more about themselves.


### Clone the repo

```sh
git clone https://github.com/rakannimer/pagination-and-sorting-with-aws-amplify
```

### Run locally

```sh
npm install
npm run dev
# or
yarn
yarn dev
```

### Deploy your own

#### From the console

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/rakannimer/pagination-and-sorting-with-aws-amplify)

#### From the amplify cli

```sh
rm src/aws-exports.js
rm -rf amplify

amplify init

amplify add api

# When prompted for a schema, point to ./schema.graphql

amplify push

```
