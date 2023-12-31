import React from "react";
import Head from "next/head";
import Image from "next/image";

import { Box } from "@mui/material";

import { ebotifyLogo, backgroundImage, login } from "../../assets/images";

import SigninController from "./signin.controller";
import {
  LoginCard,
  LoginLogoWraper,
  LoginPageWrapper,
  BotImage,
  CustomTextField,
  CustomSignInButton,
  BackgroundImage,
} from "./signin.style";

export default function Signin() {
  const { getters, handlers } = SigninController();
  const {
    email,
    password,
    emailHelpertext,
    passwordHelpertext,
    isApiPending,
  } = getters;
  const {
    validateEmail,
    handleSubmit,
    validatePassword,
  } = handlers;
  return (
    <>
      <LoginPageWrapper>
        <Head>
          <title>ChatBot App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box>
          <BackgroundImage>
            <Image
              src={backgroundImage.src}
              alt={"background image"}
              fill={true}
            />
          </BackgroundImage>
          <BotImage>
            <Image src={login.src} alt={"background image"} fill={true} />
          </BotImage>
          <LoginCard>
            <LoginLogoWraper>
              <Image
                src={ebotifyLogo.src}
                alt={"Company image"}
                width={133}
                height={54}
              />
            </LoginLogoWraper>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CustomTextField
                id="email"
                label="Email"
                variant="standard"
                onChange={validateEmail}
                value={email.value}
                error={!email.isValid}
                helperText={emailHelpertext}
              />
              <CustomTextField
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                fullWidth
                onChange={validatePassword}
                value={password.value}
                error={!password.isValid}
                helperText={passwordHelpertext}
              />
            </Box>
            <Box>
              <CustomSignInButton
                variant="contained"
                type="submit"
                onClick={handleSubmit}
                disabled={
                  !isApiPending && email.isValid && password.isValid
                    ? false
                    : true
                }
              >
                Sign In
              </CustomSignInButton>
            </Box>
          </LoginCard>
        </Box>
      </LoginPageWrapper>
    </>
  );
}
