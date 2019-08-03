import nanoid from "nanoid";
import * as React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native-web";
import { __RouterContext } from "react-router";

import { InputZone } from "./InputZone";
import { colors } from "../theme";
import { ChannelType, Dispatcher, State } from "../types";
import { createChannel, getChannels } from "../models/Channels";
import { DispatcherContext } from "../state";

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
        borderColor: colors.highlightOpaque(0.3),
        borderWidth: 2,
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

export const Channels = ({ channels }: { channels: State["channels"] }) => {
  const dispatch = React.useContext(DispatcherContext);
  const flatlistRef = React.useRef<null | FlatList<ChannelType>>(null);
  const [isLoadingPosition, setIsLoadingPosition] = React.useState<
    "none" | "top" | "bottom"
  >("none");

  React.useEffect(() => {
    let isMounted = true;
    setIsLoadingPosition("top");
    getChannels()
      .then(channels => {
        if (!isMounted) return;
        setIsLoadingPosition("none");
        dispatch({ type: "set-channels", payload: channels });
      })
      .catch(err => {
        console.warn("Error fetching channels ", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);
  // console.warn(channels.items.map(c => c.id));
  return (
    <>
      {isLoadingPosition === "top" && (
        <ActivityIndicator
          style={{ marginTop: 15 }}
          animating={true}
          color={colors.highlight}
        />
      )}
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
          setIsLoadingPosition("bottom");
          getChannels(channels.nextToken).then(nextChannels => {
            setIsLoadingPosition("none");
            dispatch({ type: "append-channels", payload: nextChannels });
          });
        }}
        onEndReachedThreshold={0.1}
      />
      {isLoadingPosition === "bottom" && (
        <ActivityIndicator animating={true} color={colors.highlight} />
      )}
    </>
  );
};

export const ChannelsRoute = ({
  channels
}: {
  channels: State["channels"];
}) => {
  const dispatch = React.useContext(DispatcherContext);
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
      <Channels channels={channels} />
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
