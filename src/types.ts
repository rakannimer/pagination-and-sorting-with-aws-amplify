export type State = {
  me: {
    id?: string;
    name?: string;
    bio?: string;
    url?: string;
  };
  channels: List<{
    id: string;
    messages: List<{
      id: string;
      text: string;
      createdAt: string;
      senderId: string;
    }>;
    name: string;
    createdAt: string;
    updatedAt: string;
  }>;
};

export type List<T extends unknown> = {
  items: T[];
  nextToken: string;
};
export type UserType = State["me"];
export type ChannelType = State["channels"]["items"][0];
export type MessageType = ChannelType["messages"]["items"][0];

export type Action =
  | { type: "set-my-info"; payload: Partial<State["me"]> }
  | {
      type: "append-channels";
      payload: State["channels"];
    }
  | {
      type: "prepend-channel";
      payload: ChannelType;
    }
  | {
      type: "prepend-channels";
      payload: List<ChannelType>;
    }
  | {
      type: "set-channels";
      payload: State["channels"];
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
    }
  | {
      type: "set-messages";
      payload: { messages: List<MessageType>; channelId: string };
    };

export type Dispatcher = React.Dispatch<Action>;
