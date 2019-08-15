import { render, within, fireEvent, wait } from "@testing-library/react";
import * as React from "react";
import { RouterContext } from "next-server/dist/lib/router-context";

import { ChannelsRoute } from "../src/components/Channels";
import * as Channel from "../src/models/Channel";
import { act } from "react-dom/test-utils";
import { models, ModelsContext } from "../src/models/ModelsContext";

jest.mock("../src/models/ModelsContext");
jest.mock("../src/models/User");
jest.mock("../src/models/Channel");
jest.mock("../src/models/Channels");

type TestingLibraryUtils = ReturnType<typeof render>;
type U = TestingLibraryUtils;
const header = {
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

// const channels = {
//   links: () => cy.get("main a"), //.within(() => cy.get("a")),
//   input: () => cy.getByLabelText("Create a new channel").should("be.visible"),
//   button: () => cy.getByLabelText("Create channel").should("be.visible"),
//   list: () => cy.get('[aria-label="Channel List"]', { timeout: 7000 }) //getByLabelText("Channel List") //.should("be.visible")
// };

// const messages = {
//   messageList: () => cy.get('[aria-label="Message"]', { timeout: 7000 }),
//   input: () => cy.getByLabelText("Create a new message").should("be.visible"),
//   button: () => cy.getByLabelText("Send message").should("be.visible"),
//   list: () => cy.getByLabelText("Message List").should("be.visible")
// };

const ChannelsTestRoute = ({ pathname = "/", push = jest.fn() }) => (
  <RouterContext.Provider
    //@ts-ignore
    value={{
      pathname,
      push
    }}
  >
    <ChannelsRoute />
  </RouterContext.Provider>
);

describe("Channels", () => {
  it("exports", () => {
    expect(ChannelsRoute).toBeDefined();
  });
  it("Channels model is mocked", () => {});
  it("Channel model is mocked", () => {
    expect(Channel).toMatchInlineSnapshot(`
                        Object {
                          "createMessage": [Function],
                          "getChannelMessages": [Function],
                          "isMock": true,
                          "onCreateMessage": [Function],
                        }
                `);
  });
  it("renders (smoke test)", async () => {
    const pathname = "/",
      push = jest.fn();
    let resolveGetChannels;
    const getChannels = jest.fn().mockImplementation(() => {
      return new Promise(resolve => {
        resolveGetChannels = () => {
          resolve({ items: [], nextToken: "" });
        };
      });
    });
    render(
      <ModelsContext.Provider
        value={{
          ...models,
          Channels: {
            ...models.Channels,
            //@ts-ignore
            getChannels
          }
        }}
      >
        <ChannelsTestRoute {...{ pathname, push }} />
      </ModelsContext.Provider>
    );
    expect(getChannels).toBeCalled();
    await act(async () => {
      resolveGetChannels();
    });
  });
  it("render header", () => {
    const historyPush = jest.fn();
    // const testUtils = render(<ChannelsTestRoute push={historyPush} />);
    // expect(header.root(testUtils)).toBeDefined();
    // expect(header.channels(testUtils)).toBeDefined();
    // expect(header.me(testUtils)).toBeDefined();
    // expect(header.me(testUtils)).toMatchInlineSnapshot(`
    //         <a
    //           aria-label="Go to Profile"
    //           class="css-reset-4rbku5 css-cursor-18t94o4 css-view-1dbjc4n r-alignItems-1awozwy r-cursor-1loqt21 r-justifyContent-1777fci r-touchAction-1otgn73 r-transitionDuration-eafdt9 r-transitionProperty-1i6wzkk r-userSelect-lrvibr"
    //           data-focusable="true"
    //           href="/me"
    //           role="link"
    //           style="width: 50%;"
    //         >
    //           <div
    //             class="css-text-901oao"
    //             dir="auto"
    //             style="color: rgb(255, 255, 255); font-size: 20px; font-weight: 800;"
    //           >
    //             My Profile
    //           </div>
    //         </a>
    //     `);
    // fireEvent.click(header.me(testUtils).parentElement.parentElement);
    // expect(historyPush).toHaveBeenCalledWith("/me");
  });
});

// export default "";
