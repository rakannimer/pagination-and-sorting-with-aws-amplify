## Building a group chat app with AWS Amplify

The motivation behind this example is to explore the handling of live lists of sorted data with Amplify API.

The app consists of 3 routes:

- `channel?id={id}` A chat room. Identified by an id. Where a user can send and receive messages in real-time. Messages are sorted by descending message creation data (newest at the bottom).

- `channels` A list of channels sorted by ascending last update date (newest always at the top).

- `me` A form that a user can fill to share more about themselves.

### Run locally

```
npm install
npm run dev
# or
yarn
yarn dev
```

### Deploy your own

```
amplify init

amplify push
```
