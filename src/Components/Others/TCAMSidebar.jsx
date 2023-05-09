import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRouter } from "next/router";

const TCAMSidebar = () => {
  const SidebarList = [
    {
      name: "Partner Profiles",
      route: "/TCAMPartnerProfile",
      active: true,
    },
    {
      name: "Packages",
      route: "/TCAMPackages",
      active: false,
      BreadCrumbObj: {
        path: "/TCAMPackages",
        query: true,
        name: "Packages",
      },
    },
    {
      name: "Products",
      route: "/TCAMProducts",
      active: false,
    },
    {
      name: "Promotions",
      route: "/TCAMPromotions",
      active: false,
    },
    {
      name: "Publishings",
      route: "/TCAMPublishings",
      active: false,
    },
  ];

  let history = useRouter();

  const handelClick = (listItem) => {
    history.push({
      pathname: listItem?.route,
      query: { ...history?.query },
    });
  };
  console.log(history);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Categories
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {SidebarList.map((listItem, idx) => {
          return (
            <Paper
              key={idx}
              sx={{
                width: "100%",
                height: "50px",
                backgroundColor: (theme) =>
                  history?.pathname === listItem?.route
                    ? "#7bc160"
                    : theme.palette.background?.grey,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5px 20px",
                color: "black",
                cursor: "pointer",
              }}
              elevation={0}
              onClick={() => handelClick(listItem)}
            >
              <Typography
                sx={{
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {listItem?.name}
              </Typography>
              <ArrowForwardIosIcon fontSize="24px" />
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};

export default TCAMSidebar;
