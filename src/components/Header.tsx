import * as React from "react";

import { Text, View, StyleProp, ViewStyle, TextStyle } from "react-native-web";
import { useRouter } from "next/router";

import { colors } from "../theme";

const styles: {
  [key: string]: StyleProp<ViewStyle | TextStyle | unknown>;
} = {
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
  headerLink: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    textDecoration: "none"
  },
  headerSelected: {
    borderBottom: `${colors.highlight} 3px solid`
  },
  headerText: {
    color: "white",
    fontWeight: "800",
    fontSize: 20
  }
};

export const Header = () => {
  const router = useRouter();
  return (
    <View style={styles.header} accessibilityLabel="Header Navigation">
      <a
        style={{
          ...styles.headerLink,
          ...(router.pathname === "/me" && styles.headerSelected),
          textDecoration: "none"
        }}
        href="/me"
        onClick={() => {
          router.push("/me");
        }}
        role="link"
        aria-label="Go to Profile"
      >
        <Text style={styles.headerText}>My Profile</Text>
      </a>

      <a
        style={{
          ...styles.headerLink,
          ...((router.pathname === "/channels" || router.pathname === "/") &&
            styles.headerSelected)
        }}
        href="/channels"
        onClick={() => {
          router.push("/channels");
        }}
        role="link"
        aria-label="Go to Channels"
      >
        <Text style={styles.headerText}>Channels</Text>
      </a>
    </View>
  );
};
