/// <reference types="Cypress" />
const nanoid = require("nanoid");

const PORT = Cypress.env("PORT") || 3000;
const BASE_URL = `http://localhost:${PORT}/`;

const header = {
  root: () => cy.getByLabelText("Header Navigation").should("be.visible"),
  me: () =>
    header
      .root()
      .within(() => cy.getByText("My Profile"))
      .should("be.visible"),
  channels: () =>
    header
      .root()
      .within(() => cy.getByText("Channels"))
      .should("be.visible")
};
const profile = {
  form: () => cy.getByLabelText("Profile Form").should("be.visible"),
  submit: () =>
    cy.getByLabelText("Profile Form Submit Button").should("be.visible"),
  username: () =>
    cy.get('[aria-label="Username"]', { timeout: 5000 }).should("be.visible"),
  bio: () =>
    cy.get('[aria-label="Bio"]', { timeout: 5000 }).should("be.visible"),
  url: () =>
    cy.get('[aria-label="Url"]', { timeout: 5000 }).should("be.visible")
};

const channels = {
  links: () => cy.get("main a"), //.within(() => cy.get("a")),
  input: () => cy.getByLabelText("Create a new channel").should("be.visible"),
  button: () => cy.getByLabelText("Create channel").should("be.visible"),
  list: () => cy.get('[aria-label="Channel List"]') //getByLabelText("Channel List") //.should("be.visible")
};

const messages = {
  messageList: () => cy.get('[aria-label="Message"]', { timeout: 7000 }),
  input: () => cy.getByLabelText("Create a new message").should("be.visible"),
  button: () => cy.getByLabelText("Send message").should("be.visible"),
  list: () => cy.getByLabelText("Message List").should("be.visible")
};

const user = {
  name: "Test username",
  url: "https://test-url.test",
  bio: "Bio Test @ Test BIO"
};

const createChannelName = () => "Test Channel " + nanoid();
const createNewMessage = () => "Test Message " + nanoid();

const createChannel = (channelName = createChannelName()) => {
  channels.input().type(channelName);
  channels.button().click();
};

const createMessage = (message = createNewMessage()) => {
  messages.input().type(message);
  messages.button().click();
};

const newMessage = createNewMessage();
const newChannelName = createChannelName();

describe("Channels", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  it("Can visit profile and set information", () => {
    header.me().click();
    cy.location("href").should("contain", "/me");
    profile.username().type(`${user.name}{enter}`);
    cy.title().should("contain", `${user.name}'s Profile`);
    profile.bio().type(`${user.bio}{enter}`);
    profile.url().type(`${user.url}`);
    profile.submit().click();

    // Make sure data is persisted between sessions
    cy.reload();
    profile.username().should("contain.value", user.name);
    profile.bio().should("contain.value", user.bio);
    profile.url().should("contain.value", user.url);
  });

  it("Can add a new channel and send a message in it", () => {
    channels.input().type(newChannelName);
    channels.button().click();
    channels.input().should("be.empty");
    channels
      .list()
      .within(() => cy.getByText(newChannelName))
      .should("be.visible")
      .click();

    cy.title().should("include", newChannelName);

    messages.input().should("be.visible");
    messages.button().should("be.visible");
    messages.input().type(newMessage);
    messages.button().click();
    messages.input().should("be.empty");

    messages
      .list()
      .within(() => cy.getByText(newMessage))
      .should("be.visible");

    cy.reload();

    messages
      .list()
      .within(() => cy.getByText(newMessage))
      .should("be.visible");
  });
  it("Can scroll and load more in channels list", () => {
    // Make sure there is at least enough channels for 2 pages.
    for (let i = 0; i < 1; i++) {
      createChannel();
    }
    cy.clearLocalStorage();
    cy.reload();
    channels.links().should("have.length", 5);
    channels.list().scrollTo("bottom");
    channels.links().should("have.length", 10);
    channels.list().scrollTo("bottom");
    channels.links().should("have.length", 15);
  });
  // });
  it("Can scroll and load more in messages list", () => {
    const channelName = createChannelName();
    createChannel(channelName);
    channels
      .list()
      .within(() => cy.getByText(channelName))
      .click();
    cy.location("href").should("contain", "/channel?id=");
    for (let i = 0; i < 15; i++) {
      messages.input().type(`${createMessage()}{enter}`, { delay: 0 });
    }
    cy.clearLocalStorage();

    cy.reload();

    cy.visit(BASE_URL + "channel?id=h1V9Hfp71rXCvB67rIKke");
    messages.messageList().should("have.length", 10);
    messages.list().scrollTo("bottom");
    messages.messageList().should("have.length", 15);
  });
});
