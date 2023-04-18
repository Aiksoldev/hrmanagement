import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import blog1 from "../../../Assets/blogs/blog1.jpg";
import blog2 from "../../../Assets/blogs/blog2.jpg";
import blog3 from "../../../Assets/blogs/blog3.jpg";
import BlogCard from "@/Components/Cards/BlogCard";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 10px",
    
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
    
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    headingContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    cardsContainer: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    
    },
  };
});

const Blogs = () => {
  const { container, subContainer, headingContainer, cardsContainer } =
    useStyle();
  const [carddata] = useState([
    {
      img: blog1,
      postedDate: "12 May, 2017",
      title: "Enhance Productivity with HRM Platform",
      desc: "Enhance Organization Productivity Time has changed, organizations are seeking new ways to enhance their productivity. Automated...",
      id: "",
    },
    {
      img: blog2,
      postedDate: "23 Aug, 2018",
      title: "Be More Productive",
      desc: "Be More Productive Through Time & Attendance Management Software If your run a business, sometimes employee work more than expected...",
      id: "",
    },
    {
      img: blog3,
      postedDate: "14 Jan, 2019",
      title: "Increase Company’s Performance",
      desc: "Increase Company’s Performance Level with HRM Software. To achieve a remarkable efficiency level, an organization has to make sure that every process...",
      id: "",
    },
  ]);
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={headingContainer}>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Our Blogs
          </Typography>
          <Box className={"customdivider"}></Box>
        </Box>
        <Box className={cardsContainer}>
          {carddata?.map((data, i) => {
            return <BlogCard key={i} data={data} />;
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Blogs;
