import API, { graphqlOperation } from "@aws-amplify/api";
import memoize from "lodash.memoize";

import { getUser as getUserQuery } from "../../graphql/queries";
import { updateUser, createUser } from "../../graphql/mutations";
import { getUsername as getUsernameQuery } from "./custom-queries";
import { GetUserQuery, CreateUserInput } from "../../API";
import config from "../../aws-exports.js";

API.configure(config);

export const upsertUser = async (userInput: CreateUserInput) => {
  await createUserIfNotExists(userInput);
  try {
    // Remove fields with empty strings
    const userInputWithoutEmptyFields = {
      id: userInput.id,
      bio: userInput.bio === "" ? undefined : userInput.bio,
      url: userInput.url === "" ? undefined : userInput.url,
      name: userInput.name === "" ? undefined : userInput.name
    };
    await API.graphql(
      graphqlOperation(updateUser, { input: userInputWithoutEmptyFields })
    );
  } catch (err) {
    console.warn("Failed to update user ", err);
  }
};

export const createUserIfNotExists = async (userInput: CreateUserInput) => {};

export const getUser = async (userId: string) => {
  return null;
};

export const getUsername = memoize(
  async (userId: string) => {
    return { username: "TEST_USERNAME" };
  },
  (userId: string) => {
    return userId;
  }
);
