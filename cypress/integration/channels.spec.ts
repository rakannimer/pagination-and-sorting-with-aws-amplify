/// <reference types="Cypress" />
import nanoid from "nanoid";
import * as Channels from "../../src/models/Channels";
import * as Channel from "../../src/models/Channel";
const PORT = Cypress.env("PORT") || 3000;
const BASE_URL: string = `http://localhost:${PORT}/`;

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
// const a:number = 2
const createChannel = async (
  channelName = createChannelName(),
  creatorId = nanoid()
) => {
  const channelId = nanoid();
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
  it("Can scroll and load more in channels list", async () => {
    // Make sure there is at least enough channels for 2 pages.
    let createChannelsPromises: Promise<unknown>[] = [];
    for (let i = 0; i < 15; i++) {
      createChannelsPromises.push(createChannel());
    }
    await Promise.all(createChannelsPromises);
    cy.clearLocalStorage();
    cy.reload();
    channels.links().should("have.length", 5);
    channels.list().scrollTo("bottom");
    channels.links().should("have.length", 10);
    channels.list().scrollTo("bottom");
    channels.links().should("have.length", 15);
  });
  it("Can scroll and load more in messages list", () => {
    const channelName = createChannelName();
    const main = async () => {
      const channelId = await createChannel(channelName);
      channels
        .list()
        .within(() => cy.getByText(channelName))
        .click();
      cy.location("href").should("contain", "/channel?id=" + channelId);
      let createMesagePromises: Promise<unknown>[] = [];
      for (let i = 0; i < 15; i++) {
        createMesagePromises.push(createMessage(undefined, channelId));
      }
      await Promise.all(createMesagePromises);
      cy.clearLocalStorage();

      cy.reload();

      messages.messageList().should("have.length", 10);
      messages.list().scrollTo("bottom");
      messages.messageList().should("have.length", 15);
    };
    main();
  });
});
