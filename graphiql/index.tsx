import * as React from "react";
import * as ReactDOM from "react-dom";
import GraphiQL from "graphiql";
import API from "@aws-amplify/api";
import "graphiql/graphiql.css";

import config from "../src/aws-exports";
API.configure(config);

ReactDOM.render(
  <GraphiQL fetcher={graphQLParams => API.graphql(graphQLParams)} />,
  document.getElementById("root")
);
