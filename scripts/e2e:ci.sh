#!/bin/bash

yum install java-1.8.0-openjdk
java --version

# yarn amplify init --amplify "{ \"envName\":\"ci\" }" --yes && yarn kill-amplify-mock-api && (amplify mock api &) && wait-on http-get://localhost:20002 && kill-port 5000 && yarn build && (npx serve build/ &) && wait-on http-get://localhost:5000 && PORT=5000 cypress run --env PORT=5000