import {
  Box,
  CSSObject,
  ListItemIcon,
  Theme,
  styled,
  Drawer,
  Toolbar,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

export const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#242a38",
  [theme.breakpoints.down("sm")]: {
    width: drawerWidth,
    position: "fixed", // Position the drawer
    top: 0, // Position from top
    bottom: 0, // Position from bottom
    zIndex: theme.zIndex.drawer + 2,
  },
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  [theme.breakpoints.down("sm")]: {
    width: "0",
  },
  backgroundColor: "#242a38",
});

export const CustomDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  }),
  ...(!open && {
    width: `calc(100% - ${closedMixin(theme).width})`,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  }),
  backgroundColor: "white",
  color: "black",
}));

export const Main = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  paddingTop: theme.spacing(4),
  backgroundColor: "#f1f1f1",
  minHeight: `calc(100vh - ${theme.spacing(13)})`,
  height: "auto", // Use the height of the AppBar as margin top
  marginTop: theme.mixins.toolbar.minHeight, // Use the height of the AppBar as margin top
}));

export const WhiteLogoutIcon = styled(LogoutIcon)({
  color: "white",
});

export const CustomToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const UserdetailContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const DrawerContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

export const CustomListItemIcon = styled(ListItemIcon, {
    shouldForwardProp: (prop) => prop !== "open",
})<{open?:boolean }>(({ open }) => ({
  mr: open ? 0.5 : "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));