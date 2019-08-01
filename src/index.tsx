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
    }
  }
};
const getInitialState = () => {
  let id = localStorage.getItem("my-id");
  if (!id) {
    id = nanoid();
    localStorage.setItem("my-id", id);
  }
  const url = localStorage.getItem("url") || "";
  const bio = localStorage.getItem("bio") || "";
  const name = localStorage.getItem("name") || "";
  return {
    me: {
      id,
      url,
      bio,
      name
    },
    channels: []
  };
};

const App = () => {
  const initialState = getInitialState();
  const [state, dispatch] = React.useReducer(reducer, initialState);
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
