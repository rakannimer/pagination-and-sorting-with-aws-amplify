import * as React from "react";
import { View, TouchableOpacity, TextInput } from "react-native-web";

import { colors } from "../theme";
import { ImportantText, StaticSpacer, NormalText } from "./utils";

const textInputStyle = {
  backgroundColor: "white",
  color: colors.primaryDark,
  height: 30,
  padding: 20,
  borderRadius: 12
};

export const MyProfile = () => {
  return (
    <>
      <View
        style={{
          padding: 20,
          height: "75%"
        }}
      >
        <ImportantText accessibilityRole={"header"}>My profile</ImportantText>

        <StaticSpacer />
        <NormalText>Username</NormalText>
        <StaticSpacer />
        <TextInput style={textInputStyle} placeholder={"Username"} />

        <StaticSpacer />
        <NormalText>Bio</NormalText>
        <StaticSpacer />
        <TextInput style={textInputStyle} placeholder={"Bio"} />

        <StaticSpacer />
        <NormalText>Link</NormalText>
        <StaticSpacer />
        <TextInput
          style={textInputStyle}
          placeholder={"Twitter/Github/Medium/..."}
        />

        <StaticSpacer />
      </View>
      <View
        style={{
          padding: 20,
          height: "15%"
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: colors.highlight,
            padding: 20
          }}
          onPress={() => {}}
        >
          <NormalText style={{ textAlign: "center" }}>Save</NormalText>
        </TouchableOpacity>
      </View>
    </>
  );
};
