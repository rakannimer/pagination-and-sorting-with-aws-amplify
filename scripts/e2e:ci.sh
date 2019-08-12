#!/bin/bash

set -e
IFS='|'

AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":true,\
\"profileName\":\"default\"\
}"
NOTIFICATIONSCONFIG="{\
\"Pinpoint\":{
\"SMS\":{
\"Enabled\":true\
},\
\"Email\":{
\"Enabled\":true,\
\"FromAddress\":\"xxx@amzon.com\",\
\"Identity\":\"identityArn\",\
\"RoleArn\":\"roleArn\"\
},\
\"APNS\":{
\"Enabled\":true,\
\"DefaultAuthenticationMethod\":\"Certificate\",\
\"P12FilePath\":\"p12filePath\",\
\"Password\":\"p12FilePasswordIfAny\"\
},\
\"FCM\":{
\"Enabled\":true,\
\"ApiKey\":\"fcmapikey\"\
}\
}\
}"
AMPLIFY="{\
\"envName\":\"mydevabc\"\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"
CATEGORIES="{\
\"notifications\":$NOTIFICATIONSCONFIG\
}"

yarn amplify init \
--amplify $AMPLIFY \
--providers $PROVIDERS \
--categories $CATEGORIES \
--yes

#yarn amplify init --amplify "{ \"envName\":\"ci\" }" --yes && yarn kill-amplify-mock-api && (amplify mock api &) && wait-on http-get://localhost:20002 && kill-port 5000 && yarn build && (npx serve build/ &) && wait-on http-get://localhost:5000 && PORT=5000 cypress run --env PORT=5000