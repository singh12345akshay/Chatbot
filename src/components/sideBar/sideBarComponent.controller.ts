import { useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "src/store/store";

export default function SideBarComponentController() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const isSidebarOpen = useSelector((state: any) => state.isSidebarOpen);
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    setIsMobileView(isSmallScreen);
  }, [isSmallScreen]);

  const handleClickAway = () => {
    console.log("this is calling");
    dispatch(toggleSidebar());
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    router.push("/signin");
  };
  const handleClick = (url: string) => {
    router.push(url);
  };
  useEffect(() => {
    const data = localStorage.getItem("userName");
    if (data) {
      const name = JSON.parse(data);
      setUsername(name);
    }
  }, []);
  return {
    getters: {
      isLoggedIn,
      isSidebarOpen,
      username,
      isSmallScreen,
      isMobileView,
    },
    handlers: {
      handleClickAway,
      handleLogout,
      handleClick,
    },
  };
}
