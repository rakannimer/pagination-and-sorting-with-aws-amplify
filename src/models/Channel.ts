import { API, graphqlOperation } from "aws-amplify";

import { getMessageList } from "./custom-queries";
import {
  createMessage as createMessageQuery,
  updateChannel
} from "../graphql/mutations";
import {
  onCreateMessageInChannel,
  onCreateMessage as onCreateMessageQuery
} from "../graphql/subscriptions";
import {
  UpdateChannelInput,
  CreateMessageInput,
  OnCreateMessageInChannelSubscription
} from "../API";
import { MessageType, List, Listener } from "../types";

export const createMessage = async (
  message: CreateMessageInput & { messageChannelId: string }
) => {
  try {
    await (API.graphql(
      graphqlOperation(createMessageQuery, { input: message })
    ) as Promise<unknown>);
    const updateChannelInput: UpdateChannelInput = {
      id: message.messageChannelId,
      updatedAt: `${Date.now()}`
    };
    await (API.graphql(
      graphqlOperation(updateChannel, { input: updateChannelInput })
    ) as Promise<unknown>);
  } catch (err) {
    console.warn("Failed to create message ", err);
  }
};

type ChannelMessageReturnType = {
  data: {
    getChannel: {
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      creatorId: string;
      messages: List<MessageType>;
    };
  };
};
export const getChannelMessages = async (
  channelId: string,
  nextToken: string
): Promise<{
  messages: ChannelMessageReturnType["data"]["getChannel"]["messages"];
  channel: Partial<ChannelMessageReturnType["data"]["getChannel"]>;
}> => {
  try {
    const query = getMessageList({
      // messageLimit: 5,
      messageNextToken: nextToken
    });
    const messages = (await API.graphql(
      graphqlOperation(query, { id: channelId })
    )) as ChannelMessageReturnType;
    return {
      messages: messages.data.getChannel.messages,
      channel: messages.data.getChannel
    };
  } catch (err) {
    console.warn("Failed to get messages ", err);
    return { messages: { items: [], nextToken: "" }, channel: {} };
  }
};
export const onCreateMessage = (channelId: string) => {
  const listener: Listener<OnCreateMessageInChannelSubscription> = API.graphql(
    graphqlOperation(onCreateMessageInChannel, { messageChannelId: channelId })
  );
  return listener;
};
