export interface IapiResponse {
    status: string;
    _id: string;
    description: string;
    requestId: string;
  }
 export interface ApiResponseArray extends Array<IapiResponse> { }
  
 export interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number,
    ) => void;
  }
  
 export interface IUpdateRequest{
    id:string;
    description:string;
    status:string;
  }
 export interface IRequestData{
    description:string;
    status:string;
  }