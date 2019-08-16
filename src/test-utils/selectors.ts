import { render, within } from "@testing-library/react";

export type TestingLibraryUtils = ReturnType<typeof render>;
export type U = TestingLibraryUtils;
export const header = {
  root: (utils: U) => utils.getByLabelText("Header Navigation") as HTMLElement,
  me: (utils: U) => within(header.root(utils)).getByLabelText("Go to Profile"),
  channels: (utils: U) =>
    within(header.root(utils)).getByLabelText("Go to Channels")
};

// const profile = {
//   form: () => cy.getByLabelText("Profile Form").should("be.visible"),
//   submit: () =>
//     cy.getByLabelText("Profile Form Submit Button").should("be.visible"),
//   username: () =>
//     cy.get('[aria-label="Username"]', { timeout: 5000 }).should("be.visible"),
//   bio: () =>
//     cy.get('[aria-label="Bio"]', { timeout: 5000 }).should("be.visible"),
//   url: () =>
//     cy.get('[aria-label="Url"]', { timeout: 5000 }).should("be.visible")
// };

export const channels = {
  links: (utils: U) => utils.getAllByLabelText("Channel Card") //.within(() => cy.get("a")),
  // input: () => cy.getByLabelText("Create a new channel").should("be.visible"),
  // button: () => cy.getByLabelText("Create channel").should("be.visible"),
  // list: () => cy.get('[aria-label="Channel List"]', { timeout: 7000 }) //getByLabelText("Channel List") //.should("be.visible")
};

// const messages = {
//   messageList: () => cy.get('[aria-label="Message"]', { timeout: 7000 }),
//   input: () => cy.getByLabelText("Create a new message").should("be.visible"),
//   button: () => cy.getByLabelText("Send message").should("be.visible"),
//   list: () => cy.getByLabelText("Message List").should("be.visible")
// };
