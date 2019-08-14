#!/bin/bash


# set -e
# IFS='|'

# REACTCONFIG="{\
# \"SourceDir\":\"src\",\
# \"DistributionDir\":\"build\",\
# \"BuildCommand\":\"npm run-script build\",\
# \"StartCommand\":\"npm run-script start\"\
# }"
# AWSCLOUDFORMATIONCONFIG="{\
# \"configLevel\":\"project\",\
# \"useProfile\":true,\
# \"profileName\":\"default\",\
# \"accessKeyId\":\"$AWS_ACCESS_KEY_ID\",\
# \"secretAccessKey\":\"$AWS_ACCESS_KEY_ID\",\
# \"region\":\"us-east-1\"\
# }"
# AMPLIFY="{\
# \"projectName\":\"pagnsor\",\
# \"defaultEditor\":\"code\"\
# }"
# FRONTEND="{\
# \"frontend\":\"javascript\",\
# \"framework\":\"react\",\
# \"config\":$REACTCONFIG\
# }"
# PROVIDERS="{\
# \"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
# }"

# amplify configure project \
# --amplify $AMPLIFY \
# --frontend $FRONTEND \
# --providers $PROVIDERS \

# exit
# # REACTCONFIG="{\
# # \"SourceDir\":\"src\",\
# # \"DistributionDir\":\"build\",\
# # \"BuildCommand\":\"npm run-script build\",\
# # \"StartCommand\":\"npm run-script start\"\
# # }"
# REACTCONFIG="{\"SourceDir\":\"src\",\"DistributionDir\":\"build\",\"BuildCommand\":\"npm run-script build\", \"StartCommand\":\"npm run-script start\"}"
# FRONTEND="{\
# \"frontend\":\"javascript\",\
# \"framework\":\"react\",\
# \"config\":$REACTCONFIG\
# }"
# AWSCLOUDFORMATIONCONFIG="{\
# \"configLevel\":\"project\",\
# \"useProfile\":true,\
# \"profileName\":\"default\",\
# \"accessKeyId\":\"$AWS_ACCESS_KEY_ID\",\
# \"secretAccessKey\":\"$AWS_SECRET_ACCESS_KEY\",\
# \"region\":\"us-east-1\"\
# }"

# PROVIDERS="{\
# \"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
# }"
# AMPLIFY="{\
# \"projectName\":\"pagnsor\",\
# \"defaultEditor\":\"code\"\
# }"


# yarn amplify configure project \
# --amplify $AMPLIFY \
# --providers $PROVIDERS \
# --frontend $FRONTEND \

# exit 

curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
unzip awscli-bundle.zip
sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set default.region $AWS_REGION


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
--amplify "{ \"envName\":\"ci\" }" \
--yes

/bin/bash ./e2e.sh

yarn amplify env remove ci