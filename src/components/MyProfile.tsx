import * as React from "react";
import { View, TouchableOpacity, TextInput } from "react-native-web";

import { colors } from "../theme";
import { ImportantText, StaticSpacer, NormalText } from "./utils";
import { State } from "../types";

import { upsertUser } from "../models/User";

const textInputStyle = {
  backgroundColor: "white",
  color: colors.primaryDark,
  height: 30,
  padding: 20,
  borderRadius: 12
};

type Props = { me: State["me"]; onSubmit: (me: State["me"]) => void };
export const MyProfile = ({ me, onSubmit }: Props) => {
  const [name, setName] = React.useState(me.name);
  const [url, setUrl] = React.useState(me.url);
  const [bio, setBio] = React.useState(me.bio);
  const submit = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("url", url);
    localStorage.setItem("bio", bio);
    const user = { name: name, url, bio, id: me.id };
    onSubmit(user);
    upsertUser(user);
  };
  const isSubmittable = name !== me.name || url !== me.url || bio !== me.bio;
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
        <TextInput
          style={textInputStyle}
          placeholder={"Username"}
          value={name}
          onChangeText={setName}
          onSubmitEditing={submit}
        />

        <StaticSpacer />
        <NormalText>Bio</NormalText>
        <StaticSpacer />
        <TextInput
          style={textInputStyle}
          placeholder={"Bio"}
          value={bio}
          onChangeText={setBio}
          onSubmitEditing={submit}
        />

        <StaticSpacer />
        <NormalText>Link</NormalText>
        <StaticSpacer />
        <TextInput
          style={textInputStyle}
          placeholder={"Twitter/Github/Medium/..."}
          value={url}
          onChangeText={setUrl}
          onSubmitEditing={submit}
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
            backgroundColor: isSubmittable
              ? colors.highlight
              : colors.highlightOpaque(0.3),
            padding: 20,
            borderRadius: 12
          }}
          onPress={() => {
            submit();
          }}
        >
          <NormalText style={{ textAlign: "center" }}>Save</NormalText>
        </TouchableOpacity>
      </View>
    </>
  );
};
