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
        nextToken: string;
      };
    };
  };
};
// Just to get nice formatting for our queries
const gql = String.raw;

const getCustomChannelList = ({
  nextToken
}: {
  nextToken: string;
}) => gql`query GetChannelList($id: ID!) {
  getChannelList(id: $id) {
    id
    channels(limit: 5, sortDirection: DESC, ${
      nextToken !== "" ? `nextToken:"${nextToken}"` : ``
    }) {
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
  console.warn("Getting channels");

  const channelList = await (API.graphql(
    graphqlOperation(
      getCustomChannelList({
        nextToken: ""
        // "eyJ2ZXJzaW9uIjoxLCJ0b2tlbiI6IkFRSUNBSGg5OUIvN3BjWU41eE96NDZJMW5GeGM4WUNGeG1acmFOMUpqajZLWkFDQ25BRVJIQTJSUWNYM0g5ZWgwNDQyVnJTUEFBQUROVENDQXpFR0NTcUdTSWIzRFFFSEJxQ0NBeUl3Z2dNZUFnRUFNSUlERndZSktvWklodmNOQVFjQk1CNEdDV0NHU0FGbEF3UUJMakFSQkF3cWV1MElzRXF5bTE4L0lvTUNBUkNBZ2dMbzJnNDdoc1R4dE40bUY5K3VmSmZEOG1sQ3lnaXB4RGszanFDR1RCanRhT3FvcGd1WDZUOWxXYlpCZkkyY0kvU1FlUGs1Wmt1SnlaZ2lDNThnMTB2bEZaTlhINmdBSWpxNVFMeThnWGdMZnIvUEttRnhzTzlqeURrRTZRREVlNy81Nk5qSjRkYjh2bWVhaXAvY0VvWlhQc3BoZE9qYStPbkZiSFRZQ2tMREhTcG12dUxtODNKNy9PMnp5OFZTOUtaMkJEV2t6OHpqVE93UkFKKzRRUjRiN2RrR1BKcHJJeFBHa01OUzF5RmZvdnJqMndVTzViS3FYKzJlNW1lMExVOUZNVXNxTVYzYk9GUGwwcTFHTERycDRtTU0zUGdXM1I2dlVQUkpkTkZ3TFhjbW1KVjZad21id0JhV2tDcEhXUFJmYVJDQ0VGSDJSZjJCVk05QlI5cS9vMFpHUGpNRWVGYjlOYzRsYnFObUN4YVdLcjBaaGgySVB5MEk3RVlBNTF4ajN1TUZrZFZQZHp3R3U0SjJoVGtwZXRianNaSTd2M3UvR0hDVHhKc3Rla1FMSlhnelNDbU9acXdyQU1iMElmb0NNRE1KWmxqeUJ4R2dKS1Jabkh2OWRqcmFlTGFwVDR5ek5Ib2U4cDg2YVo2RkZrWm9QTHpUSWFuMjIzSXRBUXRKUzZGZTRqRG9kdGplT2RRRnV6V2loOWh0U09CSmlCR2Z2Z2grRi9VL1JVNUEzVlpOczRvRDlQWDBXVjhNZU9Yc1E5RkxDR1hOR0ZjQTZUSjBMR2NXMUZUbDJsazhSRm44QXJ0RFJYS1BESlNwZGVZU1ZGbUlmdmFPSm9ESWd4RmhYVVRvL2dwdmNHMVJrRERGbWFDdWtLTDJYY1U1SEpQc2xid1oyWmlwUkc0a0xLcEJWV3c4ekNXSDdwYnJWZ3RrM0cxSGhpUVdBUm5QQkwrcXM0cFM4MlJvVEM5Q0VvY0VQVjJRazZXWEhxeFVxM1ZiMkVucHRuVlRFYlNoZlFpZk1ybzNyQWpzQnlYNXBSQWdlWlN6cHZpREtMMTZvaCtUNzR3bXR1ZVRYb0ZmYUJhbmZGOElCZjEvUTYrdHdsWG1BZ2RzTzQ4MHJjR09QVkhKb3ZqSlIyMGRJVkVpQy9odTlQekxoblAweFNyUndXZjY4SlVMMUZWWGNscDQ4a0FwQUZXQ1JUTWRTSVJFNndJZFM3NmxaRVZSMm9TamJ4R2lOUzZyZ3VhNm1zeGFXZTZPN0JtZkp4VEJkVTlWQkZRbHphVFBFT20rZFNjVmhCd0VxYUFweEZtMmhFcnMxRG11In0="
      }),
      {
        id: "global"
      }
    )
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
  console.warn(channelList.data.getChannelList);
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
