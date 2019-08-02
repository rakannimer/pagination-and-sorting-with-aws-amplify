import nanoid from "nanoid";
import * as React from "react";
import { FlatList, Text, View } from "react-native-web";

import { colors } from "../theme";
import { ChannelType, MessageType, Dispatcher, State } from "../types";
import { InputZone } from "./InputZone";
import { createMessage, getChannelMessages } from "../models/Channel";

export const Message = ({ message }: { message: MessageType }) => {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: colors.primaryDark,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        display: "flex",
        flexDirection: "row",
        borderRadius: 12
      }}
    >
      <View style={{ flex: 10 }}>
        <Text style={{ color: "white", fontWeight: "bold", marginBottom: 5 }}>
          {message.text}
        </Text>
        <Text style={{ color: "white" }}>
          Sent by Username {message.senderId}
        </Text>
        <Text style={{ color: "white" }}>
          Created at: {new Date(Number(message.createdAt)).toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

export const Channel = ({
  messages = { items: [], nextToken: "" },
  shouldScrollDown,
  channelId,
  dispatch
}: {
  messages: State["channels"]["items"][0]["messages"];
  shouldScrollDown?: number;
  channelId: string;
  dispatch: Dispatcher;
}) => {
  const flatlistRef = React.useRef<null | FlatList<MessageType>>(null);
  React.useEffect(() => {
    if (flatlistRef.current === null) return;
    // flatlistRef.current.scrollToEnd();
  }, [shouldScrollDown]);
  return (
    <FlatList
      inverted={true}
      ref={flatlistRef}
      style={{
        height: "80%"
      }}
      keyExtractor={item => item.id}
      data={messages.items}
      renderItem={({ item }) => <Message key={item.id} message={item} />}
      onEndReached={() => {
        if (messages.nextToken === null) return;
        getChannelMessages(channelId, messages.nextToken).then(messages => {
          dispatch({
            type: "append-messages",
            payload: { channelId, messages }
          });
        });
      }}
      onEndReachedThreshold={0.01}
    />
  );
};

type ChannelRouteProps = {
  channelId: string;
  channels: State["channels"];
  dispatch: Dispatcher;
  me: State["me"];
};

export const ChannelRoute = ({
  channelId,
  channels,
  dispatch,
  me
}: ChannelRouteProps) => {
  const [shouldScrollDown, setScrollDown] = React.useState(0);

  const channelIndex = channels.items.findIndex(
    channel => channel.id === channelId
  );

  React.useEffect(() => {
    getChannelMessages(channelId, "").then(messages => {
      dispatch({ type: "set-messages", payload: { channelId, messages } });
    });
  }, [channelId]);

  if (channelIndex === -1) {
    return <Text>Channel {channelId} doesn't exist yet</Text>;
  }
  const addMessage = (content: string, dispatch: Dispatcher) => {
    const message = {
      text: content,
      createdAt: `${Date.now()}`,
      id: nanoid(),
      senderId: me.id,
      messageChannelId: channelId
    };
    dispatch({
      type: "prepend-message",
      payload: message
    });
    setScrollDown(Date.now());
    createMessage(message);
  };

  return (
    <>
      <Channel
        messages={channels.items[channelIndex].messages}
        shouldScrollDown={shouldScrollDown}
        channelId={channelId}
        dispatch={dispatch}
      />
      <InputZone
        placeholder={"Create a new message"}
        onSubmit={content => {
          addMessage(content, dispatch);
        }}
        buttonText={"Send message"}
      />
    </>
  );
};
