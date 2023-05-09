"use client";
import dynamic from "next/dynamic";
import React from "react";
import Layout from ".";
import { Box } from "@mui/material";
const TCAMSidebar = dynamic(() => import("../components/Others/TCAMSidebar"), {
  ssr: false,
});
import { makeStyles } from "@mui/styles";
import TCAMBreadcrumbsContextProvider from "@/Context/TCAMBreadcrumbsContext";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0px 25px",
    },

    mainSection: {
      display: "flex",
      gap: "10px",
      [theme.breakpoints.down("770")]: {
        flexDirection: "column",
      },
    },
    section_sideBar: {
      minWidth: "300px",
      maxWidth: "350px",
      width: "100%",
      padding: "20px 10px",
      [theme.breakpoints.down("770")]: {
        minWidth: "100%",
        maxWidth: "100%",
      },
    },
  };
});

const TCAMLayout = ({ children }) => {
  const { container, mainSection, section_sideBar } = useStyle();
  return (
    <TCAMBreadcrumbsContextProvider>
      <Layout>
        <Box className={container}>
          <Box
            className={mainSection}
            sx={{
              display: "flex",
              gap: "20px",
            }}
          >
            <Box className={section_sideBar}>
              <TCAMSidebar />
            </Box>
            <Box
              sx={{
                width: "100%",
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Layout>
    </TCAMBreadcrumbsContextProvider>
  );
};

export default TCAMLayout;
