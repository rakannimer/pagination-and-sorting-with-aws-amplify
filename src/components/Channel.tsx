import nanoid from "nanoid";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native-web";
import { useInView } from "react-intersection-observer";

import { useModels } from "../models/ModelsContext";
import { DispatcherContext, useAppReducer } from "../state";
import { colors } from "../theme";
import { Dispatcher, MessageType, State } from "../types";
import AppShell from "./AppShell";
import { InputZone } from "./InputZone";
import { ModelsContext } from "../models/ModelsContext";

export const Message = ({ message }: { message: MessageType }) => {
  const [username, setUsername] = React.useState("");
  const { User } = useModels();
  React.useEffect(() => {
    let isMounted = false;

    User.getUsername(message.senderId)
      .then(v => {
        if (isMounted === true) return;
        if (v.data.getUser.name) {
          setUsername(v.data.getUser.name);
        } else {
          setUsername("Anonymous");
        }
      })
      .catch(err => {
        console.error("Failed to get username for message ", message);
      });
    return () => {
      isMounted = false;
    };
  }, []);
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true
  });
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
      testID="Message"
    >
      <div ref={ref}>
        <View style={{ flex: 10 }}>
          <Text style={{ color: "white", fontWeight: "bold", marginBottom: 5 }}>
            {message.text}
          </Text>
          <Text style={{ color: "white" }}>Sent by {username}</Text>
          <Text style={{ color: "white" }}>
            Created at: {new Date(Number(message.createdAt)).toLocaleString()}
          </Text>
        </View>
      </div>
    </View>
  );
};

export const Channel = ({
  messages = { items: [], nextToken: "" },
  channelId,
  me
}: {
  messages: State["channels"]["items"][0]["messages"];
  channelId: string;
  me: State["me"];
}) => {
  const dispatch = React.useContext(DispatcherContext);
  const flatlistRef = React.useRef<null | FlatList<MessageType>>(null);
  const { Channel } = useModels();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    let isMounted = true;
    if (!channelId) return;
    setIsLoading(true);
    const onCreateListener = Channel.onCreateMessage(channelId).subscribe(
      message => {
        const newMessage = message.value.data.onCreateMessageInChannel;
        if (newMessage === null || newMessage.senderId === me.id) return;
        dispatch({ type: "prepend-message", payload: newMessage });
      },
      err => {
        console.warn("Error listening to onCreateMessage ", err);
      }
    );
    Channel.getChannelMessages(channelId, "")
      .then(({ messages, channel }) => {
        if (!isMounted) return;
        setIsLoading(false);
        dispatch({ type: "append-messages", payload: { channelId, messages } });
        dispatch({ type: "update-channel", payload: channel });
      })
      .catch(err => {
        console.warn(
          "Failed to retrieve channel messages for channel ",
          channelId
        );
        setIsLoading(false);
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
              <View style={{ height: 30 }} />
            )
          }
          keyExtractor={item => item.id}
          data={messages.items}
          renderItem={({ item }) => <Message key={item.id} message={item} />}
          onEndReached={() => {
            if (messages.nextToken === null) return;
            setIsLoading(true);
            Channel.getChannelMessages(channelId, messages.nextToken).then(
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
          accessibilityLabel={"Message List"}
        />
      )}
    </View>
  );
};

export const ChannelRoute = () => {
  const router = useRouter();
  const [state, dispatch] = useAppReducer();
  const { Channel: ChannelModel } = useModels();
  const channelId = (router.query && router.query.id) as string;
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
    if (channelIndex === -1) {
      return;
    }
    dispatch({
      type: "move-to-front",
      payload: state.channels.items[channelIndex]
    });
    ChannelModel.createMessage(message);
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
      <Channel messages={messages} channelId={channelId} me={state.me} />
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
