import { store } from "@/Store";
import BlogSliderCard from "@/components/Cards/BlogSliderCard";
import FeatureCard from "@/components/Cards/FeatureCard";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import Link from "next/link";
import React, { useContext } from "react";

import Carousel, { consts } from "react-elastic-carousel";
import { toast } from "react-toastify";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      padding: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: theme.palette.grey[100],
    },
    contentContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      position: "relative",
    },
    bannerContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",

      padding: "12px 40px",
    },
  };
});

const BlogSlider = ({ BlogData }) => {
  const { container, contentContainer, bannerContainer } = useStyle();
  console.log(BlogData);
  return (
    <Box className={container}>
      <Box className={contentContainer}>
        <Box className={bannerContainer}>
          <Typography variant="h5" sx={{ fontWeight: "500" }}>
            Our Blog
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link href={"/BlogLists?type=Image"}>
              <Typography
                sx={{ fontWeight: "600" }}
                color={"rgb(140, 190, 77)"}
              >
                View All
              </Typography>
            </Link>
            <Box sx={{ width: "80px" }}>
              <Typography></Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ padding: "20px" }}>
          <Carousel
            enableAutoPlay={true}
            breakPoints={[
              { width: 1, itemsToShow: 1 },
              { width: 550, itemsToShow: 3 },
              { width: 768, itemsToShow: 3 },
              { width: 1024, itemsToShow: 4 },
              { width: 1199, itemsToShow: 4 },
              { width: 1200, itemsToShow: 4 },
            ]}
            pagination={false}
          >
            {BlogData?.map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  width: "100%",
                  maxWidth: "250px",
                  color: "#fff",
                  padding: "0 10px",
                }}
              >
                <BlogSliderCard
                  item={item}
                  link={`/BlogLists/Details/${item?.slug}`}
                />
              </Box>
            ))}
          </Carousel>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogSlider;
