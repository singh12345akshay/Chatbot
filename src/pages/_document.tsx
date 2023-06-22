/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          type="text/javascript"
          src="https://mindpathtech-cdn.azureedge.net/chatbot/jquery.js"></Script>
        <Script
          type="text/javascript"
          src="https://mindpathtech-cdn.azureedge.net/chatbot/webchat.js"></Script>
        
      </body>
    </Html>
  );
}
