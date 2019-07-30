import * as React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native-web";
import { colors } from "../theme";
import { FlexSpacer } from "./utils";

export const InputZone = ({ onSubmit, placeholder, buttonText }) => {
  const [value, setValue] = React.useState("");
  const submit = () => {
    onSubmit(value);
    setValue("");
  };
  return (
    <View
      style={{
        height: "10%",
        backgroundColor: colors.primaryDark,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <FlexSpacer />
      <TextInput
        placeholder={placeholder}
        value={value}
        style={{
          flex: 3,
          height: "50%",
          color: colors.primaryDark,
          padding: 10,
          borderRadius: 3,
          backgroundColor: "white"
        }}
        onChangeText={v => {
          setValue(v);
        }}
        placeholderTextColor={colors.primaryOpaque(0.6)}
        onSubmitEditing={() => {
          submit();
        }}
      />
      <FlexSpacer />
      <View
        style={{
          flex: 1,
          height: "50%"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            submit();
          }}
          style={{
            backgroundColor: colors.highlight,
            height: "100%",
            display: "flex",
            alignItems: "center",
            borderRadius: 15,
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center"
            }}
          >
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
      <FlexSpacer />
    </View>
  );
};
