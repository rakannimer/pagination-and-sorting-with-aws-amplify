/// <reference types="Cypress" />
const nanoid = require("nanoid");

describe("Channels", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("Can add a new channel and send a message in it", () => {
    expect(true).to.equal(true);
    const createNewChannel = {
      input: () => cy.getByLabelText("Create a new channel"),
      button: () => cy.getByLabelText("Create channel")
    };
    createNewChannel.input().should("be.visible");
    createNewChannel.button().should("be.visible");
    // cy.getByLabelText("Create a new channel").type("Test Channel");
    const newChannelName = "Test Channel " + nanoid();
    createNewChannel.input().type(newChannelName);
    createNewChannel.button().click();
    createNewChannel.input().should("be.empty");
    cy.getByLabelText("Channel List")
      .should("be.visible")
      .getByText(newChannelName)
      .should("be.visible")
      .click();

    cy.title().should("include", newChannelName);
    const newMessage = "Test Message " + nanoid();
    const createNewMessage = {
      input: () => cy.getByLabelText("Create a new message"),
      button: () => cy.getByLabelText("Send message")
    };

    createNewMessage.input().should("be.visible");
    createNewMessage.button().should("be.visible");
    createNewMessage.input().type(newMessage);
    createNewMessage.button().click();
    createNewMessage.input().should("be.empty");
    cy.getByLabelText("Message List")
      .should("be.visible")
      .getByText(newMessage)
      .should("be.visible");

    cy.reload()
      .getByLabelText("Message List")
      .should("be.visible")
      .getByText(newMessage)
      .should("be.visible");
  });
});

// export default "";
