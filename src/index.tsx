import * as React from "react";
import { render } from "react-dom";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  FlatList,
  TextInput,
  Button,
  TextStyle
} from "react-native-web";
import {
  BrowserRouter as Router,
  withRouter,
  Switch,
  Route
} from "react-router-dom";
import { colors } from "./theme";

type LinkProps = { href: string } & TouchableOpacityProps;
const Link: React.ComponentType<LinkProps> = props => (
  <TouchableOpacity {...props} />
);

const Header = withRouter(props => (
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
        props.history.location.pathname === "/conversations" &&
          styles.headerSelected
      ]}
      href="/conversations"
      accessible={true}
      onPress={() => {
        props.history.push("/conversations");
      }}
      accessibilityRole="link"
    >
      <Text style={styles.headerText}>Conversations</Text>
    </Link>
  </View>
));

const ConversationCard = props => {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: colors.primaryDark,
        marginBottom: 10,
        marginTop: 10,
        width: "80%",
        marginLeft: "10%"
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold", marginBottom: 5 }}>
        Peer Username
      </Text>
      <Text style={{ color: "white" }}>Last Message</Text>
    </View>
  );
};

const FlexSpacer = () => (
  <View
    style={{
      flex: 0.1
    }}
  />
);

const Conversations = () => {
  return (
    <>
      <FlatList
        inverted
        style={{
          height: "80%"
        }}
        data={Array.from({ length: 200 }, (v, i) => ({
          key: `${i}`
        }))}
        renderItem={({ item }) => <ConversationCard {...item} />}
      />
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
          placeholder={"Create a new topic"}
          style={{
            flex: 3,
            height: "50%",
            color: colors.primaryDark,
            padding: 10,
            borderRadius: 3,
            backgroundColor: "white"
          }}
          placeholderTextColor={colors.primaryOpaque(0.7)}
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
              console.warn("Creating new topic");
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
                color: "white"
              }}
            >
              Create Topic
            </Text>
          </TouchableOpacity>
        </View>
        <FlexSpacer />
      </View>
    </>
  );
};
const MyProfile = () => {
  return (
    <View>
      <Text>My profile</Text>
    </View>
  );
};
const App = () => {
  React.useEffect(() => {}, []);
  return (
    <Router>
      <View style={styles.container}>
        <Header />
        <Switch>
          <Route exact path="/me" render={() => <MyProfile />} />
          <Route exact path="/conversations" render={() => <Conversations />} />
        </Switch>
      </View>
    </Router>
  );
};

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

render(<App />, document.getElementById("root"));
