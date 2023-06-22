import { Button, ButtonBase, Dialog, IconButton, TableCell, styled, tableCellClasses } from "@mui/material";

export const CustomEditAddReqDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    [theme.breakpoints.up("md")]: {
      minWidth: "800px",
    },
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
  },
}));
export const CustomDeleteDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    [theme.breakpoints.up("sm")]: {
      minWidth: "550px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
}));
export const styledButton = styled(Button)(() => ({
  [`&.${ButtonBase}`]: {
    padding: "8px",
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "transparent",
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    color: "white",
    borderRadius: "8px",
    fontSize: "1.125rem",
  },
}));

export const StyledTableCell = styled(TableCell)(() => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#242A38",
    fontSize: 16,
    fontWeigth: 700,
    letterSpacing: 0.5,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "rgb(17, 24, 39)",
  },
  color: "rgb(209, 213, 219)",
  borderBottom: "1px solid rgb(45, 55, 72)",
  minWidth: "120px",
  maxWidth: "600px",
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  // "&[disabled]": {
  //   color: "red"
  // },
  // // color: "white",
}));
