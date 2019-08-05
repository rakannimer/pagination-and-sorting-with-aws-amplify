import * as React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  StyleProp,
  ViewStyle,
  TextStyle
} from "react-native-web";
import { withRouter } from "react-router-dom";

import { colors } from "../theme";

type LinkProps = { href: string } & TouchableOpacityProps;
const Link: React.ComponentType<LinkProps> = props => (
  <TouchableOpacity {...props} />
);

export const Header = withRouter(props => {
  return (
    <View style={styles.header}>
      <Link
        style={[
          styles.headerLink,
          props.history.location.pathname === "/me" && styles.headerSelected
        ]}
        href="/me"
        accessible={true}
        onPress={() => {
          props.history.push("/me");
        }}
        accessibilityRole="link"
      >
        <Text style={styles.headerText}>My Profile</Text>
      </Link>

      <Link
        style={[
          styles.headerLink,
          (props.history.location.pathname === "/channels" ||
            props.history.location.pathname === "/") &&
            styles.headerSelected
        ]}
        href="/channels"
        accessible={true}
        onPress={() => {
          props.history.push("/channels");
        }}
        accessibilityRole="link"
      >
        <Text style={styles.headerText}>Channels</Text>
      </Link>
    </View>
  );
});

const styles: { [key: string]: StyleProp<ViewStyle | TextStyle> } = {
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.primaryLight
  },
  header: {
    display: "flex",
    flexDirection: "row",
    height: "10%",
    backgroundColor: colors.primary
  },
  headerLink: { width: "50%", alignItems: "center", justifyContent: "center" },
  headerSelected: {
    borderBottomColor: colors.highlight,
    borderBottomWidth: 2
  },
  headerText: {
    color: "white",
    fontWeight: "800",
    fontSize: 20
  }
};
