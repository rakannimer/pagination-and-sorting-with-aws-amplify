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
) => {};

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
export const getChannelMessages = jest.fn();
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
