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

const App = () => {
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
              <Channels />
              <InputZone
                placeholder={"Create a new channel"}
                onSubmit={content => {
                  console.warn("Submitted ", content);
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
