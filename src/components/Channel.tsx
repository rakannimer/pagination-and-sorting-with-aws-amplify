import * as React from "react";
import { FlatList, TouchableOpacity, Text, View } from "react-native-web";

import { colors } from "../theme";

export const Message = props => {
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
          Message
        </Text>
        <Text style={{ color: "white" }}>Username</Text>
        <Text style={{ color: "white" }}>
          Created at: {new Date(Date.now()).toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

export const Channel = () => {
  return (
    <FlatList
      inverted
      style={{
        height: "80%"
      }}
      data={Array.from({ length: 10 }, (v, i) => ({
        key: `${i}`
      }))}
      renderItem={({ item }) => <Message {...item} />}
    />
  );
};
