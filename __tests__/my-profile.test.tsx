import * as React from "react";
import { RouterContext } from "next-server/dist/lib/router-context";
import { render } from "@testing-library/react";

import { MyProfileRoute } from "../src/components/MyProfile";

const MyProfileTestRoute = ({ pathname = "/", push = jest.fn() }) => (
  <RouterContext.Provider
    //@ts-ignore
    value={{
      pathname,
      push
    }}
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
});
