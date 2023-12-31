import React from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import Typography from "@mui/material/Typography";
import {
  Box,
  CardActionArea,
  CardContent,
  Grid,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { cardlogo, search } from "../../assets/images";
import SideBarComponent from "../../components/sideBar/sideBarComponent";

import HomeController from "./home.controller";
import {
  BotCard,
  BotCardLogo,
  BotCardTitle,
  HeaderTitle,
  PageHeader,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  SearchNotFoundImg,
  SearchNotfoundWrapper,
} from "./home.style";

export default function Home() {
  const { getters, handlers } = HomeController();
  const { bot, loading, searchText, searchResults } = getters;
  const { handleSearch } = handlers;
  const itemsToRender = searchText.trim() === "" ? bot : searchResults;
  const placeholderData = Array.from({ length: 24 }, (_, index) => index);
  return (
    <>
      <Head>
        <title>Mindpath ChatBot App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBarComponent>
        <>
          <PageHeader>
            <HeaderTitle>
              <Typography
                variant="h6"
                component="div"
                align="center"
                style={{
                  fontWeight: 700,
                }}>
                BOTS
              </Typography>
            </HeaderTitle>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={searchText}
                onChange={handleSearch}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </PageHeader>
          <Box>
            <Grid container spacing={3}>
              {loading ? (
                placeholderData.map((index) => {
                  return (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                      <BotCard key={index}>
                        <BotCardLogo>
                          <Skeleton
                            variant="circular"
                            animation="wave"
                            width={85}
                            height={85}
                          />
                        </BotCardLogo>
                        <CardContent>
                          <BotCardTitle gutterBottom>
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width={400}
                              height={35}
                            />
                          </BotCardTitle>
                        </CardContent>
                      </BotCard>
                    </Grid>
                  );
                })
              ) : itemsToRender.length ? (
                itemsToRender.map((bot, index) => {
                  return (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                      <Link
                        href={`/bot/${bot._id}`}
                        style={{ textDecoration: "none" }}>
                        <BotCard>
                          <CardActionArea>
                            <BotCardLogo>
                              <Image
                                src={cardlogo.src}
                                alt={"Card Logo"}
                                width={cardlogo.width}
                                height={cardlogo.height}
                              />
                            </BotCardLogo>
                            <CardContent>
                              <BotCardTitle gutterBottom variant="h6">
                                {bot.name}
                              </BotCardTitle>
                            </CardContent>
                          </CardActionArea>
                        </BotCard>
                      </Link>
                    </Grid>
                  );
                })
              ) : (
                <SearchNotfoundWrapper>
                  <SearchNotFoundImg>
                    <Image src={search.src} alt="search Result" fill={true} />
                  </SearchNotFoundImg>
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h6"
                    style={{ fontWeight: 700 }}>
                    No result for &quot;{searchText}&quot;
                  </Typography>
                </SearchNotfoundWrapper>
              )}
            </Grid>
          </Box>
        </>
      </SideBarComponent>
    </>
  );
}
