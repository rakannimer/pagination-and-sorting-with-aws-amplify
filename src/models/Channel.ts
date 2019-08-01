import { API, graphqlOperation } from "aws-amplify";
import {
  createMessage as createMessageQuery,
  updateChannel
} from "../graphql/mutations";
import { UpdateChannelInput } from "../API";
import { MessageType } from "../types";

export const createMessage = async (message: MessageType) => {
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
