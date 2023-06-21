import { useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'

import botDetail from "../../../assets/botDetail.json";
import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
} from "src/assets/bgImages";

interface Iprops {
  name: string;
  id: string;
}

interface Ibot {
  id: string;
  imagesrc: string;
  botscript: string;
}

export default function WhatsapptelegramBotController(props: Iprops) {
const { bots } = botDetail;
  const { id,name } = props;
  const key = id;
  const theme = useTheme();
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

  const redirectToNewTab = () => {
    window.open(bot?.botscript, "_blank");
  };
  const getRandomImage = () => {
    const images = [image1, image2, image3, image4, image5, image6];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };
  return {
    getters: { bot, botName, name },
    handlers: { getRandomImage, redirectToNewTab },
  };
}
