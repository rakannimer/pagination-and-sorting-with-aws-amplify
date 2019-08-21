import * as React from "react";
import { RouterContext } from "next-server/dist/lib/router-context";
import { NextRouter } from "next/router";
import { render, fireEvent } from "@testing-library/react";

import { profile } from "../src/test-utils/selectors";
import { MyProfileRoute } from "../src/components/MyProfile";
import { models } from "../src/models/__mocks__/ModelsContext";

const MyProfileTestRoute = ({ pathname = "/", push = jest.fn() }) => (
  <RouterContext.Provider
    value={
      ({
        pathname,
        push
      } as unknown) as NextRouter
    }
  >
    <MyProfileRoute />
  </RouterContext.Provider>
);

describe("my-profile", () => {
  it("exports", () => {
    expect(MyProfileRoute).toBeDefined();
  });

  it("renders (smoke test)", () => {
    render(<MyProfileTestRoute />);
  });

  it("renders form and submit button", async () => {
    const testUtils = render(<MyProfileTestRoute />);
    expect(models.User.getUser).toBeCalled();
    expect(models.User.createUserIfNotExists).toBeCalled();
    const newUsername = "Test Username";
    const newUrl = "Test Url";
    const newBio = "Test Bio";
    const username = profile.username(testUtils);
    const url = profile.url(testUtils);
    const bio = profile.bio(testUtils);
    const submitButton = profile.submit(testUtils);

    fireEvent.change(username, { target: { value: newUsername } });
    fireEvent.change(url, { target: { value: newUrl } });
    fireEvent.change(bio, { target: { value: newBio } });

    expect(username.value).toEqual(newUsername);
    expect(url.value).toEqual(newUrl);
    expect(bio.value).toEqual(newBio);

    fireEvent.click(submitButton);

    expect(models.User.upsertUser).toBeCalled();
    const [calledWith] = models.User.upsertUser.mock.calls[0];
    expect(calledWith.bio).toEqual(newBio);
    expect(calledWith.url).toEqual(newUrl);
    expect(calledWith.name).toEqual(newUsername);
    expect(calledWith.id).toBeDefined();
  });
});
