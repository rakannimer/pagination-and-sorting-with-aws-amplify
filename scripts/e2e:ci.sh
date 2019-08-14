#!/bin/bash

AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":true,\
\"profileName\":\"default\",\
\"accessKeyId\":\"$AWS_ACCESS_KEY_ID\",\
\"secretAccessKey\":\"$AWS_SECRET_ACCESS_KEY\",\
\"region\":\"us-east-1\"\
}"

PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

yarn amplify init \
--providers $PROVIDERS \
--amplify "{ \"envName\":\"ci\" }"\
--yes
#yarn amplify init --amplify "{ \"envName\":\"ci\" }" --yes 
yarn kill-amplify-mock-api
yarn kill-port 62224
yarn amplify mock api
yarn wait-on http-get://localhost:20002
yarn build
yarn kill-port 5000
(npx serve build/ &)
yarn wait-on http-get://localhost:5000
yarn cypress run --env PORT=5000
yarn amplify delete