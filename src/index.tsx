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
    case "append-channel": {
      return produce(state, s => {
        s.channels.push(action.payload);
      });
    }
    case "prepend-channels": {
      return produce(state, s => {
        // Insert at position 0, without deleting, the elements of payload
        s.channels.splice(0, 0, ...action.payload);
      });
    }
    case "set-channels": {
      return produce(state, s => {
        s.channels = action.payload;
      });
    }
    case "append-message": {
      const channelIndex = state.channels.findIndex(
        channel => channel.id === action.payload.messageChannelId
      );
      if (channelIndex === -1) return state;
      return produce(state, s => {
        s.channels[channelIndex].messages.push(action.payload);
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
    return result;
  } catch (err) {
    console.warn("Could not parse jsonString ", jsonString);
    return defaultVal;
  }
}

const getInitialState = () => {
  const me = parseJson<State["me"]>(localStorage.getItem("me"));
  const channels = parseJson(localStorage.getItem("channels"), []);

  const hasId = Boolean(me["id"]);
  if (!hasId) {
    localStorage.setItem("me", JSON.stringify({ id: nanoid() }));
  }
  return {
    me,
    channels
  };
};

const withCache = (reducer: React.Reducer<State, Action>) => {
  return (state, action) => {
    const newState = reducer(state, action);
    const stateKeys = Object.keys(state);
    for (let stateKey of stateKeys) {
      if (state[stateKey] !== newState[stateKey]) {
        localStorage.setItem(stateKey, JSON.stringify(newState[stateKey]));
      }
    }
    return newState;
  };
};

const App = () => {
  const initialState = getInitialState();
  const [state, dispatch] = React.useReducer(withCache(reducer), initialState);
  React.useEffect(() => {
    let isMounted = true;
    createUserIfNotExists(initialState.me);
    getChannels()
      .then(channels => {
        if (!isMounted) return;
        dispatch({ type: "set-channels", payload: channels });
        console.warn({ channels });
      })
      .catch(err => {
        console.warn("Error fetching channels ", err);
      });
    return () => {
      isMounted = false;
    };
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
