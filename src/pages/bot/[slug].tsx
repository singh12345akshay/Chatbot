import React from "react";
import { useRouter } from "next/router";

import SideBarComponent from "src/components/sideBar/sideBarComponent";
import BotPageComponent from "src/components/botComponent/webBot/webbotPageComponent";
import WhatsappTelegramBot from "src/components/botComponent/whatsapp-telegramBot/whatsapp-telegramBot";
import FacebookBot from "src/components/botComponent/facebookBot/facebookBot";
import botDetail from "../../assets/botDetail.json";
import Head from "next/head";

declare global {
  interface Window {
    initPayload: string;
    metadata: Record<string, any>;
  }
}

export default function EstateBot() {
  const router = useRouter();
  const { slug } = router.query;
  const slugString = slug as string;
  const { bots } = botDetail;
  const getBotTypeById = (slugString: string) => {
    const foundObject = bots.find((obj) => obj.id === slugString);
    return foundObject?.type;
  };

  const botType = getBotTypeById(slugString);

  if (botType === "customerRequest") {
    router.replace("/customerRequest");
    return <></>;
  } else if (botType === "signup") {
    router.replace("/manageUser");
    return <></>;
  } else if (botType === "whatsappBot" || botType === "telegramBot") {
    return (
      <>
        <Head>
          <title>Mindpath ChatBot App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <SideBarComponent>
          <WhatsappTelegramBot name={botType} id={slugString} />
        </SideBarComponent>
      </>
    );
  } else if (botType === "facebookBot") {
    return (
      <>
        <Head>
          <title>Mindpath ChatBot App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <SideBarComponent>
          <FacebookBot id={slugString} />
        </SideBarComponent>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Mindpath ChatBot App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBarComponent>
        {slugString && <BotPageComponent id={slugString} />}
      </SideBarComponent>
    </>
  );
}
