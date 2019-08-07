import memoize from "lodash.memoize";
import nanoid from "nanoid";

import { createChannel } from "./models/Channels";
import { Dispatcher, ChannelType } from "./types";

export const getActions = memoize(
  (dispatch: Dispatcher) => {
    const addChannel = (name: string, myId: string) => {
      const channel: ChannelType = {
        id: nanoid(),
        name,
        createdAt: `${Date.now()}`,
        updatedAt: `${Date.now()}`,
        creatorId: myId,
        messages: { items: [], nextToken: "" }
      };
      dispatch({
        type: "prepend-channel",
        payload: channel
      });
      createChannel(channel);
    };
    const loadMoreMessages = (nextToken: string) => {};
    return { addChannel };
  },
  dispatch => dispatch
);
