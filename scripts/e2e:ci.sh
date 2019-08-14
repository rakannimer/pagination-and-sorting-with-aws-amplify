#!/bin/bash

yarn amplify init --amplify "{ \"envName\":\"ci\" }" --yes 
yarn kill-amplify-mock-api
yarn kill-port 62224
amplify mock api
wait-on http-get://localhost:20002
yarn build
kill-port 5000
(npx serve build/ &)
wait-on http-get://localhost:5000
cypress run --env PORT=5000