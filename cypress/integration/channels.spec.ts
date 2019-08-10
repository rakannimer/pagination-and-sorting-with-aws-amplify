/// <reference types="Cypress" />
let i = 0;
let id = () => i++;
const nanoid = require("nanoid");

describe("Channels", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("Can add a new channel", () => {
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
      .should("be.visible");
    // cy.getByText(newChannelName).should("be.visible");
  });
});

// export default "";
