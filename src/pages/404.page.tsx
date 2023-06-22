import { Box } from '@mui/material';
import React from 'react';
import Image from "next/image";
import { pagenotfound } from 'src/assets/images';

export default function NotFoundPage() {
  return <><Box sx={{ width: "50%", height: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Image
      src={pagenotfound.src}
      fill={true} alt={'404 Error'}  /></Box></>;
}
