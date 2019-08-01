export type State = {
  me: {
    id: string;
    name: string;
    bio: string;
    url: string;
  };
  channels: {
    id: string;
    messages: {
      id: string;
      text: string;
      createdAt: string;
      senderId: string;
    }[];
    name: string;
    createdAt: string;
    updatedAt: string;
  }[];
};
export type UserType = State["me"];

export type ChannelType = State["channels"][0];
export type MessageType = ChannelType["messages"][0];

export type Action =
  | { type: "set-my-info"; payload: Partial<State["me"]> }
  | {
      type: "append-channel";
      payload: ChannelType;
    }
  | {
      type: "prepend-channels";
      payload: ChannelType[];
    }
  | {
      type: "set-channels";
      payload: ChannelType[];
    }
  | {
      type: "update-channel";
      payload: Omit<ChannelType, "messages">;
    }
  | {
      type: "prepend-messages";
      payload: ChannelType;
    }
  | {
      type: "append-message";
      payload: MessageType & { messageChannelId: string };
    };

export type Dispatcher = React.Dispatch<Action>;
