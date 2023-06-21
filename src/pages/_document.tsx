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
        <script
          type="text/javascript"
          src="https://mindpathtech-cdn.azureedge.net/chatbot/jquery.js"></script>
        <script
          type="text/javascript"
          src="https://mindpathtech-cdn.azureedge.net/chatbot/webchat.js"></script>
        
      </body>
    </Html>
  );
}
