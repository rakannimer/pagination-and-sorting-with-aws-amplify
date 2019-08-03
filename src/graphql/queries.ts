// tslint:disable
// this is an auto generated file. This will be overwritten

export const getMessage = `query GetMessage($id: ID!) {
  getMessage(id: $id) {
    id
    text
    createdAt
    senderId
    channel {
      id
      name
      createdAt
      updatedAt
      messages {
        nextToken
      }
      channelList {
        id
      }
    }
  }
}
`;
export const listMessages = `query ListMessages(
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      text
      createdAt
      senderId
      channel {
        id
        name
        createdAt
        updatedAt
      }
    }
    nextToken
  }
}
`;
export const getTemp = `query GetTemp($id: ID!) {
  getTemp(id: $id) {
    id
  }
}
`;
export const listTemps = `query ListTemps(
  $filter: ModelTempFilterInput
  $limit: Int
  $nextToken: String
) {
  listTemps(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
    }
    nextToken
  }
}
`;
export const getChannel = `query GetChannel($id: ID!) {
  getChannel(id: $id) {
    id
    name
    createdAt
    updatedAt
    messages {
      items {
        id
        text
        createdAt
        senderId
      }
      nextToken
    }
    channelList {
      id
      channels {
        nextToken
      }
    }
  }
}
`;
export const listChannels = `query ListChannels(
  $filter: ModelChannelFilterInput
  $limit: Int
  $nextToken: String
) {
  listChannels(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      createdAt
      updatedAt
      messages {
        nextToken
      }
      channelList {
        id
      }
    }
    nextToken
  }
}
`;
export const getChannelList = `query GetChannelList($id: ID!) {
  getChannelList(id: $id) {
    id
    channels {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
}
`;
export const listChannelLists = `query ListChannelLists(
  $filter: ModelChannelListFilterInput
  $limit: Int
  $nextToken: String
) {
  listChannelLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      channels {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    bio
    url
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      bio
      url
    }
    nextToken
  }
}
`;
