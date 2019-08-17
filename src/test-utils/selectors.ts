import { render, within } from "@testing-library/react";

export type TestingLibraryUtils = ReturnType<typeof render>;
export type U = TestingLibraryUtils;
export const header = {
  root: (utils: U) => utils.getByLabelText("Header Navigation") as HTMLElement,
  me: (utils: U) => within(header.root(utils)).getByLabelText("Go to Profile"),
  channels: (utils: U) =>
    within(header.root(utils)).getByLabelText("Go to Channels")
};

export const profile = {
  form: (utils: U) => utils.getByLabelText("Profile Form"),
  submit: (utils: U) => utils.getByLabelText("Submit changes"),
  username: (utils: U) => utils.getByLabelText("Username"),
  bio: (utils: U) => utils.getByLabelText("Bio"),
  url: (utils: U) => utils.getByLabelText("Url")
};

export const channels = {
  links: (utils: U) => utils.getAllByLabelText("Channel Card"), //.within(() => cy.get("a")),
  input: (utils: U) => utils.getByLabelText("Create a new channel"),
  button: (utils: U) => utils.getByLabelText("Create channel")
  // list: () => cy.get('[aria-label="Channel List"]', { timeout: 7000 }) //getByLabelText("Channel List") //.should("be.visible")
};

export const messages = {
  messageList: (utils: U) => utils.getAllByLabelText("Message"),
  input: (utils: U) => utils.getByLabelText("Create a new message"),
  button: (utils: U) => utils.getByLabelText("Send message"),
  list: (utils: U) => utils.getByLabelText("Message List")
};
