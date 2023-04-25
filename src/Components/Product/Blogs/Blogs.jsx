import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import blog1 from "../../../Assets/blogs/blog1.jpg";
import blog2 from "../../../Assets/blogs/blog2.jpg";
import blog3 from "../../../Assets/blogs/blog3.jpg";
import BlogCard from "@/Components/Cards/BlogCard";
import { Fade } from "react-awesome-reveal";
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
    },
    headingContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    cardsContainer: {
      width: "100%",
      display: "flex",

      justifyContent: "space-evenly",
      gap: "20px",
      [theme.breakpoints.down("lg")]: {
        flexWrap: "wrap",
      },
    },
    card: {
      width: "100%",
      minWidth: "250px",
      flex: 1,
    },
  };
});

const Blogs = () => {
  const { container, subContainer, headingContainer, cardsContainer, card } =
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
    <Box className={container} id={"blogs"}>
      <Box className={subContainer}>
        <Box className={headingContainer}>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Our Blogs
          </Typography>
          <Box className={"customdivider"}></Box>
        </Box>
        <Box className={cardsContainer}>
          {carddata?.map((data, i) => {
            return (
              <Fade
                key={i}
                direction="up"
                duration={500 * (i + 1)}
                triggerOnce
                className={card}
              >
                <BlogCard data={data} />
              </Fade>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Blogs;
