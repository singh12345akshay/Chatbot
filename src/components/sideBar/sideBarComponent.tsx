import React from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Tooltip,
  IconButton,
  Drawer,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";

import { ebotifylogo, userpic, ebotifyMiniIcon, botMiniIcon } from "src/assets";
import { toggleSidebar } from "../../store/store";

import {
  DrawerHeader,
  WhiteLogoutIcon,
  drawerWidth,
  CustomDrawer,
  Main,
  AppBar,
  CustomToolbar,
  UserdetailContainer,
  DrawerContainer,
  CustomListItemIcon,
} from "./sideBarComponent.style";
import SideBarComponentController from "./sideBarComponent.controller";

interface SideBarComponentProps {
  children: React.ReactNode;
}

export default function SideBarComponent({ children }: SideBarComponentProps) {
  const { getters, handlers } = SideBarComponentController();
  const dispatch = useDispatch();
  const { isLoggedIn, isSidebarOpen, username, isSmallScreen, isMobileView } =
    getters;
  const { handleClickAway, handleLogout, handleClick } = handlers;

  const drawerContent = (
    <DrawerContainer>
      <DrawerHeader>
        <Box paddingY={1}>
          {isSidebarOpen ? (
            <Image
              src={ebotifylogo.src}
              alt={"Company image"}
              width={133}
              height={45}
            />
          ) : (
            <Image
              src={ebotifyMiniIcon.src}
              alt={"Company image"}
              width={50}
              height={45}
            />
          )}
        </Box>
      </DrawerHeader>
      <List sx={{ flexGrow: 1 }}>
        {["Bot"].map((text) => (
          <ListItem
            key={text}
            disablePadding
            sx={{ bgcolor: "#0b0c0e61", color: "white" }}>
            {isSidebarOpen ? (
              <ListItemButton
                onClick={() => {
                  handleClick("/home");
                }}>
                <CustomListItemIcon open={isSidebarOpen}>
                  <Image
                    src={botMiniIcon.src}
                    alt={"Company image"}
                    width={40}
                    height={40}
                  />
                </CustomListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: isSidebarOpen ? 1 : 0 }}
                />
              </ListItemButton>
            ) : (
              <Tooltip title="Bots" arrow >
                <Button
                  onClick={() => {
                    handleClick("/home");
                  }}>
                  <Image
                    src={botMiniIcon.src}
                    alt={"Company image"}
                    width={40}
                    height={40}
                  />
                </Button>
              </Tooltip>
            )}
          </ListItem>
        ))}
      </List>

      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        {isSidebarOpen ? (
          <Button
            variant="contained"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              bgcolor: "#5052ff",
              borderRadius: 7,
            }}>
            <Typography variant="button" sx={{ marginLeft: "8px" }}>
              LOGOUT
            </Typography>
          </Button>
        ) : (
          <Button
            onClick={handleLogout}
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}>
            <WhiteLogoutIcon />
          </Button>
        )}
      </div>
    </DrawerContainer>
  );
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" open={isSidebarOpen}>
          <CustomToolbar>
            {!isSidebarOpen ? (
              <IconButton onClick={() => dispatch(toggleSidebar())}>
                <MenuIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => dispatch(toggleSidebar())}>
                <ChevronLeftIcon />
              </IconButton>
            )}
            <UserdetailContainer>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                align="center"
                style={{
                  fontSize: isMobileView ? 14 : 17,
                  paddingRight: "8px",
                }}>
                Ebotify | {username}
              </Typography>
              <Image
                src={userpic.src}
                alt={"user image"}
                width={isMobileView ? 40 : 50}
                height={isMobileView ? 40 : 50}></Image>
            </UserdetailContainer>
          </CustomToolbar>
        </AppBar>
        {isMobileView ? (
          <Drawer
            anchor="left"
            open={isSidebarOpen}
            onClose={handleClickAway}
            PaperProps={{
              style: {
                backgroundColor: "#242a38",
                width: drawerWidth,
              },
            }}>
            {drawerContent}
          </Drawer>
        ) : (
          <CustomDrawer
            variant="permanent"
            open={isSidebarOpen}
            onClose={handleClickAway}>
            {drawerContent}
          </CustomDrawer>
        )}
        <Main component="main">{children}</Main>
      </Box>
    </>
  );
}
