import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      width: "100%",
      maxWidth: "440px",
      minHeight: "250px",
      borderRadius: "20px",
      overflow: "hidden",
      cursor: "pointer",
      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    },
  };
});

const BlogCards = ({ data, active }) => {
  const { container } = useStyle();
  const history = useRouter();
  const handleNavigate = () => {
    history.push(`/BlogLists/Details/${data?.slug}`);
  };
  return (
    <Box className={container} onClick={handleNavigate}>
      <Box>
        {active === "Image" ? (
          <Image
            src={data?.image_path}
            alt={data?.image_path}
            width={1000}
            height={1000}
            style={{ width: "100%", height: "100%", maxHeight: "150px" }}
          />
        ) : (
          <video
            width="100%"
            height="200"
            autoPlay
            loop
            muted
            controls
            alt="All the devices"
            src={data.image_path}
          />
        )}
      </Box>
      <Box sx={{ padding: " 10px 20px" }}>
        <Typography
          sx={{ fontWeight: "700", color: (theme) => theme.palette.grey[900] }}
        >
          {data?.title}
        </Typography>
      </Box>
    </Box>
  );
};

export default BlogCards;
