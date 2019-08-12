#!/bin/bash

yarn amplify init --amplify "{ \"envName\":\"ci\" }" --yes && yarn kill-amplify-mock-api && NODE_DEBUG=dynamodb-emulator amplify mock api) # && wait-on http-get://localhost:20002 && kill-port 5000 && yarn build && (npx serve build/ &) && wait-on http-get://localhost:5000 && PORT=5000 cypress run --env PORT=5000