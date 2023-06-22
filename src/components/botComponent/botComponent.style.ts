import { Typography, styled, Box, Button } from "@mui/material";

export const BotTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  fontSize: theme.spacing(2.5),
  fontWeight: 700,
  textOverflow: "ellipsis",
}));

export const BackgroundImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "auto",
  height: `calc(100vh - ${theme.spacing(17.5)})`,
}));

export const WhatsappTelegramIconButton = styled(Button)(({ theme }) => ({
  minWidth: 0,
  position: "absolute",
  bottom: theme.spacing(2.5),
  right: theme.spacing(2.5),
  width: theme.spacing(6.25),
  height: theme.spacing(6.25),
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));