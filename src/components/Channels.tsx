import nanoid from "nanoid";
import * as React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native-web";
import { __RouterContext } from "react-router";

import { InputZone } from "./InputZone";
import { colors } from "../theme";
import { ChannelType, Dispatcher } from "../types";
import { createChannel } from "../models/Channels";

type Props = { channel: ChannelType };

const ChannelCard = (props: Props) => {
  const { channel } = props;
  const router = React.useContext(__RouterContext);
  const { messages } = channel;
  const lastMessage =
    messages.length > 0 ? messages[messages.length - 1].text : "";
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
        <Text style={{ color: "white" }}>{lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const Channels = ({
  channels,
  shouldScrollDown
}: {
  channels: ChannelType[];
  shouldScrollDown: number;
}) => {
  const flatlistRef = React.useRef<null | FlatList<ChannelType>>(null);
  React.useEffect(() => {
    if (flatlistRef.current === null) return;
    flatlistRef.current.scrollToEnd();
  }, [shouldScrollDown]);
  return (
    <FlatList
      inverted={false}
      style={{
        height: "80%"
      }}
      ref={flatlistRef}
      keyExtractor={item => item.id}
      data={channels}
      renderItem={({ item: channel }) => <ChannelCard channel={channel} />}
    />
  );
};

export const ChannelsRoute = ({
  channels,
  dispatch
}: {
  channels: ChannelType[];
  dispatch: Dispatcher;
}) => {
  const [shouldScrollDown, setScrollDown] = React.useState(0);
  const addChannel = (name: string) => {
    const channel = {
      id: nanoid(),
      name,
      createdAt: `${Date.now()}`,
      updatedAt: `${Date.now()}`,
      messages: []
    };
    setScrollDown(Date.now());
    dispatch({
      type: "append-channel",
      payload: channel
    });
    createChannel(channel);
  };
  return (
    <>
      <Channels channels={channels} shouldScrollDown={shouldScrollDown} />
      <InputZone
        placeholder={"Create a new channel"}
        onSubmit={content => {
          addChannel(content);
          // setScrollDown(Date.now());
          // dispatch({
          //   type: "append-channel",
          //   payload: {
          //     id: nanoid(),
          //     name: content,
          //     createdAt: `${Date.now()}`,
          //     updatedAt: `${Date.now()}`,
          //     messages: []
          //   }
          // });
        }}
        buttonText={"Create channel"}
      />
    </>
  );
};
