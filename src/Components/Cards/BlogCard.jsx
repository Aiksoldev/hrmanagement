import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import React from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Link from "next/link";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      
      minHeight: "480px",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      transition: "0.5s",
      boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    },
    dateContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
  };
});

const BlogCard = ({ data }) => {
  const { container, dateContainer } = useStyle();
  return (
    <Box className={container}>
      <Box>
        <Image
          src={data?.img}
          alt=""
          quality={100}
          style={{ width: "100%", height: "200px" }}
        />
      </Box>
      <Box className={dateContainer}>
        <Box>
          <DateRangeIcon />
        </Box>
        <Typography>{data?.postedDate}</Typography>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {data?.title}
        </Typography>
      </Box>
      <Box>
        <Typography>{data?.desc}</Typography>
      </Box>
      <Box>
        <Link href={`/blogdetails/${data?.id}`}>
          <Typography
            sx={{
              transition: "0.5s",
              "&:hover": {
                color: (theme) => theme.palette.primary.main,
              },
            }}
          >
            Learn More
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default BlogCard;
