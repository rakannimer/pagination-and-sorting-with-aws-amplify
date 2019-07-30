import produce from "immer";
import nanoid from "nanoid";
import * as React from "react";
import { render } from "react-dom";
import { View } from "react-native-web";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { colors } from "./theme";
import { InputZone } from "./components/InputZone";
import { Header } from "./components/Header";
import { MyProfile } from "./components/MyProfile";

import { Channels } from "./components/Channels";
import { Channel } from "./components/Channel";
import { State, Action } from "./types";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "append-channel": {
      return produce(state, s => {
        s.channels.push(action.payload);
      });
    }
    case "prepend-channels": {
      return produce(state, s => {
        // Insert at position 0 without deleting the elements of payload
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
    default: {
      console.error(`Received unrecognized action `, action);
    }
  }
};
const getInitialState = () => {
  return {
    me: {
      id: "",
      url: "",
      bio: "",
      name: ""
    },
    channels: []
  };
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, getInitialState());
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

        <Route exact path="/me" render={() => <MyProfile />} />
        <Route
          exact
          path="/channels"
          render={() => (
            <>
              <Channels channels={state.channels} />
              <InputZone
                placeholder={"Create a new channel"}
                onSubmit={content => {
                  dispatch({
                    type: "append-channel",
                    payload: {
                      id: nanoid(),
                      name: content,
                      createdAt: `${Date.now()}`,
                      updatedAt: `${Date.now()}`,
                      messages: []
                    }
                  });
                }}
                buttonText={"Create channel"}
              />
            </>
          )}
        />
        <Route
          exact
          path="/channel/:id"
          render={() => (
            <>
              <Channel />
              <InputZone
                placeholder={"Create a new message"}
                onSubmit={content => {
                  console.warn("Submitted ", content);
                }}
                buttonText={"Send message"}
              />
            </>
          )}
        />
      </View>
    </Router>
  );
};

render(<App />, document.getElementById("root"));
