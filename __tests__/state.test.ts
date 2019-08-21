import cases from "jest-in-case";

import { State, Action } from "../src/types";
import { reducer, getInitialState } from "../src/state";
import { createChannel, createMessage } from "../src/test-utils/data-bank";

type ReducerTest = {
  state: State;
  action: Action;
  assertions: (newState: State, state: State, action: Action) => void;
  name?: string;
};
const tests: ReducerTest[] = [
  {
    state: getInitialState(),
    action: {
      type: "append-channels",
      payload: { items: [createChannel()], nextToken: null }
    },
    assertions: (newState, state, action) => {
      expect(newState.channels.items.length).toEqual(1);
    },
    name: "Can append channel to empty state"
  },
  {
    name: "Can prepend a single channel",
    state: getInitialState(),
    action: {
      type: "prepend-channel",
      payload: createChannel()
    },
    assertions: (newState, state, action) => {
      expect(newState.channels.items.length).toEqual(1);
    }
  },
  {
    name: "Can set messages list",
    state: getInitialState(),
    action: {
      type: "set-messages",
      payload: {
        messages: {
          items: [createMessage("test-channel-id")],
          nextToken: ""
        },
        channelId: "test-channel-id"
      }
    },
    assertions: (newState, state, action) => {
      expect(newState.channels.items.length).toEqual(1);
    }
  },
  {
    name: "Can prepend instead of overwriting when set-channels is invoked",
    state: {
      ...getInitialState(),
      channels: {
        items: [createChannel("1")],
        nextToken: ""
      }
    },
    action: {
      type: "set-channels",
      payload: {
        items: [createChannel("2")],
        nextToken: ""
      }
    },
    assertions: (newState, state, action) => {
      expect(newState.channels.items.length).toEqual(2);
      expect(newState.channels.items[0].id).toEqual("2");
      expect(newState.channels.items[1].id).toEqual("1");
    }
  }
];

const runTest = testData => {
  const { state, action, assertions } = testData;
  const newState = reducer(state, action);
  assertions(newState, state, action);
};

describe("reducer tests", () => {
  it("exports", () => {
    expect(reducer).toBeDefined();
  });
  cases("works", runTest, tests);
});
