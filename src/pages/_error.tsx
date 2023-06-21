import { Box } from "@mui/material";
import React from "react";
import Image from "next/image";
import { internalservererror } from "src/assets/images";

export default function InternalServerError() {
  return (
    <>
      <Box
        sx={{
          width: "50%",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image src={internalservererror.src} fill={true} alt={"503 Error"} />
      </Box>
    </>
  );
}
