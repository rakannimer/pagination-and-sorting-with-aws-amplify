/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateMessageInput = {
  id?: string | null;
  text: string;
  createdAt?: string | null;
  senderId?: string | null;
  messageChannelId?: string | null;
};

export type UpdateMessageInput = {
  id: string;
  text?: string | null;
  createdAt?: string | null;
  senderId?: string | null;
  messageChannelId?: string | null;
};

export type DeleteMessageInput = {
  id?: string | null;
};

export type CreateChannelInput = {
  id?: string | null;
  name: string;
  createdAt: string;
  updatedAt: string;
  creatorId?: string | null;
  channelChannelListId?: string | null;
};

export type UpdateChannelInput = {
  id: string;
  name?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  creatorId?: string | null;
  channelChannelListId?: string | null;
};

export type DeleteChannelInput = {
  id?: string | null;
};

export type CreateChannelListInput = {
  id?: string | null;
};

export type UpdateChannelListInput = {
  id: string;
};

export type DeleteChannelListInput = {
  id?: string | null;
};

export type CreateUserInput = {
  id?: string | null;
  name?: string | null;
  bio?: string | null;
  url?: string | null;
};

export type UpdateUserInput = {
  id: string;
  name?: string | null;
  bio?: string | null;
  url?: string | null;
};

export type DeleteUserInput = {
  id?: string | null;
};

export type ModelMessageFilterInput = {
  id?: ModelIDFilterInput | null;
  text?: ModelStringFilterInput | null;
  createdAt?: ModelStringFilterInput | null;
  senderId?: ModelStringFilterInput | null;
  messageChannelId?: ModelStringFilterInput | null;
  and?: Array<ModelMessageFilterInput | null> | null;
  or?: Array<ModelMessageFilterInput | null> | null;
  not?: ModelMessageFilterInput | null;
};

export type ModelIDFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelStringFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelChannelFilterInput = {
  id?: ModelIDFilterInput | null;
  name?: ModelStringFilterInput | null;
  createdAt?: ModelStringFilterInput | null;
  updatedAt?: ModelStringFilterInput | null;
  creatorId?: ModelStringFilterInput | null;
  channelChannelListId?: ModelStringFilterInput | null;
  and?: Array<ModelChannelFilterInput | null> | null;
  or?: Array<ModelChannelFilterInput | null> | null;
  not?: ModelChannelFilterInput | null;
};

export type ModelChannelListFilterInput = {
  id?: ModelIDFilterInput | null;
  and?: Array<ModelChannelListFilterInput | null> | null;
  or?: Array<ModelChannelListFilterInput | null> | null;
  not?: ModelChannelListFilterInput | null;
};

export type ModelUserFilterInput = {
  id?: ModelIDFilterInput | null;
  name?: ModelStringFilterInput | null;
  bio?: ModelStringFilterInput | null;
  url?: ModelStringFilterInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export type CreateMessageMutationVariables = {
  input: CreateMessageInput;
};

export type CreateMessageMutation = {
  createMessage: {
    __typename: "Message";
    id: string;
    text: string;
    createdAt: string | null;
    senderId: string | null;
    channel: {
      __typename: "Channel";
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      creatorId: string | null;
      messages: {
        __typename: "ModelMessageConnection";
        nextToken: string | null;
      } | null;
      channelList: {
        __typename: "ChannelList";
        id: string;
      } | null;
      channelChannelListId: string | null;
    } | null;
    messageChannelId: string | null;
  } | null;
};

export type UpdateMessageMutationVariables = {
  input: UpdateMessageInput;
};

export type UpdateMessageMutation = {
  updateMessage: {
    __typename: "Message";
    id: string;
    text: string;
    createdAt: string | null;
    senderId: string | null;
    channel: {
      __typename: "Channel";
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      creatorId: string | null;
      messages: {
        __typename: "ModelMessageConnection";
        nextToken: string | null;
      } | null;
      channelList: {
        __typename: "ChannelList";
        id: string;
      } | null;
      channelChannelListId: string | null;
    } | null;
    messageChannelId: string | null;
  } | null;
};

export type DeleteMessageMutationVariables = {
  input: DeleteMessageInput;
};

export type DeleteMessageMutation = {
  deleteMessage: {
    __typename: "Message";
    id: string;
    text: string;
    createdAt: string | null;
    senderId: string | null;
    channel: {
      __typename: "Channel";
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      creatorId: string | null;
      messages: {
        __typename: "ModelMessageConnection";
        nextToken: string | null;
      } | null;
      channelList: {
        __typename: "ChannelList";
        id: string;
      } | null;
      channelChannelListId: string | null;
    } | null;
    messageChannelId: string | null;
  } | null;
};

export type CreateChannelMutationVariables = {
  input: CreateChannelInput;
};

export type CreateChannelMutation = {
  createChannel: {
    __typename: "Channel";
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    creatorId: string | null;
    messages: {
      __typename: "ModelMessageConnection";
      items: Array<{
        __typename: "Message";
        id: string;
        text: string;
        createdAt: string | null;
        senderId: string | null;
        messageChannelId: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    channelList: {
      __typename: "ChannelList";
      id: string;
      channels: {
        __typename: "ModelChannelConnection";
        nextToken: string | null;
      } | null;
    } | null;
    channelChannelListId: string | null;
  } | null;
};

export type UpdateChannelMutationVariables = {
  input: UpdateChannelInput;
};

export type UpdateChannelMutation = {
  updateChannel: {
    __typename: "Channel";
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    creatorId: string | null;
    messages: {
      __typename: "ModelMessageConnection";
      items: Array<{
        __typename: "Message";
        id: string;
        text: string;
        createdAt: string | null;
        senderId: string | null;
        messageChannelId: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    channelList: {
      __typename: "ChannelList";
      id: string;
      channels: {
        __typename: "ModelChannelConnection";
        nextToken: string | null;
      } | null;
    } | null;
    channelChannelListId: string | null;
  } | null;
};

export type DeleteChannelMutationVariables = {
  input: DeleteChannelInput;
};

export type DeleteChannelMutation = {
  deleteChannel: {
    __typename: "Channel";
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    creatorId: string | null;
    messages: {
      __typename: "ModelMessageConnection";
      items: Array<{
        __typename: "Message";
        id: string;
        text: string;
        createdAt: string | null;
        senderId: string | null;
        messageChannelId: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    channelList: {
      __typename: "ChannelList";
      id: string;
      channels: {
        __typename: "ModelChannelConnection";
        nextToken: string | null;
      } | null;
    } | null;
    channelChannelListId: string | null;
  } | null;
};

export type CreateChannelListMutationVariables = {
  input: CreateChannelListInput;
};

export type CreateChannelListMutation = {
  createChannelList: {
    __typename: "ChannelList";
    id: string;
    channels: {
      __typename: "ModelChannelConnection";
      items: Array<{
        __typename: "Channel";
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        creatorId: string | null;
        channelChannelListId: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type UpdateChannelListMutationVariables = {
  input: UpdateChannelListInput;
};

export type UpdateChannelListMutation = {
  updateChannelList: {
    __typename: "ChannelList";
    id: string;
    channels: {
      __typename: "ModelChannelConnection";
      items: Array<{
        __typename: "Channel";
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        creatorId: string | null;
        channelChannelListId: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type DeleteChannelListMutationVariables = {
  input: DeleteChannelListInput;
};

export type DeleteChannelListMutation = {
  deleteChannelList: {
    __typename: "ChannelList";
    id: string;
    channels: {
      __typename: "ModelChannelConnection";
      items: Array<{
        __typename: "Channel";
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        creatorId: string | null;
        channelChannelListId: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type CreateUserMutationVariables = {
  input: CreateUserInput;
};

export type CreateUserMutation = {
  createUser: {
    __typename: "User";
    id: string;
    name: string | null;
    bio: string | null;
    url: string | null;
  } | null;
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput;
};

export type UpdateUserMutation = {
  updateUser: {
    __typename: "User";
    id: string;
    name: string | null;
    bio: string | null;
    url: string | null;
  } | null;
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput;
};

export type DeleteUserMutation = {
  deleteUser: {
    __typename: "User";
    id: string;
    name: string | null;
    bio: string | null;
    url: string | null;
  } | null;
};

export type GetMessageQueryVariables = {
  id: string;
};

export type GetMessageQuery = {
  getMessage: {
    __typename: "Message";
    id: string;
    text: string;
    createdAt: string | null;
    senderId: string | null;
    channel: {
      __typename: "Channel";
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      creatorId: string | null;
      messages: {
        __typename: "ModelMessageConnection";
        nextToken: string | null;
      } | null;
      channelList: {
        __typename: "ChannelList";
        id: string;
      } | null;
      channelChannelListId: string | null;
    } | null;
    messageChannelId: string | null;
  } | null;
};

export type ListMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListMessagesQuery = {
  listMessages: {
    __typename: "ModelMessageConnection";
    items: Array<{
      __typename: "Message";
      id: string;
      text: string;
      createdAt: string | null;
      senderId: string | null;
      channel: {
        __typename: "Channel";
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        creatorId: string | null;
        channelChannelListId: string | null;
      } | null;
      messageChannelId: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type GetChannelQueryVariables = {
  id: string;
};

export type GetChannelQuery = {
  getChannel: {
    __typename: "Channel";
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    creatorId: string | null;
    messages: {
      __typename: "ModelMessageConnection";
      items: Array<{
        __typename: "Message";
        id: string;
        text: string;
        createdAt: string | null;
        senderId: string | null;
        messageChannelId: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    channelList: {
      __typename: "ChannelList";
      id: string;
      channels: {
        __typename: "ModelChannelConnection";
        nextToken: string | null;
      } | null;
    } | null;
    channelChannelListId: string | null;
  } | null;
};

export type ListChannelsQueryVariables = {
  filter?: ModelChannelFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListChannelsQuery = {
  listChannels: {
    __typename: "ModelChannelConnection";
    items: Array<{
      __typename: "Channel";
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      creatorId: string | null;
      messages: {
        __typename: "ModelMessageConnection";
        nextToken: string | null;
      } | null;
      channelList: {
        __typename: "ChannelList";
        id: string;
      } | null;
      channelChannelListId: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type GetChannelListQueryVariables = {
  id: string;
};

export type GetChannelListQuery = {
  getChannelList: {
    __typename: "ChannelList";
    id: string;
    channels: {
      __typename: "ModelChannelConnection";
      items: Array<{
        __typename: "Channel";
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        creatorId: string | null;
        channelChannelListId: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type ListChannelListsQueryVariables = {
  filter?: ModelChannelListFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListChannelListsQuery = {
  listChannelLists: {
    __typename: "ModelChannelListConnection";
    items: Array<{
      __typename: "ChannelList";
      id: string;
      channels: {
        __typename: "ModelChannelConnection";
        nextToken: string | null;
      } | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type GetUserQueryVariables = {
  id: string;
};

export type GetUserQuery = {
  getUser: {
    __typename: "User";
    id: string;
    name: string | null;
    bio: string | null;
    url: string | null;
  } | null;
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListUsersQuery = {
  listUsers: {
    __typename: "ModelUserConnection";
    items: Array<{
      __typename: "User";
      id: string;
      name: string | null;
      bio: string | null;
      url: string | null;
    } | null> | null;
    nextToken: string | null;
  } | null;
};

export type OnCreateChannelInListSubscriptionVariables = {
  channelChannelListId: string;
};

export type OnCreateChannelInListSubscription = {
  onCreateChannelInList: {
    __typename: "Channel";
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    creatorId: string | null;
    messages: {
      __typename: "ModelMessageConnection";
      items: Array<{
        __typename: "Message";
        id: string;
        text: string;
        createdAt: string | null;
        senderId: string | null;
        messageChannelId: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    channelList: {
      __typename: "ChannelList";
      id: string;
      channels: {
        __typename: "ModelChannelConnection";
        nextToken: string | null;
      } | null;
    } | null;
    channelChannelListId: string | null;
  } | null;
};

export type OnUpdateChannelInListSubscriptionVariables = {
  channelChannelListId: string;
};

export type OnUpdateChannelInListSubscription = {
  onUpdateChannelInList: {
    __typename: "Channel";
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    creatorId: string | null;
    messages: {
      __typename: "ModelMessageConnection";
      items: Array<{
        __typename: "Message";
        id: string;
        text: string;
        createdAt: string | null;
        senderId: string | null;
        messageChannelId: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    channelList: {
      __typename: "ChannelList";
      id: string;
      channels: {
        __typename: "ModelChannelConnection";
        nextToken: string | null;
      } | null;
    } | null;
    channelChannelListId: string | null;
  } | null;
};

export type OnCreateMessageInChannelSubscriptionVariables = {
  messageChannelId: string;
};

export type OnCreateMessageInChannelSubscription = {
  onCreateMessageInChannel: {
    __typename: "Message";
    id: string;
    text: string;
    createdAt: string | null;
    senderId: string | null;
    channel: {
      __typename: "Channel";
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      creatorId: string | null;
      messages: {
        __typename: "ModelMessageConnection";
        nextToken: string | null;
      } | null;
      channelList: {
        __typename: "ChannelList";
        id: string;
      } | null;
      channelChannelListId: string | null;
    } | null;
    messageChannelId: string | null;
  } | null;
};

export type OnCreateMessageSubscription = {
  onCreateMessage: {
    __typename: "Message";
    id: string;
    text: string;
    createdAt: string | null;
    senderId: string | null;
    channel: {
      __typename: "Channel";
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      creatorId: string | null;
      messages: {
        __typename: "ModelMessageConnection";
        nextToken: string | null;
      } | null;
      channelList: {
        __typename: "ChannelList";
        id: string;
      } | null;
      channelChannelListId: string | null;
    } | null;
    messageChannelId: string | null;
  } | null;
};

export type OnUpdateMessageSubscription = {
  onUpdateMessage: {
    __typename: "Message";
    id: string;
    text: string;
    createdAt: string | null;
    senderId: string | null;
    channel: {
      __typename: "Channel";
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      creatorId: string | null;
      messages: {
        __typename: "ModelMessageConnection";
        nextToken: string | null;
      } | null;
      channelList: {
        __typename: "ChannelList";
        id: string;
      } | null;
      channelChannelListId: string | null;
    } | null;
    messageChannelId: string | null;
  } | null;
};

export type OnDeleteMessageSubscription = {
  onDeleteMessage: {
    __typename: "Message";
    id: string;
    text: string;
    createdAt: string | null;
    senderId: string | null;
    channel: {
      __typename: "Channel";
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      creatorId: string | null;
      messages: {
        __typename: "ModelMessageConnection";
        nextToken: string | null;
      } | null;
      channelList: {
        __typename: "ChannelList";
        id: string;
      } | null;
      channelChannelListId: string | null;
    } | null;
    messageChannelId: string | null;
  } | null;
};

export type OnCreateChannelSubscription = {
  onCreateChannel: {
    __typename: "Channel";
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    creatorId: string | null;
    messages: {
      __typename: "ModelMessageConnection";
      items: Array<{
        __typename: "Message";
        id: string;
        text: string;
        createdAt: string | null;
        senderId: string | null;
        messageChannelId: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    channelList: {
      __typename: "ChannelList";
      id: string;
      channels: {
        __typename: "ModelChannelConnection";
        nextToken: string | null;
      } | null;
    } | null;
    channelChannelListId: string | null;
  } | null;
};

export type OnUpdateChannelSubscription = {
  onUpdateChannel: {
    __typename: "Channel";
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    creatorId: string | null;
    messages: {
      __typename: "ModelMessageConnection";
      items: Array<{
        __typename: "Message";
        id: string;
        text: string;
        createdAt: string | null;
        senderId: string | null;
        messageChannelId: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    channelList: {
      __typename: "ChannelList";
      id: string;
      channels: {
        __typename: "ModelChannelConnection";
        nextToken: string | null;
      } | null;
    } | null;
    channelChannelListId: string | null;
  } | null;
};

export type OnDeleteChannelSubscription = {
  onDeleteChannel: {
    __typename: "Channel";
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    creatorId: string | null;
    messages: {
      __typename: "ModelMessageConnection";
      items: Array<{
        __typename: "Message";
        id: string;
        text: string;
        createdAt: string | null;
        senderId: string | null;
        messageChannelId: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
    channelList: {
      __typename: "ChannelList";
      id: string;
      channels: {
        __typename: "ModelChannelConnection";
        nextToken: string | null;
      } | null;
    } | null;
    channelChannelListId: string | null;
  } | null;
};

export type OnCreateChannelListSubscription = {
  onCreateChannelList: {
    __typename: "ChannelList";
    id: string;
    channels: {
      __typename: "ModelChannelConnection";
      items: Array<{
        __typename: "Channel";
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        creatorId: string | null;
        channelChannelListId: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnUpdateChannelListSubscription = {
  onUpdateChannelList: {
    __typename: "ChannelList";
    id: string;
    channels: {
      __typename: "ModelChannelConnection";
      items: Array<{
        __typename: "Channel";
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        creatorId: string | null;
        channelChannelListId: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnDeleteChannelListSubscription = {
  onDeleteChannelList: {
    __typename: "ChannelList";
    id: string;
    channels: {
      __typename: "ModelChannelConnection";
      items: Array<{
        __typename: "Channel";
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        creatorId: string | null;
        channelChannelListId: string | null;
      } | null> | null;
      nextToken: string | null;
    } | null;
  } | null;
};

export type OnCreateUserSubscription = {
  onCreateUser: {
    __typename: "User";
    id: string;
    name: string | null;
    bio: string | null;
    url: string | null;
  } | null;
};

export type OnUpdateUserSubscription = {
  onUpdateUser: {
    __typename: "User";
    id: string;
    name: string | null;
    bio: string | null;
    url: string | null;
  } | null;
};

export type OnDeleteUserSubscription = {
  onDeleteUser: {
    __typename: "User";
    id: string;
    name: string | null;
    bio: string | null;
    url: string | null;
  } | null;
};
