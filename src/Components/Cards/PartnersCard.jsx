import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import React from "react";

const useStyle = makeStyles((theme) => {
  return {
    card: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "20px",
      minHeight: "200px",
      border: "1px solid white",
      padding: "20px",
      width: "100%",
      maxWidth: "250px",
      textAlign: "center",
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      transition: "0.5s",
      cursor: "pointer",
      "&:hover": {
        border: `1px solid ${theme.palette.text.secondary}`,
        boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      },
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        maxWidth: "unset",
      },
    },
  };
});

const PartnersCard = ({ data, setOpen, settitle }) => {
  const { card } = useStyle();
  return (
    <Box
      className={card}
      onClick={(e) => {
        settitle(data?.tag);
        setOpen(true);
      }}
    >
      <Image
        src={data?.img}
        alt={""}
        quality={100}
        style={{ width: "80px", height: "auto" }}
      />
      <Typography sx={{ fontWeight: "bold" }}>{data?.title}</Typography>
    </Box>
  );
};

export default PartnersCard;
