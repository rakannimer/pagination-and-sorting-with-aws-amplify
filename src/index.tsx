import * as React from "react";
import { render } from "react-dom";
import { ChannelsRoute } from "./components/Channels";

const App = () => {
  return <ChannelsRoute />;
};

render(<App />, document.getElementById("#root"));

export default App;
