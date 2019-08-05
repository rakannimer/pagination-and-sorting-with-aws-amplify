// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateChannelInList = `subscription OnCreateChannelInList($channelChannelListId: ID!) {
  onCreateChannelInList(channelChannelListId: $channelChannelListId) {
    id
    name
    createdAt
    updatedAt
    creatorId
    messages {
      items {
        id
        text
        createdAt
        senderId
        messageChannelId
      }
      nextToken
    }
    channelList {
      id
      channels {
        nextToken
      }
    }
    channelChannelListId
  }
}
`;
export const onUpdateChannelInList = `subscription OnUpdateChannelInList($channelChannelListId: ID!) {
  onUpdateChannelInList(channelChannelListId: $channelChannelListId) {
    id
    name
    createdAt
    updatedAt
    creatorId
    messages {
      items {
        id
        text
        createdAt
        senderId
        messageChannelId
      }
      nextToken
    }
    channelList {
      id
      channels {
        nextToken
      }
    }
    channelChannelListId
  }
}
`;
export const onCreateMessageInChannel = `subscription OnCreateMessageInChannel($messageChannelId: ID!) {
  onCreateMessageInChannel(messageChannelId: $messageChannelId) {
    id
    text
    createdAt
    senderId
    channel {
      id
      name
      createdAt
      updatedAt
      creatorId
      messages {
        nextToken
      }
      channelList {
        id
      }
      channelChannelListId
    }
    messageChannelId
  }
}
`;
export const onCreateMessage = `subscription OnCreateMessage {
  onCreateMessage {
    id
    text
    createdAt
    senderId
    channel {
      id
      name
      createdAt
      updatedAt
      creatorId
      messages {
        nextToken
      }
      channelList {
        id
      }
      channelChannelListId
    }
    messageChannelId
  }
}
`;
export const onUpdateMessage = `subscription OnUpdateMessage {
  onUpdateMessage {
    id
    text
    createdAt
    senderId
    channel {
      id
      name
      createdAt
      updatedAt
      creatorId
      messages {
        nextToken
      }
      channelList {
        id
      }
      channelChannelListId
    }
    messageChannelId
  }
}
`;
export const onDeleteMessage = `subscription OnDeleteMessage {
  onDeleteMessage {
    id
    text
    createdAt
    senderId
    channel {
      id
      name
      createdAt
      updatedAt
      creatorId
      messages {
        nextToken
      }
      channelList {
        id
      }
      channelChannelListId
    }
    messageChannelId
  }
}
`;
export const onCreateChannel = `subscription OnCreateChannel {
  onCreateChannel {
    id
    name
    createdAt
    updatedAt
    creatorId
    messages {
      items {
        id
        text
        createdAt
        senderId
        messageChannelId
      }
      nextToken
    }
    channelList {
      id
      channels {
        nextToken
      }
    }
    channelChannelListId
  }
}
`;
export const onUpdateChannel = `subscription OnUpdateChannel {
  onUpdateChannel {
    id
    name
    createdAt
    updatedAt
    creatorId
    messages {
      items {
        id
        text
        createdAt
        senderId
        messageChannelId
      }
      nextToken
    }
    channelList {
      id
      channels {
        nextToken
      }
    }
    channelChannelListId
  }
}
`;
export const onDeleteChannel = `subscription OnDeleteChannel {
  onDeleteChannel {
    id
    name
    createdAt
    updatedAt
    creatorId
    messages {
      items {
        id
        text
        createdAt
        senderId
        messageChannelId
      }
      nextToken
    }
    channelList {
      id
      channels {
        nextToken
      }
    }
    channelChannelListId
  }
}
`;
export const onCreateChannelList = `subscription OnCreateChannelList {
  onCreateChannelList {
    id
    channels {
      items {
        id
        name
        createdAt
        updatedAt
        creatorId
        channelChannelListId
      }
      nextToken
    }
  }
}
`;
export const onUpdateChannelList = `subscription OnUpdateChannelList {
  onUpdateChannelList {
    id
    channels {
      items {
        id
        name
        createdAt
        updatedAt
        creatorId
        channelChannelListId
      }
      nextToken
    }
  }
}
`;
export const onDeleteChannelList = `subscription OnDeleteChannelList {
  onDeleteChannelList {
    id
    channels {
      items {
        id
        name
        createdAt
        updatedAt
        creatorId
        channelChannelListId
      }
      nextToken
    }
  }
}
`;
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
    name
    bio
    url
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
    name
    bio
    url
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    id
    name
    bio
    url
  }
}
`;
