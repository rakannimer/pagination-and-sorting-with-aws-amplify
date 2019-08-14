#!/bin/bash


set -e
IFS='|'

REACTCONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\"build\",\
\"BuildCommand\":\"npm run-script build\",\
\"StartCommand\":\"npm run-script start\"\
}"
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":true,\
\"profileName\":\"default\",\
\"accessKeyId\":\"$AWS_ACCESS_KEY_ID\",\
\"secretAccessKey\":\"$AWS_ACCESS_KEY_ID\",\
\"region\":\"us-east-1\"\
}"
AMPLIFY="{\
\"projectName\":\"pagnsor\",\
\"defaultEditor\":\"code\"\
}"
FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"react\",\
\"config\":$REACTCONFIG\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

amplify configure project \
--amplify $AMPLIFY \
--frontend $FRONTEND \
--providers $PROVIDERS \

exit
# REACTCONFIG="{\
# \"SourceDir\":\"src\",\
# \"DistributionDir\":\"build\",\
# \"BuildCommand\":\"npm run-script build\",\
# \"StartCommand\":\"npm run-script start\"\
# }"
REACTCONFIG="{\"SourceDir\":\"src\",\"DistributionDir\":\"build\",\"BuildCommand\":\"npm run-script build\", \"StartCommand\":\"npm run-script start\"}"
FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"react\",\
\"config\":$REACTCONFIG\
}"
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
AMPLIFY="{\
\"projectName\":\"pagnsor\",\
\"defaultEditor\":\"code\"\
}"


yarn amplify configure project \
--amplify $AMPLIFY \
--providers $PROVIDERS \
--frontend $FRONTEND \

exit 

yarn amplify init \
--providers $PROVIDERS \
--amplify "{ \"envName\":\"ci\" }" \
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