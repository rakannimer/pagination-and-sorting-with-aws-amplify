import API, { graphqlOperation } from "@aws-amplify/api";
import memoize from "lodash.memoize";

import { getUser as getUserQuery } from "../../graphql/queries";
import { updateUser, createUser } from "../../graphql/mutations";
import { getUsername as getUsernameQuery } from "./custom-queries";
import { GetUserQuery, CreateUserInput } from "../../API";
import config from "../../aws-exports.js";

API.configure(config);

export const upsertUser = jest.fn();

export const createUserIfNotExists = jest
  .fn()
  .mockImplementation(async (userInput: CreateUserInput) => {});

export const getUser = jest.fn().mockImplementation(async (userId: string) => {
  return null;
});

export const getUsername = jest.fn();
