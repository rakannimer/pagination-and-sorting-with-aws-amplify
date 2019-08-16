import nanoid from "nanoid";

export const createOnCreateChannelEmission = (channelId = nanoid()) => {
  return {
    value: {
      data: {
        onCreateChannelInList: createChannel(channelId)
      }
    }
  };
};

export const createOnCreateMessageEmission = (channelId = nanoid()) => {
  return {
    value: {
      data: {
        onCreateMessageInChannel: createMessage(channelId)
      }
    }
  };
};

export const createOnUpdateChannelEmission = (
  channelId = nanoid(),
  updatedAt = "0"
) => {
  return {
    value: {
      data: {
        onUpdateChannelInList: {
          id: channelId,
          name: channelId,
          updatedAt
        }
      }
    }
  };
};

export const createGetChannelsEmission = (channelId = nanoid()) => {
  return {
    items: [createChannel(channelId)],
    nextToken: ""
  };
};

export const createChannel = (id = nanoid()) => {
  return {
    id,
    name: id,
    messages: {
      items: [],
      nextToken: ""
    }
  };
};

export const createMessage = (
  channelId,
  id = nanoid(),
  senderId = "test_sender_id"
) => {
  return {
    id,
    text: id,
    senderId,
    messageChannelId: channelId
  };
};
