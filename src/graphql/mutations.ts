// tslint:disable
// this is an auto generated file. This will be overwritten

export const createMessage = `mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
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
export const updateMessage = `mutation UpdateMessage($input: UpdateMessageInput!) {
  updateMessage(input: $input) {
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
export const deleteMessage = `mutation DeleteMessage($input: DeleteMessageInput!) {
  deleteMessage(input: $input) {
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
export const createTemp = `mutation CreateTemp($input: CreateTempInput!) {
  createTemp(input: $input) {
    id
  }
}
`;
export const updateTemp = `mutation UpdateTemp($input: UpdateTempInput!) {
  updateTemp(input: $input) {
    id
  }
}
`;
export const deleteTemp = `mutation DeleteTemp($input: DeleteTempInput!) {
  deleteTemp(input: $input) {
    id
  }
}
`;
export const createChannel = `mutation CreateChannel($input: CreateChannelInput!) {
  createChannel(input: $input) {
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
export const updateChannel = `mutation UpdateChannel($input: UpdateChannelInput!) {
  updateChannel(input: $input) {
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
export const deleteChannel = `mutation DeleteChannel($input: DeleteChannelInput!) {
  deleteChannel(input: $input) {
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
export const createChannelList = `mutation CreateChannelList($input: CreateChannelListInput!) {
  createChannelList(input: $input) {
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
export const updateChannelList = `mutation UpdateChannelList($input: UpdateChannelListInput!) {
  updateChannelList(input: $input) {
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
export const deleteChannelList = `mutation DeleteChannelList($input: DeleteChannelListInput!) {
  deleteChannelList(input: $input) {
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
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    bio
    url
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    name
    bio
    url
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    name
    bio
    url
  }
}
`;
