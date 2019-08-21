/// <reference types="Cypress" />
import nanoid from "nanoid";
import * as Channels from "../../src/models/Channels";
import * as Channel from "../../src/models/Channel";
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
  links: () => cy.get("main a"),
  input: () => cy.getByLabelText("Create a new channel").should("be.visible"),
  button: () => cy.getByLabelText("Create channel").should("be.visible"),
  list: () => cy.get('[aria-label="Channel List"]', { timeout: 7000 }) //getByLabelText("Channel List") //.should("be.visible")
};

const messages = {
  messageList: () => cy.get('[data-testid="Message"]', { timeout: 7000 }), //  cy.get('[aria-label="Message"]', { timeout: 7000 }), //
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
// const a:number = 2
const createChannel = async (
  channelName = createChannelName(),
  channelId = nanoid(),
  creatorId = nanoid()
) => {
  await Channels.createChannel({
    name: channelName,
    id: channelId,
    createdAt: `${Date.now()}`,
    updatedAt: `${Date.now()}`,
    creatorId,
    messages: {
      items: [],
      nextToken: ""
    }
  });
  return channelId;
};

const createMessage = async (
  message = createNewMessage(),
  channelId: string
) => {
  await Channel.createMessage({
    messageChannelId: channelId,
    id: nanoid(),
    createdAt: `${Date.now()}`,
    senderId: nanoid(),
    text: message
  });
};

const newMessage = createNewMessage();
const newChannelName = createChannelName();

describe("My Profile", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });
  afterEach(() => {
    // For video to better capture what happened
    cy.wait(1000);
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
});

describe("Channel", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });
  afterEach(() => {
    // For video to better capture what happened
    cy.wait(1000);
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
  it("Can scroll and load more in messages list", () => {
    const channelName = createChannelName();

    const channelId = nanoid();
    createChannel(channelName, channelId);
    channels
      .list()
      .within(() => cy.getByText(channelName))
      .click();
    cy.location("href").should("contain", "/channel?id=" + channelId);
    for (let i = 0; i < 15; i++) {
      createMessage(undefined, channelId);
    }

    cy.clearLocalStorage();
    cy.reload();

    messages.messageList().should("have.length", 10);
    messages.list().scrollTo("bottom");
    messages.messageList().should("have.length", 15);
  });
});

describe("Channels", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });
  afterEach(() => {
    // For video to better capture what happened
    cy.wait(1000);
  });

  it("Can scroll and load more in channels list", () => {
    // Make sure there is enough channels for at least 2 pages.
    for (let i = 0; i < 15; i++) {
      createChannel();
    }
    // Promise.all(createChannelsPromises);
    cy.clearLocalStorage();
    cy.reload();
    channels.links().should("have.length", 5);
    channels.list().scrollTo("bottom");
    channels.links().should("have.length", 10);
    channels.list().scrollTo("bottom");
    channels.links().should("have.length", 15);
  });
});
