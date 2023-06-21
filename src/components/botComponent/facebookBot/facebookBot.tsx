import React, { useEffect, useState } from "react";
import { FacebookProvider, CustomChat } from "react-facebook";
import Image from "next/image";
import { Typography, Box, useTheme } from "@mui/material";

import botDetail from "../../../assets/botDetail.json";
import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
} from "src/assets/bgImages";
import { BotTitle, BackgroundImageWrapper } from "../botComponent.style";

interface Iprops {
  id: string;
}

interface Ibot {
  id: string;
  type: string;
  imagesrc: string;
  botscript: string;
}
export default function FacebookBot(props: Iprops) {
  const { id } = props;
  const theme = useTheme();
  const { bots } = botDetail;
  const key = id;
  const [bot, setBot] = useState<Ibot>();
  const [botName, setBotName] = useState("");

  function getRandomImage() {
    const images = [image1, image2, image3, image4, image5, image6];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }

  useEffect(() => {
    const storageData = localStorage.getItem("botList");
    if (storageData) {
      const botList = JSON.parse(storageData);
      const desiredObj = botList.find((obj: any) => obj._id === key);
      if (desiredObj) {
        setBotName(desiredObj.name);
      }
    }
  }, []);

  useEffect(() => {
    const obj = bots.find((obj: Ibot) => obj.id === key);
    setBot(obj);
  }, [bots, key]);
  //     const customChatProps = {
  //     pageId: "101859349483453",
  //     htmlRef: "https://chatbotapps.mindpath.tech/login"
  //   };
  return (
    <>
      <BotTitle variant="h6" align="center" gutterBottom>
        {botName}
      </BotTitle>
      {bot && (
        <BackgroundImageWrapper>
          <Image
            src={bot.imagesrc === "" ? getRandomImage() : bot.imagesrc}
            alt="image"
            fill={true}
          />
        </BackgroundImageWrapper>
      )}
      {/* <MessengerCustomerChat
                        pageId="101859349483453"
                        appId="881543989662726"
                        htmlRef="https://chatbotapps.mindpath.tech/login"
                    /> */}
      <FacebookProvider appId="3661120750634145">
        <CustomChat pageId="114508394010707" minimized={false} />
      </FacebookProvider>
      {/* <div id="chatbot"></div> */}
    </>
  );
}
