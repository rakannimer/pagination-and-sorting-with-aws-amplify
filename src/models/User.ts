import { API, graphqlOperation } from "aws-amplify";

import { getUser } from "../graphql/queries";
import { updateUser, createUser } from "../graphql/mutations";
import { GetUserQuery, CreateUserInput } from "../API";
import config from "../aws-exports.js";

API.configure(config);

export const upsertUser = async (userInput: CreateUserInput) => {
  await createUserIfNotExists(userInput);
  try {
    await API.graphql(graphqlOperation(updateUser, { input: userInput }));
  } catch (err) {
    console.warn("Failed to update user ", err);
  }
};

export const createUserIfNotExists = async (userInput: CreateUserInput) => {
  const userId = userInput.id;
  const userQueryResult = await (API.graphql(
    graphqlOperation(getUser, { id: userId })
  ) as Promise<{ data: GetUserQuery }>);
  if (userQueryResult.data.getUser === null) {
    try {
      await API.graphql(graphqlOperation(createUser, { input: userInput }));
    } catch (err) {
      console.warn("Failed to create user ", err);
    }
    return;
  }
};
