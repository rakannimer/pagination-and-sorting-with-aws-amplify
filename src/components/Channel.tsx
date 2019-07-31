import nanoid from "nanoid";
import * as React from "react";
import { FlatList, Text, View } from "react-native-web";

import { colors } from "../theme";
import { ChannelType, MessageType, Dispatcher, State } from "../types";
import { RouteComponentProps } from "react-router";
import { InputZone } from "./InputZone";

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
  messages,
  shouldScrollDown
}: {
  messages: MessageType[];
  shouldScrollDown?: number;
}) => {
  const flatlistRef = React.useRef<null | FlatList<MessageType>>(null);
  React.useEffect(() => {
    if (flatlistRef.current === null) return;
    flatlistRef.current.scrollToEnd();
  }, [shouldScrollDown]);
  return (
    <FlatList
      ref={flatlistRef}
      style={{
        height: "80%"
      }}
      keyExtractor={item => item.id}
      data={messages}
      renderItem={({ item }) => <Message key={item.id} message={item} />}
    />
  );
};

type ChannelRouteProps = {
  channelId: string;
  channels: ChannelType[];
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
  const channelIndex = channels.findIndex(channel => channel.id === channelId);
  if (channelIndex === -1) {
    return <Text>Channel {channelId} doesn't exist yet</Text>;
  }
  return (
    <>
      <Channel
        messages={channels[channelIndex].messages}
        shouldScrollDown={shouldScrollDown}
      />
      <InputZone
        placeholder={"Create a new message"}
        onSubmit={content => {
          dispatch({
            type: "append-message",
            payload: {
              text: content,
              createdAt: `${Date.now()}`,
              id: nanoid(),
              senderId: me.id,
              messageChannelId: channelId
            }
          });
          setScrollDown(Date.now());
        }}
        buttonText={"Send message"}
      />
    </>
  );
};
