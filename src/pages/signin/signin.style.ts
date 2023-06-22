import { Box, Button, Card,TextField, styled } from "@mui/material";

export const LoginPageWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
  height: "100vh",
  background: "#242A38",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    background: "#242A38",
    height: "100vh",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100vw",
  },
}));

export const BackgroundImage=styled(Box)(({theme})=>({transform: "scaleX(-1)",position:"absolute",left:"0",height:"100vh",width:"100vw"}))

export const BotImage = styled(Box)(({ theme }) => ({
    position: "absolute",
    right: "5%",
    bottom: "50%",
    transform:"translate(0,48%)",
    width:theme.spacing(65),
    height:theme.spacing(65),
  [theme.breakpoints.down(1450)]: {
    width:theme.spacing(56),
    height:theme.spacing(56)
  },
  [theme.breakpoints.down("lg")]: {
    width:theme.spacing(0)
  }
}));

export const LoginCard = styled(Card)(({ theme }) => ({
  width: theme.spacing(60),
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1),
  boxShadow: "0 3px 16px #32353d",
  top: "50%",
  left: "25%",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  
  [theme.breakpoints.down("lg")]: {
     left:"50%"
  },
  [theme.breakpoints.down("md")]: {
    left:"50%",
  },
  [theme.breakpoints.down("sm")]: {
    left: "50%",
    width:"75%"
  },
}));

export const LoginLogoWraper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
  paddingBottom: theme.spacing(4),
}));

export const CustomSignInButton = styled(Button)(({ theme }) => ({
  position: "relative",
  margin: "1rem auto 0",
  fontSize: theme.spacing(2),
  fontWeight: "400",
  letterSpacing: theme.spacing(0.25),
  textTransform: "inherit",
  backgroundColor: "#242A38",
  borderRadius: theme.spacing(0.5),
  width: "fit-content",
  display: "flex",
  padding : theme.spacing(0.5, 3),
   '&:hover': {
          backgroundColor: '#5b6784',
        },
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
  width: "82%",
  margin: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: {
    width:"90%"
  },
  [theme.breakpoints.down("sm")]: {
  width:"90%"
  },
                 
}));
