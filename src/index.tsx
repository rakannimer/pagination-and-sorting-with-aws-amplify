import produce from "immer";
import nanoid from "nanoid";
import * as React from "react";
import { render } from "react-dom";
import { View } from "react-native-web";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { ChannelRoute } from "./components/Channel";
import { ChannelsRoute } from "./components/Channels";
import { Header } from "./components/Header";
import { MyProfile } from "./components/MyProfile";
import { createUserIfNotExists } from "./models/User";
import { colors } from "./theme";
import { Action, State } from "./types";
import { getChannels } from "./models/Channels";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "append-channels": {
      const { items, nextToken } = action.payload;
      return produce(state, s => {
        s.channels.items.splice(items.length, 0, ...items);
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
            s.channels.items[currentChannelIndex].updatedAt = channel.updatedAt;
            s.channels.items[currentChannelIndex].createdAt = channel.createdAt;
            s.channels.items[currentChannelIndex].name = channel.name;
            s.channels.items[currentChannelIndex].id = channel.id;
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
        s.channels.items[channelIndex].messages.items.splice(
          s.channels.items[channelIndex].messages.items.length,
          0,
          ...messages.items
        );
        s.channels.items[channelIndex].messages.nextToken = messages.nextToken;
      });
    }
    case "set-my-info": {
      return produce(state, s => {
        for (let key of Object.keys(action.payload)) {
          s.me[key] = action.payload[key];
        }
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

function parseJson<T = unknown>(jsonString: string, defaultVal?: T): T {
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

const getInitialState = () => {
  const state = parseJson<State>(localStorage.getItem(STATE_KEY), {
    me: {},
    channels: { items: [], nextToken: "" }
  });
  if (Boolean(state.me.id) === false) {
    state.me = { ...state.me, id: nanoid() };
  }
  return state;
};

const withCache = (reducer: React.Reducer<State, Action>) => {
  return (state, action) => {
    const newState = reducer(state, action);
    localStorage.setItem(STATE_KEY, JSON.stringify(newState));
    return newState;
  };
};

const App = () => {
  const initialState = getInitialState();
  const [state, dispatch] = React.useReducer(withCache(reducer), initialState);
  const [channelsNextToken, setChannelsNextToken] = React.useState("");
  const [shouldFetchChannels, setShouldFetchChannels] = React.useState<
    false | number
  >(0);

  React.useEffect(() => {
    if (shouldFetchChannels === false) return;
    let isMounted = true;
    getChannels()
      .then(channels => {
        if (!isMounted) return;
        dispatch({ type: "set-channels", payload: channels });
      })
      .catch(err => {
        console.warn("Error fetching channels ", err);
      });
    return () => {
      isMounted = false;
    };
  }, [shouldFetchChannels]);

  React.useEffect(() => {
    createUserIfNotExists(initialState.me);
  }, []);

  return (
    <Router>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: colors.primaryLight
        }}
      >
        <Header />
        <Route
          exact
          path="/"
          render={() => (
            <ChannelsRoute channels={state.channels} dispatch={dispatch} />
          )}
        />
        <Route
          exact
          path="/me"
          render={() => (
            <MyProfile
              me={state.me}
              onSubmit={me => {
                dispatch({ type: "set-my-info", payload: me });
              }}
            />
          )}
        />
        <Route
          exact
          path="/channels"
          render={() => (
            <ChannelsRoute channels={state.channels} dispatch={dispatch} />
          )}
        />
        <Route
          exact
          path="/channel/:id"
          render={({ match }) => {
            const channelId = match.params.id;
            return (
              <ChannelRoute
                dispatch={dispatch}
                me={state.me}
                channels={state.channels}
                channelId={channelId}
              />
            );
          }}
        />
      </View>
    </Router>
  );
};

render(<App />, document.getElementById("root"));
