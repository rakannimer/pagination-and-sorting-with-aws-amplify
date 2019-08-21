import { render, fireEvent, within } from "@testing-library/react";
import * as React from "react";
import { RouterContext } from "next-server/dist/lib/router-context";
import { Observable } from "rxjs";
import nanoid from "nanoid";
import { act } from "react-dom/test-utils";

import { ChannelRoute } from "../src/components/Channel";
import { models } from "../src/models/__mocks__/ModelsContext";
import { messages } from "../src/test-utils/selectors";
import {
  createOnCreateMessageEmission,
  createGetChannelMessagesEmission,
  getUsernameEmission
} from "../src/test-utils/data-bank";

const channelName1 = "test-channel-" + nanoid();

const ChannelTestRoute = ({
  pathname = "/channel",
  push = jest.fn(),
  query = {
    id: channelName1
  }
}) => (
  <RouterContext.Provider
    //@ts-ignore
    value={{
      pathname,
      push,
      query
    }}
  >
    <ChannelRoute />
  </RouterContext.Provider>
);

describe("channel", () => {
  let resolveGetChannelMessages;
  let fireOnCreateMessage;
  let resolveUsername;

  models.Channel.getChannelMessages.mockImplementation(() => {
    return new Promise(resolve => {
      resolveGetChannelMessages = () => {
        resolve(createGetChannelMessagesEmission(channelName1));
      };
    });
  });

  models.User.getUsername.mockImplementation(() => {
    return new Promise(resolve => {
      resolveUsername = () => {
        resolve(getUsernameEmission());
      };
    });
  });

  models.Channel.onCreateMessage.mockImplementation(() => {
    return new Observable(subscriber => {
      fireOnCreateMessage = () => {
        subscriber.next(createOnCreateMessageEmission(channelName1));
      };
    });
  });

  beforeEach(() => {
    localStorage.clear();
    models.Channel.getChannelMessages.mockClear();
    models.Channel.onCreateMessage.mockClear();
  });

  it("exports", () => {
    expect(ChannelRoute).toBeDefined();
  });

  it("renders (smoke test)", () => {
    const push = jest.fn();
    render(<ChannelTestRoute push={push} />);
    expect(models.Channel.getChannelMessages).toBeCalledWith(channelName1, "");
    expect(models.Channel.onCreateMessage).toBeCalledWith(channelName1);
  });

  it("renders new message when onCreateMessage fires", async () => {
    const push = jest.fn();
    const testUtils = render(<ChannelTestRoute push={push} />);
    await act(async () => {
      resolveGetChannelMessages();
    });
    await act(async () => {
      resolveUsername();
    });
    let renderedMessages = messages.messageList(testUtils);
    expect(renderedMessages.length).toEqual(1);
    act(() => {
      fireOnCreateMessage();
    });
    renderedMessages = messages.messageList(testUtils);
    expect(renderedMessages.length).toEqual(2);
  });

  it("can add a message to channel", () => {
    const newMessage = "Test message";
    const push = jest.fn();
    const testUtils = render(<ChannelTestRoute push={push} />);
    expect(models.Channel.onCreateMessage).toBeCalled();
    const input = messages.input(testUtils);
    const submit = messages.button(testUtils);
    fireEvent.change(input, { target: { value: newMessage } });
    expect(input.value).toEqual(newMessage);
    act(() => {
      fireEvent.click(submit);
    });
    expect(input.value).toEqual("");
    const renderedMessages = messages.messageList(testUtils);
    expect(renderedMessages.length).toEqual(1);
  });
});
