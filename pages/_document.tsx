import Document, { Head, Main, NextScript } from "next/document";
import React from "react";
import { AppRegistry } from "react-native-web";

// Force Next-generated DOM elements to fill their parent's height
const normalizeNextElements = `
  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }: { renderPage: Function }) {
    AppRegistry.registerComponent("Main", () => Main);
    //@ts-ignore Cheating because of lack of react-native-web types
    const { getStyleElement } = AppRegistry.getApplication("Main");
    const page = renderPage();
    const styles = [
      <style dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />,
      getStyleElement()
    ];
    return { ...page, styles: React.Children.toArray(styles) };
  }

  render() {
    return (
      <html style={{ height: "100%" }} lang="en">
        <Head>
          {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/manifest.json" />
          <link
            rel="mask-icon"
            href="/static/safari-pinned-tab.svg"
            color="black"
          />
          <meta name="msapplication-TileColor" content="black" />
          <meta name="theme-color" content="black" />
          <meta
            name="Description"
            content="Public group chat room built with AWS Amplify."
          />
        </Head>
        <body style={{ height: "100%", overflow: "hidden" }}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
