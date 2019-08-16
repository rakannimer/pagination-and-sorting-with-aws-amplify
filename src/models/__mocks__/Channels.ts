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

export const getChannels = jest.fn();

export const createChannel = jest.fn();

export const onCreateChannel = jest.fn();

export const onUpdateChannel = jest.fn();
