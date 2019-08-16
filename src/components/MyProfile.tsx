import * as React from "react";
import { TextInput, TouchableOpacity, View } from "react-native-web";

// import { upsertUser } from "../models/User";
import { colors } from "../theme";
import { State } from "../types";
import { ImportantText, NormalText, StaticSpacer } from "./utils";
import AppShell from "./AppShell";
import { useAppReducer } from "../state";
import Head from "next/head";
import { useModels } from "../models/ModelsContext";

const textInputStyle = {
  backgroundColor: "white",
  color: colors.primaryDark,
  height: 30,
  padding: 20,
  borderRadius: 12
};

type Props = { me: State["me"]; onSubmit: (me: State["me"]) => void };
export const MyProfile = ({ me, onSubmit }: Props) => {
  const models = useModels();
  const [name, setName] = React.useState(me.name || "");
  const [url, setUrl] = React.useState(me.url || "");
  const [bio, setBio] = React.useState(me.bio || "");
  const [isSubmittable, setIsSubmittable] = React.useState(false);
  React.useEffect(() => {
    if (name === "") setName(me.name || "");
    if (url === "") setUrl(me.url || "");
    if (bio === "") setBio(me.bio || "");
  }, [me, name, url, bio]);
  const submit = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("url", url);
    localStorage.setItem("bio", bio);
    const user = { name: name, url, bio, id: me.id };
    onSubmit(user);
    models.User.upsertUser(user);
    setIsSubmittable(false);
  };
  return (
    <>
      <Head>
        <title>{name ? `${name}'s Profile` : "My Profile"}</title>
      </Head>
      <View
        style={{
          padding: 20,
          height: "75%"
        }}
        accessibilityLabel="Profile Form"
      >
        <ImportantText accessibilityRole={"header"}>My profile</ImportantText>
        <StaticSpacer />
        <NormalText>Username</NormalText>
        <StaticSpacer />
        <TextInput
          style={textInputStyle}
          placeholder={"Username"}
          value={name}
          onChangeText={name => {
            setIsSubmittable(true);
            setName(name);
          }}
          onSubmitEditing={submit}
          accessibilityLabel={"Username"}
        />

        <StaticSpacer />
        <NormalText>Bio</NormalText>
        <StaticSpacer />
        <TextInput
          style={textInputStyle}
          placeholder={"Bio"}
          value={bio}
          onChangeText={bio => {
            setIsSubmittable(true);
            setBio(bio);
          }}
          onSubmitEditing={submit}
          accessibilityLabel={"Bio"}
        />

        <StaticSpacer />
        <NormalText>Link</NormalText>
        <StaticSpacer />
        <TextInput
          style={textInputStyle}
          placeholder={"Twitter/Github/Medium/..."}
          value={url}
          onChangeText={url => {
            setIsSubmittable(true);
            setUrl(url);
          }}
          onSubmitEditing={submit}
          accessibilityLabel={"Url"}
        />

        <StaticSpacer />
      </View>
      <View
        style={{
          padding: 20,
          height: "15%"
        }}
        accessibilityLabel="Profile Form Submit Button"
      >
        <TouchableOpacity
          style={{
            backgroundColor: isSubmittable
              ? colors.highlight
              : colors.highlightOpaque(0.3),
            padding: 20,
            borderRadius: 12
          }}
          {...{
            onClick: () => {
              console.warn("TouchableOpacity clicked profile");
              submit();
            }
          }}
          //accessibilityLabel="Submit changes"
          aria-label="Submit changes"
        >
          <NormalText style={{ textAlign: "center" }}>Save</NormalText>
        </TouchableOpacity>
      </View>
    </>
  );
};

export const MyProfileRoute = () => {
  const [state, dispatch] = useAppReducer();
  return (
    <AppShell state={state} dispatch={dispatch}>
      <MyProfile
        me={state.me}
        onSubmit={me => {
          dispatch({ type: "set-my-info", payload: me });
        }}
      />
    </AppShell>
  );
};
