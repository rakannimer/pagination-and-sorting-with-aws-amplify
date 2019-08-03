import * as React from "react";
import { render } from "react-dom";
import { View } from "react-native-web";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { ChannelRoute } from "./components/Channel";
import { ChannelsRoute } from "./components/Channels";
import { Header } from "./components/Header";
import { MyProfile } from "./components/MyProfile";
import { createUserIfNotExists } from "./models/User";
import {
  getInitialState,
  reducer,
  withCache,
  DispatcherContext
} from "./state";
import { colors } from "./theme";

const App = () => {
  const initialState = getInitialState();
  const [state, dispatch] = React.useReducer(withCache(reducer), initialState);

  React.useEffect(() => {
    createUserIfNotExists(initialState.me);
  }, []);

  return (
    <DispatcherContext.Provider value={dispatch}>
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
              <ChannelsRoute channels={state.channels}  />
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
              <ChannelsRoute channels={state.channels} />
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
    </DispatcherContext>
  );
};

render(<App />, document.getElementById("root"));
