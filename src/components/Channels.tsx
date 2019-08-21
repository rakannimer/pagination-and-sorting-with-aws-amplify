import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from "react-native-web";
import { useInView } from "react-intersection-observer";

import { getActions } from "../actions";
import { useModels } from "../models/ModelsContext";
import { DispatcherContext, useAppReducer } from "../state";
import { colors } from "../theme";
import { ChannelType, State } from "../types";
import AppShell from "./AppShell";
import { InputZone } from "./InputZone";

type Props = { channel: ChannelType; me: State["me"] };

const ChannelCard = (props: Props) => {
  const dispatch = React.useContext(DispatcherContext);
  const { Channel } = useModels();
  const {
    channel,
    me: { id: myId }
  } = props;
  const { messages = { items: [] }, id: channelId } = channel;
  const router = useRouter();
  const lastMessage = messages.items.length > 0 ? messages.items[0].text : "";
  React.useEffect(() => {
    const subscription = Channel.onCreateMessage(channelId).subscribe(
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
      err => {
        console.error("Error onCreateMessage ", err);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [channelId]);

  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true
  });
  return (
    <a
      data-testid="Channel Card"
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
        borderRadius: 12,
        textDecoration: "none",
        boxShadow: "0 0 10px black"

        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 7
        // },
        // shadowOpacity: 0.43,
        // shadowRadius: 9.51,

        // elevation: 10
      }}
      href={`/channel?id=${channel.id}`}
      onClick={() => {
        router.push(`/channel?id=${channel.id}`);
      }}
    >
      <div ref={ref}>
        <View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ color: "white" }}>Channel name: </Text>
            <Text
              style={{ color: "white", fontWeight: "bold", marginBottom: 5 }}
            >
              {channel.name}
            </Text>
          </View>
          <Text
            style={{
              color: "white",
              // fontWeight: "bold",
              marginTop: 5,
              marginBottom: 5
            }}
          >
            Last updated: {new Date(Number(channel.updatedAt)).toLocaleString()}
          </Text>
          <Text
            style={{ color: "white", marginTop: 15 }}
            accessibilityLabel="Last message"
          >
            {lastMessage}
          </Text>
        </View>
      </div>
    </a>
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
  const [isLoading, setisLoading] = React.useState(false);
  const { Channels } = useModels();
  React.useEffect(() => {
    let isMounted = true;
    if (channels.items && channels.items.length === 0) {
      setisLoading(true);
    }
    const onCreateSubscription = Channels.onCreateChannel().subscribe(
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

    const onUpdateChannelSubscription = Channels.onUpdateChannel().subscribe(
      response => {
        const channel = response.value.data.onUpdateChannelInList;
        if (channel === null) return;
        dispatch({
          type: "update-channel",
          payload: { ...channel, creatorId: channel.creatorId || "" }
        });
        dispatch({
          type: "move-to-front",
          payload: { ...channel, creatorId: channel.creatorId || "" }
        });
      },
      err => {
        console.error("Error onUpdateChannelSubscription", err);
      }
    );
    Channels.getChannels()
      .then(channels => {
        if (!isMounted) return;
        setisLoading(false);
        dispatch({ type: "set-channels", payload: channels });
      })
      .catch(err => {
        console.warn("Error fetching channels ", err);
        setisLoading(false);
      });

    return () => {
      isMounted = false;
      onCreateSubscription.unsubscribe();
      onUpdateChannelSubscription.unsubscribe();
    };
  }, []);
  return (
    <FlatList
      inverted={false}
      style={{
        height: "100%"
      }}
      ListFooterComponent={() => (
        <View style={{ height: 30 }}>
          {isLoading && (
            <ActivityIndicator
              style={{ height: 30 }}
              animating={true}
              color={colors.highlight}
            />
          )}
        </View>
      )}
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
        setisLoading(true);
        Channels.getChannels(channels.nextToken)
          .then(nextChannels => {
            setisLoading(false);
            dispatch({ type: "append-channels", payload: nextChannels });
          })
          .catch(err => {
            console.warn("onEndReached failed ", err);
            setisLoading(false);
          });
      }}
      onEndReachedThreshold={0.1}
      accessibilityLabel="Channel List"
    />
  );
};

export const ChannelsRoute = () => {
  const [state, dispatch] = useAppReducer();
  const actions = getActions(dispatch);

  return (
    <>
      <Head>
        <title>Channels</title>
      </Head>
      <AppShell state={state} dispatch={dispatch}>
        <main style={{ width: "100%", height: "80%" }}>
          <Channels channels={state.channels} me={state.me} />
        </main>
        <InputZone
          placeholder={"Create a new channel"}
          onSubmit={content => {
            actions.addChannel(content, state.me.id);
          }}
          buttonText={"Create channel"}
        />
      </AppShell>
    </>
  );
};
