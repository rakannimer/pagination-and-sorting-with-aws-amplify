import * as React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { RouterContext } from "next-server/dist/lib/router-context";

import "@testing-library/jest-dom/extend-expect";

import { NextRouter } from "next/router";
import { ChannelsRoute } from "../src/components/Channels";

describe("Channels route", () => {
  test("exports", () => {
    expect(ChannelsRoute).toBeDefined();
  });
  test("renders", () => {
    const router = ({
      pathname: "/",
      route: "/",
      query: {},
      asPath: "/",
      push: jest.fn()
    } as unknown) as NextRouter;
    const { container, getByLabelText } = render(
      <RouterContext.Provider value={router}>
        <ChannelsRoute />
      </RouterContext.Provider>
    );
    // Temp
    expect(container).toMatchSnapshot();
    const createNewChannelInput = getByLabelText("Create a new channel");
    const createNewChannelSubmitButton = getByLabelText("Create channel");
    expect(createNewChannelInput).toBeVisible();
    expect(createNewChannelSubmitButton).toBeVisible();
    fireEvent.change(createNewChannelInput, {
      target: {
        value: "Test Channel"
      }
    });
    fireEvent.click(createNewChannelSubmitButton);
  });
});
export default "";
