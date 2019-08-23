import { View } from "react-native-web";
import * as React from "react";

import { Header } from "./Header";
import { colors } from "../theme";
import { State, Dispatcher } from "../types";
import { DispatcherContext } from "../state";
import { useModels } from "../models/ModelsContext";

const AppShell: React.FC<{ state: State; dispatch: Dispatcher }> = ({
  state,
  dispatch,
  children
}) => {
  const models = useModels();
  React.useEffect(() => {
    models.User.createUserIfNotExists(state.me);
  }, []);
  React.useEffect(() => {
    let isMounted = true;
    models.User.getUser(state.me.id).then(getUserResponse => {
      if (getUserResponse === null || isMounted === false) return;
      const meFromServer = getUserResponse.data.getUser;
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
