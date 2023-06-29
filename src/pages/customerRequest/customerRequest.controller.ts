import { useTheme } from "@emotion/react";
import { SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IUpdateRequest, IRequestData, IapiResponse, ApiResponseArray } from "./interfaces";

export default function CustomerRequestController() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addRequestDetails, setAddRequestDetails] = useState({
    description: "",
    status: "",
  });
  const [requestDetails, setRequestDetails] = useState<IUpdateRequest>({
    id: "",
    description: "",
    status: "",
  });
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

  const addRequest = async (data: IRequestData) => {
    const payload = {
      description: data.description,
      status: data.status,
    };
    console.log(payload);
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
      setDialogOpen(false);
    }
  };

  const editRequest = async (data: IUpdateRequest) => {
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
      setIsEdit(false);
    }
  };

  const deleteRequest = async (data: IapiResponse | ApiResponseArray) => {
    const payload: { requestIdList: Array<string> } = {
      requestIdList: [],
    };
    if (Array.isArray(data)) {
      data.forEach((data) => {
        payload.requestIdList.push(data._id);
        // Process each object in the array
        // ...
      });
    } else if (typeof data === "object") {
      payload.requestIdList.push(data._id);
      // Handle single object
      // Process the single object
      // ...r
    } else {
      // Invalid argument type
      console.error(
        "Invalid argument type. Expected object or array of objects."
      );
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
      setSelectedItem({});
      setOpenDeleteDialog(false);
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleDeleteClick = (data: IapiResponse | ApiResponseArray) => {
    setSelectedItem(data);
    setOpenDeleteDialog(true);
  };
  const handleDeleteCancel = () => {
    setSelectedItem({});
    setOpenDeleteDialog(false);
  };
  const handleAdd = () => {
    setDialogOpen(true);
    setAddRequestDetails({
      description: "",
      status: "",
    });
  };
  const handleAddDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAddRequestDetails({
      description: event.target.value,
      status: addRequestDetails.status,
    });
  };
  const handleAddStatusChange = (event: SelectChangeEvent<string>) => {
    setAddRequestDetails({
      description: addRequestDetails.description,
      status: event.target.value,
    });
  };
  const handleEdit = (data: IapiResponse) => {
    setIsEdit(true);
    setRequestDetails({
      id: data._id,
      description: data.description,
      status: data.status,
    });
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
    setIsEdit(false);
  };
  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRequestDetails({
      id: requestDetails.id,
      description: event.target.value,
      status: requestDetails.status,
    });
  };
  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setRequestDetails({
      id: requestDetails.id,
      description: requestDetails.description,
      status: event.target.value,
    });
  };

  const autoPageChange = async () => {
    if (data.length) {
      if ((data.length % rowsPerPage) - 1 === 0 && page >= 1) {
        setPage(page - 1);
      }
    }
  };

  return{
    getters: { page,rowsPerPage,data,isEdit,isLoading,openDeleteDialog,selectedItem,dialogOpen,addRequestDetails,requestDetails
    },
    handlers: {
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
        autoPageChange

    }
};
}
