import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";

import botDetail from "../../../assets/botDetail.json";
import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
} from "src/assets/bgImages";

export interface Iprops {
  id: string;
}
export interface Ibot {
  id: string;
  type: string;
  imagesrc: string;
  botscript: string;
}

export default function WebbotPageComponentController(props: Iprops) {
  const { id } = props;
  const theme = useTheme();
  const { bots } = botDetail;
  const key = id;
  const [bot, setBot] = useState<Ibot>();
  const [botName, setBotName] = useState("");

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

  useEffect(() => {
    if (bot) {
      window.initPayload = "hi";
      window.metadata = {};
      const script = document.createElement("script");
      script.src = bot.botscript;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [bot]);

  const getRandomImage = () => {
    const images = [image1, image2, image3, image4, image5, image6];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };
  return {
    getters: { bot, botName },
    handlers: { getRandomImage },
  };
}
