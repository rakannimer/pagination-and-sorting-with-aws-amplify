import produce from "immer";
import nanoid from "nanoid";
import * as React from "react";

import { Action, State, Dispatcher } from "./types";

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "append-channels": {
      const { items, nextToken } = action.payload;
      return produce(state, s => {
        for (let channel of items) {
          const currentChannelIndex = s.channels.items.findIndex(
            v => v.id === channel.id
          );
          if (currentChannelIndex === -1) {
            s.channels.items.push(channel);
          } else {
            s.channels.items[currentChannelIndex] = channel;
          }
        }
        s.channels.nextToken = nextToken;
      });
    }
    case "prepend-channel": {
      return produce(state, s => {
        // Insert at position 0, without deleting, the elements of payload
        s.channels.items.splice(
          -1, //action.payload.items.length - 1,
          0,
          action.payload
        );
        // s.channels.nextToken = action.payload.nextToken;
      });
    }
    case "prepend-channels": {
      return produce(state, s => {
        // Insert at position 0, without deleting, the elements of payload
        s.channels.items.splice(
          -1, //action.payload.items.length - 1,
          0,
          ...action.payload.items
        );
        s.channels.nextToken = action.payload.nextToken;
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
          const currentChannelIndex = s.channels.items.findIndex(
            v => v.id === channel.id
          );
          if (currentChannelIndex === -1) {
            s.channels.items.push(channel);
          } else {
            s.channels.items[currentChannelIndex] = channel;
          }
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
            name: ""
          });
          return;
        }
        s.channels.items[channelIndex].messages = messages;
      });
    }
    case "append-message": {
      const channelIndex = state.channels.items.findIndex(
        channel => channel.id === action.payload.messageChannelId
      );
      if (channelIndex === -1) return state;
      return produce(state, s => {
        s.channels.items[channelIndex].messages.items.push(action.payload);
      });
    }
    case "prepend-message": {
      const channelIndex = state.channels.items.findIndex(
        channel => channel.id === action.payload.messageChannelId
      );
      if (channelIndex === -1) return state;
      return produce(state, s => {
        s.channels.items[channelIndex].messages.items.unshift(action.payload);
      });
    }
    case "append-messages": {
      const { messages, channelId } = action.payload;

      const channelIndex = state.channels.items.findIndex(
        channel => channel.id === channelId
      );
      if (channelIndex === -1) return state;
      return produce(state, s => {
        // const messages = messages.
        for (let message of messages.items) {
          const currentMessageIndex = s.channels.items[
            channelIndex
          ].messages.items.findIndex(v => v.id === message.id);
          if (currentMessageIndex === -1) {
            s.channels.items[channelIndex].messages.items.push(message);
          } else {
            s.channels.items[channelIndex].messages.items[
              currentMessageIndex
            ] = message;
          }
        }
        s.channels.items[channelIndex].messages.nextToken = messages.nextToken;
      });
    }
    case "set-my-info": {
      return produce(state, s => {
        s.me = action.payload;
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

const STATE_KEY = "my-state- 4" + Date.now();

export const getInitialState = () => {
  const state = parseJson<State>(localStorage.getItem(STATE_KEY), {
    me: {},
    channels: { items: [], nextToken: "" }
  });
  if (Boolean(state.me.id) === false) {
    state.me = { ...state.me, id: nanoid() };
  }
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
