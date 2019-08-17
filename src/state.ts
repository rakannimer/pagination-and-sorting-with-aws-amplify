import produce from "immer";
import nanoid from "nanoid";
import * as React from "react";

import { Action, State, Dispatcher } from "./types";

export const STATE_KEY = "my-state-26"; // + Date.now();

const addOrUpdate = <T extends { id: string }>(
  list: T[],
  id: string,
  newItem: T,
  operation: "push" | "unshift"
) => {
  const itemIndex = list.findIndex(v => v.id === id);
  if (itemIndex === -1) {
    if (operation === "push") {
      list.push(newItem);
    } else {
      list.unshift(newItem);
    }
  } else {
    list[itemIndex] = newItem;
  }
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "append-channels": {
      const { items, nextToken } = action.payload;
      return produce(state, s => {
        for (let channel of items) {
          addOrUpdate(s.channels.items, channel.id, channel, "push");
        }
        s.channels.nextToken = nextToken;
      });
    }
    case "prepend-channel": {
      return produce(state, s => {
        addOrUpdate(
          s.channels.items,
          action.payload.id,
          action.payload,
          "unshift"
        );
      });
    }
    case "set-channels": {
      return produce(state, s => {
        if (s.channels.items.length === 0) {
          s.channels = action.payload;
          return;
        }
        const channels = action.payload.items;
        const nextToken = action.payload.nextToken;
        s.channels.nextToken = nextToken;
        for (let channel of channels) {
          addOrUpdate(s.channels.items, channel.id, channel, "unshift");
        }
      });
    }
    case "set-messages": {
      const { messages, channelId } = action.payload;

      const channelIndex = state.channels.items.findIndex(
        channel => channel.id === channelId
      );
      return produce(state, s => {
        if (channelIndex === -1) {
          s.channels.items.push({
            id: channelId,
            messages,
            createdAt: "",
            updatedAt: "",
            creatorId: "",
            name: ""
          });
          return;
        }
        s.channels.items[channelIndex].messages = messages;
      });
    }
    case "prepend-message": {
      let channelIndex = state.channels.items.findIndex(
        channel => channel.id === action.payload.messageChannelId
      );

      return produce(state, s => {
        if (channelIndex === -1) {
          s.channels.items.unshift({
            id: action.payload.messageChannelId,
            name: "",
            createdAt: "",
            updatedAt: "",
            creatorId: "",
            messages: {
              items: [],
              nextToken: ""
            }
          });
          channelIndex = 0;
        }
        addOrUpdate(
          s.channels.items[channelIndex].messages.items,
          action.payload.id,
          action.payload,
          "unshift"
        );
      });
    }
    case "append-messages": {
      const { messages, channelId } = action.payload;

      const channelIndex = state.channels.items.findIndex(
        channel => channel.id === channelId
      );

      return produce(state, s => {
        if (channelIndex === -1) {
          s.channels.items.push({
            id: channelId,
            messages,
            createdAt: "",
            updatedAt: "",
            name: "",
            creatorId: ""
          });
          return;
        }
        for (let message of messages.items) {
          addOrUpdate(
            s.channels.items[channelIndex].messages.items,
            message.id,
            message,
            "push"
          );
        }
        s.channels.items[channelIndex].messages.nextToken = messages.nextToken;
      });
    }
    case "set-my-info": {
      return produce(state, s => {
        s.me = action.payload;
      });
    }
    case "update-channel": {
      const channelIndex = state.channels.items.findIndex(
        v => v.id === action.payload.id
      );

      return produce(state, s => {
        if (channelIndex === -1) {
          s.channels.items.unshift(action.payload);
          return;
        }
        s.channels.items[channelIndex].id = action.payload.id || "";
        s.channels.items[channelIndex].createdAt =
          action.payload.createdAt || "";
        s.channels.items[channelIndex].updatedAt =
          action.payload.updatedAt || "";
        s.channels.items[channelIndex].name = action.payload.name || "";
        s.channels.items[channelIndex].creatorId =
          action.payload.creatorId || "";
      });
    }
    case "move-to-front": {
      const channelIndex = state.channels.items.findIndex(
        v => v.id === action.payload.id
      );

      return produce(state, s => {
        if (channelIndex === -1) {
          s.channels.items.unshift(action.payload);
          return;
        }
        const [channel] = s.channels.items.splice(channelIndex, 1);
        s.channels.items.unshift(channel);
      });
    }
    default: {
      console.error(`Received unrecognized action `, action);
      throw new Error(
        `Received unrecognized action ${JSON.stringify(action, null, 2)}`
      );
    }
  }
};

export function parseJson<T = unknown>(
  jsonString: string | null,
  defaultVal: T
): T {
  if (jsonString === null) return defaultVal;
  try {
    const result = JSON.parse(jsonString);
    if (result === null || result === undefined) return defaultVal;
    return result;
  } catch (err) {
    console.warn("Could not parse jsonString ", jsonString);
    return defaultVal;
  }
}

export const getInitialState = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return { me: { id: "" }, channels: { items: [], nextToken: "" } };
  }
  const userId = localStorage.getItem("user-id") || nanoid();
  const state = parseJson<State>(localStorage.getItem(STATE_KEY), {
    me: {
      id: userId
    },
    channels: { items: [], nextToken: "" }
  });
  localStorage.setItem("user-id", userId);
  return state;
};
export const withCache = (reducer: React.Reducer<State, Action>) => {
  return (state: State, action: Action) => {
    const newState = reducer(state, action);
    localStorage.setItem(STATE_KEY, JSON.stringify(newState));
    return newState;
  };
};

export const DispatcherContext = React.createContext<Dispatcher>(() => {});

export const useAppReducer = () => {
  return React.useReducer(withCache(reducer), getInitialState());
};
