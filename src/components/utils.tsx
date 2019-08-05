import * as React from "react";
import { View, Text } from "react-native-web";

export const FlexSpacer = (props: any) => (
  <View
    {...props}
    style={{
      flex: 0.1,
      ...props.style
    }}
  />
);

export const StaticSpacer = ({ size = 12 }) => (
  <View style={{ height: size, width: size }} />
);

export const NormalText = (props: any) => (
  <Text {...props} style={{ color: "white", fontSize: 20, ...props.style }} />
);

export const ImportantText = (props: any) => (
  <Text
    {...props}
    style={{ color: "white", fontSize: 25, fontWeight: "bold", ...props.style }}
  />
);
