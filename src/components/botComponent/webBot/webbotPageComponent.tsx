import React from "react";
import Image from "next/image";

import { BackgroundImageWrapper, BotTitle } from "../botComponent.style";
import WebbotPageComponentController, {  Iprops } from "./webbotPageComponent.controller";

export default function BotPageComponent(props: Iprops) {
  const { getters, handlers } = WebbotPageComponentController(props);
  const { bot, botName } = getters;
  const { getRandomImage } = handlers;

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
        </BackgroundImageWrapper>
      )}
      <div id="chatbot"></div>
    </>
  );
}
