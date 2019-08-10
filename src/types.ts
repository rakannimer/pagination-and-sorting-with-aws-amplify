type OrNull<T> = T | null;
export type State = {
  me: {
    id: string;
    name?: OrNull<string>;
    bio?: OrNull<string>;
    url?: OrNull<string>;
  };
  channels: List<{
    id: string;
    messages: List<{
      id: string;
      text: string;
      createdAt: string;
      senderId: string;
      messageChannelId: string;
    }>;
    creatorId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    channelChannelListId?: string;
  }>;
};

export type List<T extends unknown> = {
  items: T[];
  nextToken: string;
};
export type UserType = State["me"];
export type ChannelType = State["channels"]["items"][0];
export type MessageType = ChannelType["messages"]["items"][0];
import { CreateMessageInput } from "./API";
export type Action =
  | {
      type: "append-messages";
      payload: {
        messages: List<MessageType & { messageChannelId?: string }>;
        channelId: string;
      };
    }
  | {
      type: "prepend-message";
      payload: MessageType;
    }
  | { type: "set-my-info"; payload: State["me"] }
  | { type: "move-to-front"; payload: ChannelType }
  | {
      type: "append-channels";
      payload: State["channels"];
    }
  | {
      type: "prepend-channel";
      payload: ChannelType;
    }
  | {
      type: "set-channels";
      payload: State["channels"];
    }
  | {
      type: "update-channel";
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

export type Observable<Value = unknown, Error = {}> = {
  subscribe: (
    cb?: (v: Value) => void,
    errorCb?: (e: Error) => void,
    completeCallback?: () => void
  ) => { unsubscribe: Function };
};
export type Listener<T> = Observable<{ value: { data: T } }>;
