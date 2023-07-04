import {
  Box,
  Button,
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import React from "react";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import SideBarComponent from "src/components/sideBar/sideBarComponent";

import { nodatafound } from "../../assets/images";
import {
  CustomButton,
  StyledTableCell,
  CustomEditAddReqDialog,
  CustomDeleteDialog,
  CustomTableContainer,
  CustomTablePagination,
  DeleteDialogIcon,
} from "./cutomerRequest.style";
import CustomerRequestController from "./customerRequest.controller";
import { ApiResponseArray, IapiResponse } from "./interfaces";
import TablePaginationActions from "src/components/tablePagination/tablePagination";
import Head from "next/head";

function CustomerRequest() {
  const { getters, handlers } = CustomerRequestController();
  const {
    page,
    rowsPerPage,
    data,
    isEdit,
    isLoading,
    openDeleteDialog,
    selectedItem,
    dialogOpen,
    addRequestDetails,
    requestDetails,
    isApiProccesing,
  } = getters;
  const {
    addRequest,
    handleClose,
    editRequest,
    deleteRequest,
    handleChangeRowsPerPage,
    handleChangePage,
    handleDeleteClick,
    handleDeleteCancel,
    handleAdd,
    handleAddDescriptionChange,
    handleAddStatusChange,
    handleEdit,
    handleDescriptionChange,
    handleStatusChange,
    autoPageChange,
  } = handlers;

  const getChipColor = (status: string) => {
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
    <>
      <Head>
        <title>Mindpath ChatBot App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBarComponent>
        <>
          <Box
            sx={{
              textAlign: "right",
              marginBottom: "16px",
            }}
          >
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={() => {
                handleAdd();
              }}
              color="primary"
              sx={{ textTransform: "Capitalize", fontWeight: "700" }}
            >
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
              }}
            >
              Clear All
            </Button>
          </Box>
          <CustomTableContainer>
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
                      position="relative"
                    >
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
                              style={CustomButton}
                              onClick={() => {
                                handleEdit(data);
                              }}
                            >
                              <EditIcon sx={{ fontSize: "20px" }} />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Delete" arrow followCursor>
                            <Button
                              style={CustomButton}
                              onClick={() => {
                                handleDeleteClick(data);
                              }}
                            >
                              <DeleteIcon sx={{ fontSize: "20px" }} />
                            </Button>
                          </Tooltip>
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter
                    style={{ position: "sticky", bottom: "0", zIndex: 100 }}
                  >
                    <TableRow>
                      <CustomTablePagination
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
                        sx={{}}
                      />
                    </TableRow>
                  </TableFooter>
                </>
              )}
            </Table>
          </CustomTableContainer>
          <CustomEditAddReqDialog open={dialogOpen} onClose={handleClose}>
            <DialogTitle
              style={{
                textAlign: "center",
                fontSize: "22px",
                fontWeight: "700",
              }}
            >
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
                  fullWidth
                >
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
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={handleClose}
                sx={{
                  fontWeight: "700",
                  margin: "10px",
                  textTransform: "Capitalize",
                }}
              >
                Cancel
              </Button>
              {isEdit ? (
                <Button
                  variant="contained"
                  color="success"
                  disabled={isApiProccesing}
                  onClick={() => {
                    editRequest(requestDetails);
                  }}
                  sx={{
                    fontWeight: "700",
                    margin: "10px",
                    textTransform: "Capitalize",
                  }}
                >
                  Update
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  disabled={isApiProccesing}
                  onClick={() => {
                    addRequest(addRequestDetails);
                  }}
                  sx={{
                    fontWeight: "700",
                    margin: "10px",
                    textTransform: "Capitalize",
                  }}
                >
                  Add
                </Button>
              )}
            </DialogActions>
          </CustomEditAddReqDialog>
          <CustomDeleteDialog
            open={openDeleteDialog}
            onClose={handleDeleteCancel}
          >
            <DialogTitle>
              <DeleteDialogIcon>
                <DeleteIcon sx={{ fontSize: "44px" }} />
              </DeleteDialogIcon>
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
              }}
            >
              <Button
                variant="contained"
                onClick={handleDeleteCancel}
                color="error"
                sx={{
                  fontWeight: "700",
                  margin: "15px",
                  textTransform: "Capitalize",
                }}
              >
                No
              </Button>

              <Button
                variant="contained"
                disabled={isApiProccesing}
                onClick={async () => {
                  await deleteRequest(
                    selectedItem as IapiResponse | ApiResponseArray
                  );
                  autoPageChange();
                }}
                color="success"
                sx={{
                  fontWeight: "700",
                  margin: "15px",
                  textTransform: "Capitalize",
                }}
              >
                Yes
              </Button>
            </DialogActions>
          </CustomDeleteDialog>
        </>
      </SideBarComponent>
    </>
  );
}

export default CustomerRequest;
