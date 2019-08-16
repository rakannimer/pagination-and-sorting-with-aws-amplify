import API from "@aws-amplify/api";
import PubSub from "@aws-amplify/pubsub";

// import { getMessageList, updateChannel } from "./custom-queries";
// import { createMessage as createMessageQuery } from "../graphql/mutations";
// import {
//   onCreateMessageInChannel,
//   onCreateMessage as onCreateMessageQuery
// } from "../graphql/subscriptions";
import {
  UpdateChannelInput,
  CreateMessageInput,
  OnCreateMessageInChannelSubscription
} from "../../API";
import { MessageType, List, Listener, ChannelType } from "../../types";

// API.configure(config);
// PubSub.configure(config);

export const createMessage = async (
  message: CreateMessageInput & { messageChannelId: string }
) => {
  // try {
  //   await (API.graphql(
  //     graphqlOperation(createMessageQuery, { input: message })
  //   ) as Promise<unknown>);
  //   const updateChannelInput: UpdateChannelInput = {
  //     id: message.messageChannelId,
  //     updatedAt: `${Date.now()}`
  //   };
  //   await (API.graphql(
  //     graphqlOperation(updateChannel, { input: updateChannelInput })
  //   ) as Promise<unknown>);
  // } catch (err) {
  //   console.warn("Failed to create message ", err);
  // }
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

type ReturnType = {
  messages: List<MessageType>;
  channel: ChannelType;
};
export const getChannelMessages = async (
  channelId: string | undefined,
  nextToken: string
): Promise<ReturnType> => {
  return null;
  // if (!channelId) {
  //   return {
  //     messages: { items: [], nextToken: "" },
  //     channel: {} as ChannelType
  //   };
  // }
  // try {
  //   const query = getMessageList({
  //     // messageLimit: 5,
  //     messageNextToken: nextToken
  //   });
  //   const messages = (await API.graphql(
  //     graphqlOperation(query, { id: channelId })
  //   )) as ChannelMessageReturnType;
  //   const channel = messages.data.getChannel;
  //   return {
  //     messages: messages.data.getChannel.messages,
  //     channel
  //   };
  // } catch (err) {
  //   console.warn("Failed to get messages ", err);
  //   return {
  //     messages: { items: [], nextToken: "" },
  //     channel: {} as ChannelType
  //   };
  // }
};
export const onCreateMessage = jest
  .fn()
  .mockImplementation((channelId: string) => {
    return {
      subscribe: () => {
        return {
          unsubscribe: () => {}
        };
      }
    };
  });

export const isMock = true;