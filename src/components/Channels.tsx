import nanoid from "nanoid";
import * as React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native-web";
import { __RouterContext } from "react-router";

import { InputZone } from "./InputZone";
import { colors } from "../theme";
import { ChannelType, Dispatcher, State } from "../types";
import { createChannel, getChannels } from "../models/Channels";

type Props = { channel: ChannelType };

const ChannelCard = (props: Props) => {
  const { channel } = props;
  const router = React.useContext(__RouterContext);
  const { messages = { items: [] } } = channel;
  const lastMessage =
    messages.items.length > 0
      ? messages.items[messages.items.length - 1].text
      : "";
  return (
    <TouchableOpacity
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
      accessibilityRole="link"
      {...{
        // Being dishonest with typescript because of the lack of react-native-web types
        href: `/channel/${1}`
      }}
      onPress={() => {
        router.history.push(`/channel/${channel.id}`);
      }}
    >
      <View style={{ flex: 10 }}>
        <Text style={{ color: "white", fontWeight: "bold", marginBottom: 5 }}>
          {channel.name}
        </Text>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            marginTop: 5,
            marginBottom: 5
          }}
        >
          Last updated on {new Date(Number(channel.updatedAt)).toLocaleString()}
        </Text>
        <Text style={{ color: "white" }}>{lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const Channels = ({
  channels,
  shouldScrollDown,
  dispatch
}: {
  channels: State["channels"];
  shouldScrollDown: number | false;
  dispatch: Dispatcher;
}) => {
  const flatlistRef = React.useRef<null | FlatList<ChannelType>>(null);
  React.useEffect(() => {
    if (flatlistRef.current === null || shouldScrollDown === false) return;
    flatlistRef.current.scrollToEnd();
  }, [shouldScrollDown]);
  return (
    <FlatList
      inverted={false}
      style={{
        height: "80%"
      }}
      ref={flatlistRef}
      keyExtractor={item => {
        return item.id;
      }}
      data={channels.items}
      renderItem={({ item: channel }) => <ChannelCard channel={channel} />}
      onEndReached={() => {
        if (channels.nextToken === null) return;
        getChannels(channels.nextToken).then(nextChannels => {
          dispatch({ type: "append-channels", payload: nextChannels });
        });
      }}
      onEndReachedThreshold={0.1}
    />
  );
};

export const ChannelsRoute = ({
  channels,
  dispatch
}: {
  channels: State["channels"];
  dispatch: Dispatcher;
}) => {
  const addChannel = (name: string) => {
    const channel: ChannelType = {
      id: nanoid(),
      name,
      createdAt: `${Date.now()}`,
      updatedAt: `${Date.now()}`,
      messages: { items: [], nextToken: "" }
    };
    dispatch({
      type: "prepend-channel",
      payload: channel
    });
    createChannel(channel);
  };
  return (
    <>
      <Channels
        channels={channels}
        shouldScrollDown={false}
        dispatch={dispatch}
      />
      <InputZone
        placeholder={"Create a new channel"}
        onSubmit={content => {
          addChannel(content);
        }}
        buttonText={"Create channel"}
      />
    </>
  );
};
