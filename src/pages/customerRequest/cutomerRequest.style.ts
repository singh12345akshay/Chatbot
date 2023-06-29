import {
  Button,
  ButtonBase,
  Dialog,
  Theme,
  IconButton,
  TableCell,
  TableContainer,
  styled,
  tableCellClasses,
  TablePagination,
  Box,
} from "@mui/material";

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

export const CustomButton={
    padding: "8px",
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "transparent",
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    color: "rgb(209, 213, 219)",
    borderRadius: "8px",
    fontSize: "1.125rem",
}
export const StyledButton = styled(Button)(() => ({
  [`&.${ButtonBase}`]: {
    padding: "8px",
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "transparent",
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    color: "rgb(209, 213, 219)",
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

export const CustomTableContainer = styled(TableContainer)(({theme}) => ({
    maxHeight: "calc(100vh - 175px)",
    [theme.breakpoints.up("sm")]: {
      overflow: "auto",
      position: "relative",
    },
    [theme.breakpoints.down("sm")]: {
      position: "fixed",
      width: "100%",
      overflow: "auto",
      whiteSpace: "nowrap",
    },
}));

export const CustomTablePagination =styled(TablePagination)(()=>({
  backgroundColor: "rgb(17, 24, 39)",
  borderTop: "1px solid rgb(45, 55, 72)",
  color: "rgb(237, 242, 247)",
  "& .MuiSvgIcon-root": {
    color: "white", 
  },
  "& .MuiTablePagination-menuItem": {
    backgroundColor: "#111827",
    priority: 1000,
    textAlign: "center",
    color: "black",
  },
  "& .MuiTablePagination-root": {
    borderRadius: "5px",
    backgroundColor: "#111827",
  },
}))
export const DeleteDialogIcon=styled(Box)(({})=>({
  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  border: "1px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "5px auto",
}))
