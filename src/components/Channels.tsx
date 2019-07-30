import * as React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native-web";
import { __RouterContext } from "react-router";

import { colors } from "../theme";
import { ChannelType } from "../types";

type Props = { channel: ChannelType };

const ChannelCard = (props: Props) => {
  const { channel } = props;
  const router = React.useContext(__RouterContext);
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
        router.history.push(`/channel/${1}`);
      }}
    >
      <View style={{ flex: 10 }}>
        <Text style={{ color: "white", fontWeight: "bold", marginBottom: 5 }}>
          {channel.name}
        </Text>
        <Text style={{ color: "white" }}>Last Message</Text>
      </View>
    </TouchableOpacity>
  );
};

export const Channels = ({ channels }: { channels: ChannelType[] }) => {
  return (
    <FlatList
      inverted={false}
      style={{
        height: "80%"
      }}
      // data={Array.from({ length: 200 }, (v, i) => ({
      //   key: `${i}`
      // }))}
      data={channels}
      renderItem={({ item: channel }) => <ChannelCard channel={channel} />}
    />
  );
};
