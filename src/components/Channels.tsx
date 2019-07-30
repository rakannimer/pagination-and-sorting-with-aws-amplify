import * as React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native-web";
import { withRouter } from "react-router-dom";

import { colors } from "../theme";

const ChannelCard = withRouter(props => {
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
      onPress={() => {
        props.history.push(`/channel/${1}`);
      }}
    >
      <View style={{ flex: 10 }}>
        <Text style={{ color: "white", fontWeight: "bold", marginBottom: 5 }}>
          Channel name
        </Text>
        <Text style={{ color: "white" }}>Last Message</Text>
      </View>
    </TouchableOpacity>
  );
});

export const Channels = () => {
  return (
    <FlatList
      inverted
      style={{
        height: "80%"
      }}
      data={Array.from({ length: 200 }, (v, i) => ({
        key: `${i}`
      }))}
      renderItem={({ item }) => <ChannelCard {...item} />}
    />
  );
};
