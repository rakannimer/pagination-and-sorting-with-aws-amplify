import API, { graphqlOperation } from "@aws-amplify/api";
// import PubSub from "@aws-amplify/pubsub";
import memoize from "lodash.memoize";

import {
  OnCreateChannelInListSubscription,
  OnUpdateChannelInListSubscription
} from "../../API";

import {
  createChannelList,
  createChannel as createChannelQuery
} from "../../graphql/mutations";
import {
  onCreateChannelInList,
  onUpdateChannelInList
} from "../../graphql/subscriptions";
import { State, ChannelType, List, Listener, MessageType } from "../../types";

//@ts-ignore
import config from "../../aws-exports.js";
import { getChannelList as getChannelListQuery } from "./custom-queries";

// API.configure(config);
// PubSub.configure(config);

type CustomChannelList = {
  data: {
    getChannelList: {
      id: string;
      channels: List<{
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        creatorId: string;
        messages: List<MessageType>;
      }>;
    };
  };
};

export let resolveGetChannels;

export const getGetChannelsResolver = () => resolveGetChannels;

export const getChannels = jest
  .fn()
  .mockImplementation(() => Promise.resolve({ items: [], nextToken: "" }));

// memoize(
//   (nextToken: string = ""): Promise<State["channels"]> => {
//     return new Promise(resolve => {
//       resolveGetChannels = () => {
//         console.warn("RESOLVING");
//         resolve({ items: [], nextToken: "" });
//       };
//     });
//   },
//   // Only memoize when a next token is provided
//   n => (n ? n : Date.now())
// );

export const createChannel = async (channel: ChannelType) => {};

export const onCreateChannel = (channelListId: string = "global") => {
  return {
    subscribe: () => {
      return {
        unsubscribe: () => {}
      };
    }
  };
};

export const onUpdateChannel = (channelListId: string = "global") => {
  return {
    subscribe: () => {
      return {
        unsubscribe: () => {}
      };
    }
  };
};
