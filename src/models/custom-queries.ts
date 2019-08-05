export type GetChannelListInput = {
  channelLimit?: number;
  channelNextToken?: string;
  messageLimit?: number;
};

// Just to get nice formatting for our queries in VSCode
const gql = String.raw;

export const getChannelList = ({
  channelLimit = 10,
  channelNextToken = "",
  messageLimit = 1
}: GetChannelListInput) => gql`
query GetChannelList($id: ID!) {
  getChannelList(id: $id) {
    id
    channels(
      # Number of channels to fetch on each request
      limit: ${channelLimit},
      
      # sorting direction by the sortField we specified in our schema: updatedAt
      sortDirection: DESC,

      # nextToken is a long string that our API sends back that we can use to be able to
      # retrieve the next entries after the ones received (older channels in this case)
      # When nextToken is null then we reached the end of the list
      ${channelNextToken !== "" ? `nextToken:"${channelNextToken}"` : ``}
    ) {
      items {
        id
        name
        createdAt
        updatedAt
        messages(
          # How many messages per channel to retrieve, in our case 1
          limit: ${messageLimit},
          # To get the latest first
          sortDirection: DESC,
          # No need for nextToken here
        ) {
          items {
            id
            createdAt
            senderId
            text
          } 
          
        }
      }
      nextToken
    }
  }
}
`;

export type GetMessageListInput = {
  messageLimit?: number;
  messageNextToken?: string;
};

export const getMessageList = ({
  messageLimit = 10,
  messageNextToken = ""
}: GetMessageListInput) => gql`
query GetChannel($id: ID!) {
  getChannel(id: $id) {
    id
    name
    createdAt
    updatedAt
    messages(
      limit: ${messageLimit},
      sortDirection: DESC,
      ${messageNextToken !== "" ? `nextToken:"${messageNextToken}"` : ``}
    ) {
      items {
        id
        text
        createdAt
        senderId
      }
      nextToken
    }
  }
}
`;

export const getUsername = gql`
  query GetUserName($id: ID!) {
    getUser(id: $id) {
      name
    }
  }
`;
