
yarn kill-amplify-mock-api
yarn kill-port 62224
(yarn amplify mock api &)
yarn wait-on http-get://localhost:20002
yarn build
yarn kill-port 5000
(npx serve build/ &)
yarn wait-on http-get://localhost:5000
yarn cypress run --env PORT=5000