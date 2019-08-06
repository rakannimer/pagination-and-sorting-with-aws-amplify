import nanoid from "nanoid";
import * as React from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native-web";

import { colors } from "../theme";
import { MessageType, Dispatcher, State } from "../types";
import { InputZone } from "./InputZone";
import {
  createMessage,
  getChannelMessages,
  onCreateMessage
} from "../models/Channel";
import { getUsername } from "../models/User";
import { DispatcherContext, useAppReducer } from "../state";
import AppShell from "./AppShell";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

export const Message = ({ message }: { message: MessageType }) => {
  const [username, setUsername] = React.useState("");
  React.useEffect(() => {
    let isMounted = false;
    getUsername(message.senderId).then(v => {
      if (isMounted === true) return;
      if (v.data.getUser.name) {
        setUsername(v.data.getUser.name);
      } else {
        setUsername("Anonymous");
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);
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
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 7
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 5
      }}
    >
      <View style={{ flex: 10 }}>
        <Text style={{ color: "white", fontWeight: "bold", marginBottom: 5 }}>
          {message.text}
        </Text>
        <Text style={{ color: "white" }}>Sent by {username}</Text>
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
  me
}: {
  messages: State["channels"]["items"][0]["messages"];
  shouldScrollDown?: number;
  channelId: string;
  me: State["me"];
}) => {
  const dispatch = React.useContext(DispatcherContext);
  const flatlistRef = React.useRef<null | FlatList<MessageType>>(null);
  React.useEffect(() => {
    if (flatlistRef.current === null) return;
    // flatlistRef.current.scrollToEnd();
  }, [shouldScrollDown]);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const onCreateListener = onCreateMessage(channelId).subscribe(message => {
      const newMessage = message.value.data.onCreateMessageInChannel;
      if (newMessage === null || newMessage.senderId === me.id) return;
      //@ts-ignore
      dispatch({ type: "prepend-message", payload: newMessage });
    });
    getChannelMessages(channelId, "").then(({ messages, channel }) => {
      if (!isMounted) return;
      setIsLoading(false);
      dispatch({ type: "append-messages", payload: { channelId, messages } });
      dispatch({ type: "update-channel", payload: channel });
    });
    () => {
      isMounted = false;
      onCreateListener.unsubscribe();
    };
  }, [channelId]);
  const isServer = typeof window === "undefined";
  return (
    <View
      style={{
        height: "80%"
      }}
    >
      {!isServer && (
        <FlatList
          inverted={true}
          ref={flatlistRef}
          ListFooterComponent={() =>
            isLoading ? (
              <ActivityIndicator
                animating={true}
                color={colors.highlight}
                style={{ marginTop: 15, marginBottom: 15, height: 30 }}
              />
            ) : (
              <View style={{ height: 30 }}></View>
            )
          }
          keyExtractor={item => item.id}
          data={messages.items}
          renderItem={({ item }) => <Message key={item.id} message={item} />}
          onEndReached={() => {
            if (messages.nextToken === null) return;
            setIsLoading(true);
            getChannelMessages(channelId, messages.nextToken).then(
              ({ messages }) => {
                setIsLoading(false);
                dispatch({
                  type: "append-messages",
                  payload: { channelId, messages }
                });
              }
            );
          }}
          onEndReachedThreshold={0.01}
        />
      )}
    </View>
  );
};

type ChannelRouteProps = {
  channelId: string;
  channels: State["channels"];
  me: State["me"];
};

export const ChannelRoute = () => {
  const router = useRouter();
  const [state, dispatch] = useAppReducer();
  const [shouldScrollDown, setScrollDown] = React.useState(0);
  const channelId = (router.query && router.query.id) as string;
  if (!channelId) return <Text> Could not parse channelId from url</Text>;
  const channelIndex = state.channels.items.findIndex(
    channel => channel.id === channelId
  );
  const addMessage = (content: string, dispatch: Dispatcher) => {
    const message = {
      text: content,
      createdAt: `${Date.now()}`,
      id: nanoid(),
      senderId: state.me.id,
      messageChannelId: channelId
    };
    dispatch({
      type: "prepend-message",
      payload: message
    });
    dispatch({
      type: "move-to-front",
      payload: { channelId }
    });
    setScrollDown(Date.now());
    createMessage(message);
  };

  const messages =
    channelIndex === -1
      ? { items: [], nextToken: "" }
      : state.channels.items[channelIndex].messages;
  const channel =
    channelIndex === -1 ? { name: "" } : state.channels.items[channelIndex];
  return (
    <AppShell state={state} dispatch={dispatch}>
      <Head>
        <title>Channel {channel.name} </title>
      </Head>
      <Channel
        messages={messages}
        shouldScrollDown={shouldScrollDown}
        channelId={channelId}
        me={state.me}
      />
      <InputZone
        placeholder={"Create a new message"}
        onSubmit={content => {
          addMessage(content, dispatch);
        }}
        buttonText={"Send message"}
      />
    </AppShell>
  );
};

// ChannelRoute.getInitialProps = ({ query }: NextPageContext) => {
//   return { query };
// };
