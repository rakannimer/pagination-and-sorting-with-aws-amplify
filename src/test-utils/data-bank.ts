import nanoid from "nanoid";
import { ChannelType } from "../types";

export const createChannel = (id = nanoid()): ChannelType => {
  return {
    id,
    name: id,
    creatorId: "",
    createdAt: "",
    updatedAt: "",
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
    createdAt: "0",
    messageChannelId: channelId
  };
};

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

export const createGetChannelMessagesEmission = channelId => {
  return {
    messages: { items: [createMessage(channelId)], nextToken: "" },
    channel: createChannel(channelId)
  };
};

export const getUsernameEmission = (username = nanoid()) => {
  return {
    data: {
      getUser: {
        name: username
      }
    }
  };
};
