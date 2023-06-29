import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, CircularProgress, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";

interface AuthproviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthproviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const checkAuthtoken = async () => {
    const currentPage = router.pathname;
    const authToken = localStorage.getItem("authToken");

    if (!authToken && currentPage !== "/signin") {
      await router.push("/signin");
      enqueueSnackbar("Please SignIn First", {
        variant: "error",
        preventDuplicate: true,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } else if (authToken && currentPage === "/signin") {
      router.push("/home");
    }
  };
  
  useEffect(() => {
    checkAuthtoken();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [router]);

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CircularProgress />
        <Typography variant="h5"> Loading...</Typography>
      </Box>
    );
  }

  return <>{children}</>;
}
