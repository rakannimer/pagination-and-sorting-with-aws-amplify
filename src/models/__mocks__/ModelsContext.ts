import * as React from "react";
import * as Channel from "./Channel";
import * as Channels from "./Channels";
import * as User from "./User";

export const models = {
  Channel,
  Channels,
  User
};

export const ModelsContext = React.createContext(models);

export const useModels = () => {
  return React.useContext(ModelsContext);
};
