import { Box, Button, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Countdown from "react-countdown";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import moment from "moment/moment";
import ReactHtmlParser from "react-html-parser";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      width: "100%",

      display: "flex",
      flexDirection: "column",

      alignItems: "center",
      borderRadius: "10px",
      position: "relative",
      overflow: "hidden",
      justifyContent: "center",
      textAlign: "center",
      cursor: "pointer",
      background: "white !important",
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    },
    contentContainer: {
      width: "100%",
      padding: "10px",
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
  };
});

const BlogSliderCard = ({ item, link }) => {
  const { container, contentContainer } = useStyle();
  const router = useRouter();
  return (
    <Box
      className={container}
      onClick={() => {
        router.push(link);
      }}
    >
      <Box>
        <Image
          src={item.image}
          alt={"medy deals"}
          width={500}
          height={500}
          style={{
            width: "auto",
            height: "100%",
            minHeight: "150px",
            maxHeight: "176px",
          }}
        />
      </Box>
      <Box className={contentContainer}>
        <Typography>
          {item?.created_at
            ? moment(item?.created_at).format("DD MMMM YYYY")
            : ""}
        </Typography>
        <Divider />
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{
              fontWeight: "bold",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item?.title}
          </Typography>
          <Typography
            component={"div"}
            sx={{
              height: "100px",
              overflow: "hidden",
              textAlign: "justify",
              textOverflow: "ellipsis",
              fontSize: "14px",
            }}
          >
            {ReactHtmlParser(item?.descriptions)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogSliderCard;
