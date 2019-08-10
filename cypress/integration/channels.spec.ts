/// <reference types="Cypress" />

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
    createNewChannel.input().type("Test Channel");
  });
});

// export default "";
