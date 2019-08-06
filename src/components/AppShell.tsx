import { View } from "react-native-web";
import * as React from "react";

import { Header } from "./Header";
import { colors } from "../theme";
import { State, Dispatcher } from "../types";
import { createUserIfNotExists, getUser } from "../models/User";
import { DispatcherContext } from "../state";

const AppShell: React.FC<{ state: State; dispatch: Dispatcher }> = ({
  state,
  dispatch,
  children
}) => {
  React.useEffect(() => {
    createUserIfNotExists(state.me);
  }, []);
  React.useEffect(() => {
    let isMounted = true;
    getUser(state.me.id).then(getUserResponse => {
      if (isMounted === false) return;
      let meFromServer = getUserResponse.data.getUser;
      if (meFromServer === null) return;
      dispatch({ type: "set-my-info", payload: meFromServer });
    });
    return () => {
      isMounted = false;
    };
  }, [state.me.id]);
  return (
    <DispatcherContext.Provider value={dispatch}>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: colors.primaryLight
        }}
      >
        <Header />
        {children}
      </View>
    </DispatcherContext.Provider>
  );
};

export default AppShell;
