import React from "react";
import Image from "next/image";
import { telegram, whatsapp } from "src/assets/images";

import {
  BackgroundImageWrapper,
  BotTitle,
  WhatsappTelegramIconButton,
} from "../botComponent.style";
import WhatsapptelegramBotController from "./whatsapp-telegramBot.controller";

interface Iprops {
  name: string;
  id: string;
}

export default function WhatsappTelegramBot(props: Iprops) {
  const { getters, handlers } = WhatsapptelegramBotController(props);
  const { bot, name, botName } = getters;
  const { getRandomImage, redirectToNewTab } = handlers;

  return (
    <>
      <BotTitle variant="h6" align="center">
        {botName}
      </BotTitle>
      {bot && (
        <BackgroundImageWrapper>
          <Image
            src={bot.imagesrc === "" ? getRandomImage() : bot.imagesrc}
            alt="image"
            fill={true}
          />
          <WhatsappTelegramIconButton onClick={redirectToNewTab}>
            <Image
              src={name === "whatsappBot" ? whatsapp.src : telegram.src}
              alt={"bot"}
              fill={true}
            />
          </WhatsappTelegramIconButton>
        </BackgroundImageWrapper>
      )}
    </>
  );
}
