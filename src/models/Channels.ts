import { API, graphqlOperation } from "aws-amplify";

import {
  createChannelList,
  createChannel as createChannelQuery
} from "../graphql/mutations";
import { State, ChannelType } from "../types";
import config from "../aws-exports.js";

API.configure(config);

type CustomChannelList = {
  data: {
    getChannelList: {
      id: string;
      channels: {
        items: {
          id: string;
          name: string;
          createdAt: string;
          updatedAt: string;
          messages: {
            items: {
              id: string;
              text: string;
              createdAt: string;
              senderId: string;
            }[];
          };
        }[];
      };
    };
  };
};

const getCustomChannelList = `query GetChannelList($id: ID!) {
  getChannelList(id: $id) {
    id
    channels {
      items {
        id
        name
        createdAt
        updatedAt
        messages {
          items {
            id
            createdAt
            senderId
            text
          } 
          
        }
      }
      nextToken
    }
  }
}
`;
export const getChannels = async (): Promise<State["channels"]> => {
  const channelList = await (API.graphql(
    graphqlOperation(getCustomChannelList, { id: "global" })
  ) as Promise<CustomChannelList>);
  if (channelList.data.getChannelList === null) {
    try {
      await API.graphql(
        graphqlOperation(createChannelList, { input: { id: "global" } })
      );
    } catch (err) {
      console.warn("Failed to create channel list ", err);
    }
    return [];
  }
  // Massage the data a bit to give it the shape of our local state
  let channels = channelList.data.getChannelList.channels.items;
  const channelsWithMessages = channels.map(channel => ({
    ...channel,
    messages: channel.messages.items
  }));
  return channelsWithMessages;
};

export const createChannel = async (channel: ChannelType) => {
  try {
    const input = {
      ...channel,
      messages: undefined,
      channelChannelListId: "global"
    };
    await API.graphql(graphqlOperation(createChannelQuery, { input }));
  } catch (err) {
    console.warn("Could not create channel", channel, err);
  }
};
