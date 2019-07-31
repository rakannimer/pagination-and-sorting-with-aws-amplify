// tslint:disable
// this is an auto generated file. This will be overwritten

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
export const onCreateChannel = `subscription OnCreateChannel {
  onCreateChannel {
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
export const onUpdateChannel = `subscription OnUpdateChannel {
  onUpdateChannel {
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
export const onDeleteChannel = `subscription OnDeleteChannel {
  onDeleteChannel {
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
export const onCreateChannelList = `subscription OnCreateChannelList {
  onCreateChannelList {
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
export const onUpdateChannelList = `subscription OnUpdateChannelList {
  onUpdateChannelList {
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
export const onDeleteChannelList = `subscription OnDeleteChannelList {
  onDeleteChannelList {
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
