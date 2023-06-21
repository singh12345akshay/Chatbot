import {
  Box,
  Button,
  ButtonBase,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  ThemeProvider,
  TextField,
  Typography,
  styled,
  tableCellClasses,
  Tooltip,
  useMediaQuery
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { createTheme } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import axios from "axios";
import React, { useState,useEffect, ChangeEvent } from "react";
import { useTheme } from '@mui/material/styles';
import Image from "next/image";
import SideBarComponent from "src/components/sideBar/sideBarComponent";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useSnackbar } from "notistack";
import {nodatafound} from "../../assets/images";
import { StyledIconButton, StyledTableCell, CustomEditAddReqDialog, CustomDeleteDialog } from "./cutomerRequest.style";




interface IapiResponse {
  status: string;
  _id: string;
  description: string;
  requestId: string;
}
interface ApiResponseArray extends Array<IapiResponse> { }

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps): JSX.Element {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };    

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
console.log(page)
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <StyledIconButton
        onClick={handleFirstPageButtonClick}
        disabled={page <= 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </StyledIconButton>
      <StyledIconButton
        onClick={handleBackButtonClick}
        disabled={page <= 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </StyledIconButton>
      <StyledIconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </StyledIconButton>
      <StyledIconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </StyledIconButton>
    </Box>
  );
}
export default function CustomerRequest() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit]=useState(false)
  const [isLoading, setIsLoading] = useState(true);
   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const theme = useTheme();
   const [addRequestDetails, setAddRequestDetails]=useState({
    description:"",
    status:""
   })
  const [requestDetails, setRequestDetails] = useState({
    id: "",
    description: "",
    status: "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
 const handleDeleteClick = (data:IapiResponse | ApiResponseArray ) => {
    setSelectedItem(data);
    setOpenDeleteDialog(true);
  };
   const handleDeleteCancel = () => {
    setSelectedItem({})
    setOpenDeleteDialog(false);
  };
const handleAdd=()=>{
  setDialogOpen(true)
  setAddRequestDetails({
        description:"",
        status:""
      })
  
}
  const handleAddDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddRequestDetails({
      description: event.target.value,
      status: addRequestDetails.status,
    });
  }
    const handleAddStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
      setAddRequestDetails({
        description: addRequestDetails.description,
        status: event.target.value,
      });
    };
    const handleEdit = (data: IapiResponse) => {
      setIsEdit(true)
      setRequestDetails({
        id: data._id,
        description: data.description,
        status: data.status,
      });
      setDialogOpen(true);
    };
    const handleClose = () => {
      setDialogOpen(false);
      setIsEdit(false)
      
    };
    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
      setRequestDetails({
        id: requestDetails.id,
        description: event.target.value,
        status: requestDetails.status,
      });
    };
    const handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
      setRequestDetails({
        id: requestDetails.id,
        description: requestDetails.description,
        status: event.target.value,
      });
    };

    const fetchData = async () => {
      const storedData = localStorage.getItem("authToken");

      if (storedData) {
        const authToken = JSON.parse(storedData);
        try {
          // Make a GET request to the API endpoint
          const response = await axios.get(
            "https://chatbotapps.mindpath.tech/api/v1/request/request",
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          setData(response.data.body);
          setIsLoading(false);
          //   const data= response.data.body;
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      }
    };
    useEffect(() => {
      fetchData();
      setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    }, []);

const autoPageChange=async ()=>{
  if(data.length){
    if(data.length % rowsPerPage-1===0 && page>=1){
      setPage(page-1)
    }
  }
}
  const addRequest = async (data) => {
      
      const payload = {
        description: data.description,
        status: data.status,
      };
      console.log(payload)
      const storedData = localStorage.getItem("authToken");
      if (storedData) {
        const authToken = JSON.parse(storedData);

        const response = await fetch(
          "https://chatbotapps.mindpath.tech/api/v1/request/request",
          {
            method: "POST", // or 'PUT' depending on your API
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(payload),
          }
        );
        if (response.ok) {
          fetchData();
          enqueueSnackbar("Request Added successfully !!", {
            variant: "success",
            autoHideDuration: 2500,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        } else {
          enqueueSnackbar("Request Failed !!", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        }
        setDialogOpen(false)
      }
    }
    const editRequest = async (data: IapiResponse) => {
      const payload = {
        description: data.description,
        status: data.status,
        id: data.id,
      };
      const storedData = localStorage.getItem("authToken");
      if (storedData) {
        const authToken = JSON.parse(storedData);

        const response = await fetch(
          "https://chatbotapps.mindpath.tech/api/v1/request/editrequest",
          {
            method: "PUT", // or 'PUT' depending on your API
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(payload),
          }
        );
        console.log(response);
        if (response.ok) {
          fetchData();
          enqueueSnackbar("Request Updated successfully ", {
            variant: "success",
            autoHideDuration: 2500,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        } else {
          enqueueSnackbar("Request Updation Failed !!", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          console.error("Update failed");
        }

        setDialogOpen(false);
        setIsEdit(false)
      }
    };

    const deleteRequest = async (data:IapiResponse | ApiResponseArray) => {
      const payload = {
        requestIdList: [],
      };
      if(Array.isArray(data)){
        data.forEach((data) => {
          payload.requestIdList.push(data._id)
      // Process each object in the array
      // ...
    });
      }else if (typeof data === 'object') {
        payload.requestIdList.push(data._id)
    // Handle single object
    // Process the single object
    // ...r
  } else {
    // Invalid argument type
    console.error('Invalid argument type. Expected object or array of objects.');
  }
      
      const storedData = localStorage.getItem("authToken");
      if (storedData) {
        const authToken = JSON.parse(storedData);

        const response = await fetch(
          "https://chatbotapps.mindpath.tech/api/v1/request/deleteRequest",
          {
            method: "DELETE", // or 'PUT' depending on your API
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(payload),
          }
        );
        if (response.ok) {
          await fetchData();
          enqueueSnackbar("Deleted successfully ", {
            variant: "success",
            autoHideDuration: 2500,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        } else {
          enqueueSnackbar("Try Again !!", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          console.error("Update failed");
        
        }
        setSelectedItem({})
        setOpenDeleteDialog(false)
      }
    };
    const buttonstyle = {
      minWidth: "auto",
      padding: "8px",
      display: "inline-flex",
      alignItems: "center",
      backgroundColor: "transparent",
      transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      color: "rgb(209, 213, 219)",
      borderRadius: "8px",
      fontSize: "1rem",
    };

    const getChipColor = (status:string) => {
      status = status.toLowerCase();
      switch (status) {
        case "new":
          return "primary";
        case "inprogress":
          return "warning";
        case "completed":
          return "success";
        default:
          return "default";
      }
    };

    const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
    // console.log(data)
     if (isLoading) {
    return (
      <div>
        <SideBarComponent>
          <></>
        </SideBarComponent>
      </div>
    );
  }
    return (
      <SideBarComponent>
        <>
          <Box
            sx={{
              textAlign: "right",
              marginBottom: "16px",
            }}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => {
                handleAdd();
              }}
              color="primary"
              sx={{ textTransform: "Capitalize", fontWeight: "700" }}>
              Add Request
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              disabled={!data.length}
              onClick={() => {
                handleDeleteClick(data);
              }}
              color="primary"
              sx={{
                marginLeft: "10px",
                textTransform: "Capitalize",
                fontWeight: "700",
              }}>
              Clear All
            </Button>
          </Box>
          <TableContainer
            sx={{
              maxHeight: "calc(100vh - 175px)",
              [theme.breakpoints.up('sm')]:{
              overflow: "auto",
              position: "relative"},
              [theme.breakpoints.down('sm')]: {
               position:"fixed",
               width:"100%",
              overflow: "auto",
              whiteSpace:"nowrap"
              },
            }}>
            <Table aria-label="simple table">
              <TableHead style={{ position: "sticky", top: "0", zIndex: 100 }}>
                <TableRow sx={{ backgroundColor: "#242A38", color: "white" }}>
                  <StyledTableCell>Request ID</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              {data.length === 0 ? (
                <TableRow sx={{ backgroundColor: "#111827", color: "white" }}>
                  <TableCell colSpan={4}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height={350}
                      fontWeight="bold"
                      fontSize={20}
                      position="relative">
                      <Image
                        src={nodatafound.src}
                        alt={"No Data Found"}
                        fill={true}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? data.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : data
                    ).map((data: IapiResponse) => (
                      <TableRow key={data._id}>
                        <StyledTableCell component="th" scope="row">
                          {data.requestId}
                        </StyledTableCell>
                        <StyledTableCell>{data.description}</StyledTableCell>
                        <StyledTableCell>
                          <Chip
                            label={data.status}
                            variant="outlined"
                            color={getChipColor(data.status)}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          <Tooltip title="Edit" arrow followCursor>
                            <Button
                              style={buttonstyle}
                              onClick={() => {
                                handleEdit(data);
                              }}>
                              <EditIcon sx={{ fontSize: "20px" }} />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Delete" arrow followCursor>
                            <Button
                              style={buttonstyle}
                              onClick={() => {
                                handleDeleteClick(data);
                              }}>
                              <DeleteIcon sx={{ fontSize: "20px" }} />
                            </Button>
                          </Tooltip>
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter
                    style={{ position: "sticky", bottom: "0", zIndex: 100 }}>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={5}
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          sx: {},
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                        sx={{
                          backgroundColor: "rgb(17, 24, 39)",
                          borderTop: "1px solid rgb(45, 55, 72)",
                          color: "rgb(237, 242, 247)",
                          "& .MuiSvgIcon-root": {
                            color: "white", // Change the color to any desired color
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
                        }}
                      />
                    </TableRow>
                  </TableFooter>
                </>
              )}
            </Table>
          </TableContainer>
          <CustomEditAddReqDialog open={dialogOpen} onClose={handleClose}>
            <DialogTitle
              style={{
                textAlign: "center",
                fontSize: "22px",
                fontWeight: "700",
              }}>
              {isEdit ? "Edit Request" : "Add Request"}
            </DialogTitle>
            <DialogContent sx={{ padding: "15px" }}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={5}
                label="Description"
                value={
                  isEdit
                    ? requestDetails.description
                    : addRequestDetails.description
                }
                onChange={
                  isEdit ? handleDescriptionChange : handleAddDescriptionChange
                }
                fullWidth
                sx={{ margin: "8px 0px" }}
              />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={
                    isEdit ? requestDetails.status : addRequestDetails.status
                  }
                  label="Status"
                  onChange={isEdit ? handleStatusChange : handleAddStatusChange}
                  fullWidth>
                  <MenuItem value="NEW">NEW</MenuItem>
                  <MenuItem value="INPROGRESS">INPROGRESS</MenuItem>
                  <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
              }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleClose}
                sx={{
                  fontWeight: "700",
                  margin: "10px",
                  textTransform: "Capitalize",
                }}>
                Cancel
              </Button>
              {isEdit ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    editRequest(requestDetails);
                  }}
                  sx={{
                    fontWeight: "700",
                    margin: "10px",
                    textTransform: "Capitalize",
                  }}>
                  Update
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    addRequest(addRequestDetails);
                  }}
                  sx={{
                    fontWeight: "700",
                    margin: "10px",
                    textTransform: "Capitalize",
                  }}>
                  Add
                </Button>
              )}
            </DialogActions>
          </CustomEditAddReqDialog>
          <CustomDeleteDialog
            open={openDeleteDialog}
            onClose={handleDeleteCancel}>
            <DialogTitle>
              <Box
                sx={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  border: "1px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "5px auto",
                }}>
                <DeleteIcon sx={{ fontSize: "44px" }} />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography sx={{ textAlign: "center", fontSize: "20px" }}>
                Are you sure you want to delete ?
              </Typography>
            </DialogContent>
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
              }}>
              <Button
                variant="contained"
                onClick={handleDeleteCancel}
                color="error"
                sx={{
                  fontWeight: "700",
                  margin: "15px",
                  textTransform: "Capitalize",
                }}>
                No
              </Button>

              <Button
                variant="contained"
                onClick={async () => {
                  await deleteRequest(selectedItem);
                  autoPageChange();
                }}
                color="success"
                sx={{
                  fontWeight: "700",
                  margin: "15px",
                  textTransform: "Capitalize",
                }}>
                Yes
              </Button>
            </DialogActions>
          </CustomDeleteDialog>
        </>
      </SideBarComponent>
    );
  }
