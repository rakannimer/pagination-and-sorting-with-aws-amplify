import * as React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from "react-native-web";
import { __RouterContext } from "react-router";

import { getActions } from "../actions";
import {
  getChannels,
  onCreateChannel,
  onUpdateChannel
} from "../models/Channels";
import { onCreateMessage } from "../models/Channel";
import { DispatcherContext } from "../state";
import { colors } from "../theme";
import { ChannelType, State } from "../types";
import { InputZone } from "./InputZone";

type Props = { channel: ChannelType; me: State["me"] };

const ChannelCard = (props: Props) => {
  const dispatch = React.useContext(DispatcherContext);
  const {
    channel,
    me: { id: myId }
  } = props;
  const { messages = { items: [] }, id: channelId } = channel;
  const router = React.useContext(__RouterContext);
  const lastMessage = messages.items.length > 0 ? messages.items[0].text : "";
  React.useEffect(() => {
    const subscription = onCreateMessage(channelId).subscribe(
      data => {
        const newMessage = data.value.data.onCreateMessageInChannel;
        if (newMessage === null) {
          return;
        }
        const senderId = newMessage.senderId;
        if (senderId === myId) {
          return;
        }
        dispatch({ type: "prepend-message", payload: newMessage });
      },
      () => {
        console.error("Error onCreateMessage");
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [channelId]);
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
            // fontWeight: "bold",
            marginTop: 5,
            marginBottom: 5
          }}
        >
          Last updated on {new Date(Number(channel.updatedAt)).toLocaleString()}
        </Text>
        <Text style={{ color: "white", marginTop: 5 }}>{lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const Channels = ({
  channels,
  me
}: {
  channels: State["channels"];
  me: State["me"];
}) => {
  const dispatch = React.useContext(DispatcherContext);
  const flatlistRef = React.useRef<null | FlatList<ChannelType>>(null);
  const [isLoadingPosition, setIsLoadingPosition] = React.useState<
    "none" | "top" | "bottom"
  >("none");
  React.useEffect(() => {
    let isMounted = true;
    setIsLoadingPosition("top");
    const onCreateSubscription = onCreateChannel().subscribe(
      response => {
        const channel = response.value.data.onCreateChannelInList;
        if (channel === null || channel.creatorId === me.id) return;
        dispatch({
          type: "prepend-channel",
          payload: {
            id: channel.id,
            name: channel.name,
            createdAt: channel.createdAt,
            updatedAt: channel.updatedAt,
            creatorId: channel.creatorId || "",
            messages: {
              items: [],
              nextToken: ""
            }
          }
        });
      },
      err => {
        console.warn("onCreateChannel subscription error ", err);
      }
    );

    const onUpdateChannelSubscription = onUpdateChannel().subscribe(
      response => {
        const channel = response.value.data.onUpdateChannelInList;
        if (channel === null) return;
        dispatch({
          type: "update-channel",
          payload: { ...channel, creatorId: channel.creatorId || "" }
        });
        dispatch({
          type: "move-to-front",
          payload: { channelId: channel.id }
        });
      },
      () => {
        console.error("Error onUpdateChannelSubscription");
      }
    );

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
      onCreateSubscription.unsubscribe();
      onUpdateChannelSubscription.unsubscribe();
    };
  }, []);
  return (
    <>
      <FlatList
        inverted={false}
        style={{
          height: "80%"
        }}
        ListHeaderComponent={() =>
          isLoadingPosition === "top" ? (
            <ActivityIndicator
              style={{ height: 30 }}
              animating={true}
              color={colors.highlight}
            />
          ) : (
            <View style={{ height: 30 }}></View>
          )
        }
        ListFooterComponent={() =>
          isLoadingPosition === "bottom" ? (
            <ActivityIndicator
              style={{ marginTop: 15, height: 30 }}
              animating={true}
              color={colors.highlight}
            />
          ) : (
            <View style={{ height: 30 }}></View>
          )
        }
        ref={flatlistRef}
        keyExtractor={item => {
          return item.id;
        }}
        data={channels.items}
        renderItem={({ item: channel }) => (
          <ChannelCard channel={channel} me={me} />
        )}
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
    </>
  );
};

export const ChannelsRoute = ({
  channels,
  me
}: {
  channels: State["channels"];
  me: State["me"];
}) => {
  const dispatch = React.useContext(DispatcherContext);
  const actions = getActions(dispatch);
  return (
    <>
      <Channels channels={channels} me={me} />
      <InputZone
        placeholder={"Create a new channel"}
        onSubmit={content => {
          actions.addChannel(content, me.id);
        }}
        buttonText={"Create channel"}
      />
    </>
  );
};
