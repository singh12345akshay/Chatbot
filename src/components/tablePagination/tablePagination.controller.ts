import { TablePaginationActionsProps } from "@mui/material/TablePagination/TablePaginationActions";
import React from "react";

export default function TablePaginationController(
  props: TablePaginationActionsProps
) {
  const { count, page, rowsPerPage, onPageChange } = props;
  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return {
    getters: { count, page, rowsPerPage, onPageChange },
    handlers: {
      handleFirstPageButtonClick,
      handleBackButtonClick,
      handleNextButtonClick,
      handleLastPageButtonClick,
    },
  };
}
