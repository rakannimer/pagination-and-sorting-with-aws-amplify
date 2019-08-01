import * as React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native-web";
import { colors } from "../theme";
import { FlexSpacer } from "./utils";

export const InputZone = ({ onSubmit, placeholder, buttonText }) => {
  const textinputRef = React.useRef<TextInput>(null);
  const [value, setValue] = React.useState("");
  const submit = () => {
    onSubmit(value);
    setValue("");
  };
  React.useEffect(() => {
    if (value === "") textinputRef.current.focus();
  }, [value]);
  const isSubmittable = value !== "";
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
        ref={textinputRef}
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
            if (!isSubmittable) return;
            submit();
          }}
          style={{
            backgroundColor: isSubmittable
              ? colors.highlight
              : colors.highlightOpaque(0.3),
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
