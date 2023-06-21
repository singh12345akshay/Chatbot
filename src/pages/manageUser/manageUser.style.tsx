import { Box, Button, Card, styled } from "@mui/material";

export const LoginCard = styled(Card)(({ theme }) => ({
  width: theme.spacing(60),
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[1],
  top: "50%",
  left: "50%",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  [theme.breakpoints.down("lg")]: {
     left:"50%",
     width:"50%"
  },
  [theme.breakpoints.down("md")]: {
    left:"50%",
  },
  [theme.breakpoints.down("sm")]: {
    left: "50%",
    width:"75%"
  },
}));

export const LoginPageWrapper = styled(Box)(({ theme }) => ({
  height:"100%",
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
  },
  [theme.breakpoints.down("sm")]: {
  },
}));

export const CustomSignInButton = styled(Button)(({ theme }) => ({
  position: "relative",
  margin: "1rem auto 0",
  fontSize: theme.spacing(2),
  fontWeight: "400",
  letterSpacing: theme.spacing(0.25),
  textTransform: "inherit",
  backgroundColor: "#5207d6",
  borderRadius: theme.spacing(0.5),
  width: "fit-content",
  display: "flex",
}));
