import { render, fireEvent, within } from "@testing-library/react";
import * as React from "react";
import { RouterContext } from "next-server/dist/lib/router-context";
import { Observable } from "rxjs";
import nanoid from "nanoid";
import { act } from "react-dom/test-utils";

import { ChannelsRoute } from "../src/components/Channels";
import { models } from "../src/models/__mocks__/ModelsContext";
import { header, channels } from "../src/test-utils/selectors";
import {
  createOnCreateChannelEmission,
  createOnCreateMessageEmission,
  createGetChannelsEmission,
  createOnUpdateChannelEmission
} from "../src/test-utils/data-bank";

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

describe("channels", () => {
  //Fixtures
  const channelName1 = "test-channel-" + nanoid();

  // Defining model mocks
  let resolveGetChannels;
  let fireOnCreateMessage;
  let fireOnCreateChannel;
  let fireOnUpdateChannel;

  models.Channels.getChannels.mockImplementation(() => {
    return new Promise(resolve => {
      resolveGetChannels = () => {
        resolve(createGetChannelsEmission(channelName1));
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
  models.Channels.onUpdateChannel.mockImplementation(() => {
    return new Observable(subscriber => {
      fireOnUpdateChannel = (channelName, updatedAt = Date.now()) => {
        subscriber.next(createOnUpdateChannelEmission(channelName, updatedAt));
      };
    });
  });
  models.Channels.onCreateChannel.mockImplementation(() => {
    return new Observable(subscriber => {
      fireOnCreateChannel = (channelName = nanoid()) => {
        subscriber.next(createOnCreateChannelEmission(channelName));
      };
    });
  });

  beforeEach(() => {
    localStorage.clear();
    models.Channels.onCreateChannel.mockClear();
    models.Channels.onUpdateChannel.mockClear();
    models.Channels.getChannels.mockClear();
    models.Channel.onCreateMessage.mockClear();
  });

  it("exports", () => {
    expect(ChannelsRoute).toBeDefined();
  });

  it("renders (smoke test)", () => {
    const push = jest.fn();
    render(<ChannelsTestRoute push={push} />);
  });

  it("renders header for navigation", async () => {
    const push = jest.fn();
    const testUtils = render(<ChannelsTestRoute push={push} />);

    await act(async () => {
      fireEvent.click(header.me(testUtils));
    });
    expect(push).toBeCalledWith("/me");

    await act(async () => {
      fireEvent.click(header.channels(testUtils));
    });
    expect(push).toBeCalledWith("/channels");
  });

  it("renders app shell and gets channels", async () => {
    const push = jest.fn();
    const testUtils = render(<ChannelsTestRoute push={push} />);

    expect(models.Channels.getChannels).toBeCalled();
    await act(async () => {
      resolveGetChannels();
    });
    testUtils.getByText(channelName1);
    expect(models.Channel.onCreateMessage).toBeCalled();
  });

  it("renders new message in conversation card when subscription fires", async () => {
    const push = jest.fn();
    const testUtils = render(<ChannelsTestRoute push={push} />);
    expect(models.Channels.getChannels).toBeCalled();
    await act(async () => {
      resolveGetChannels();
    });
    testUtils.getByText(channelName1);
    expect(models.Channel.onCreateMessage).toBeCalled();
    act(() => {
      fireOnCreateMessage();
    });
    // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    // await delay(1000);
    const lastMessage = testUtils.getByLabelText("Last message");
    expect(lastMessage).toBeTruthy();
  });

  it("renders new channel when onCreateChannel fires", async () => {
    const push = jest.fn();
    const testUtils = render(<ChannelsTestRoute push={push} />);
    expect(models.Channels.onCreateChannel).toBeCalled();

    act(() => {
      fireOnCreateChannel();
    });
    const allChannels = channels.links(testUtils);
    expect("length" in allChannels && allChannels.length).toEqual(1);
  });

  it("updates existing channel when onUpdateChannel fires", async () => {
    const push = jest.fn();
    const testUtils = render(<ChannelsTestRoute push={push} />);
    expect(models.Channels.onCreateChannel).toBeCalled();
    const channel1 = "channel-1";
    const channel2 = "channel-2";
    act(() => {
      fireOnCreateChannel(channel1);
      fireOnCreateChannel(channel2);
    });
    let allChannels = channels.links(testUtils);
    expect("length" in allChannels && allChannels.length).toEqual(2);
    // Descending sorting by insertion data
    within(allChannels[0]).getByText(channel2);
    within(allChannels[1]).getByText(channel1);
    act(() => {
      fireOnUpdateChannel(channel1);
    });
    allChannels = channels.links(testUtils);
    expect("length" in allChannels && allChannels.length).toEqual(2);
    // Make sure channel1 is back at the top
    within(allChannels[0]).getByText(channel1);
    within(allChannels[1]).getByText(channel2);
  });

  it("navigates to channel page when a channel card is clicked", async () => {
    const push = jest.fn();
    const testUtils = render(<ChannelsTestRoute push={push} />);
    expect(models.Channels.getChannels).toBeCalled();
    await act(async () => {
      resolveGetChannels();
    });
    const allChannels = channels.links(testUtils);
    expect("length" in allChannels && allChannels.length).toEqual(1);
    fireEvent.click(allChannels[0]);
    expect(push.mock.calls.length).toEqual(1);
    expect(push.mock.calls[0][0].indexOf("/channel?id=")).toEqual(0);
  });
  it("can add a channel", () => {
    const push = jest.fn();
    const newChannelName = "New channel name";

    const testUtils = render(<ChannelsTestRoute push={push} />);
    fireEvent.change(channels.input(testUtils), {
      target: { value: newChannelName }
    });
    fireEvent.click(channels.button(testUtils));
  });
});
