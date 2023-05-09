"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Ellipse from "../../Assets/Ellipse.png";
import { makeStyles } from "@mui/styles";
import { Box, Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";

const Layout = dynamic(() => import("@/Layouts"), { ssr: true });

const useStyle = makeStyles(() => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    testText: {
      fontSize: "14px",
      fontWeight: "500",
    },
    textRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #e4edfb",
      padding: "10px 15px",
    },
  };
});

const TestDetailPage = ({ testDetail }) => {
  const { container, testText, textRow } = useStyle();

  let history = useRouter();

  console.log(testDetail);

  console.log(history.query.testname);

  return (
    <Layout>
      <Box className={container}>
        <Box
          sx={{
            padding: "25px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              width: "100%",
              maxWidth: "750px",
              height: "fit-content",
              borderRadius: "10px",
              padding: "25px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "40px",
            }}
            elevation={3}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${Ellipse.src})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: "130px",
                  width: "130px",
                  position: "relative",
                  padding: "15px",
                }}
              >
                <Image
                  src={testDetail?.labtestphotourl}
                  alt={testDetail?.labtestphotourl}
                  width="100"
                  height="100"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                    borderRadius: "50%",
                  }}
                />
                <Box
                  sx={{
                    width: "50px",
                    height: "50px",
                    padding: "5px",
                    backgroundColor: (theme) => theme.palette.white.main,
                    position: "absolute",
                    bottom: -15,
                    borderRadius: "50%",
                    left: "27%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#25aae1",
                      borderRadius: "50%",
                    }}
                  ></Box>
                </Box>
              </Box>
            </Box>

            <Typography
              sx={{
                fontSize: "18px",
                display: "flex",
                justifyContent: "center",
                fontWeight: 600,
              }}
            >
              Test Information
            </Typography>

            <Box>
              <Box className={textRow}>
                <Typography className={testText}>Test Name</Typography>
                <Typography className={testText}>
                  {testDetail.labtest_name}
                </Typography>
              </Box>
              <Box className={textRow}>
                <Typography className={testText}>Lab Name</Typography>
                <Typography className={testText}>
                  {testDetail.lab_name}
                </Typography>
              </Box>
              <Box className={textRow}>
                <Typography className={testText}>Amount</Typography>
                <Typography className={testText}>
                  {testDetail.labtest_amount}
                </Typography>
              </Box>
              <Box className={textRow}>
                <Typography className={testText}>Description</Typography>
                <Typography className={testText}>
                  {ReactHtmlParser(testDetail.descriptions)}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.white.main,
                  padding: "10px 40px",
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.white.main,
                    color: (theme) => theme.palette.primary.main,
                    border: (theme) =>
                      `2px solid ${theme.palette.primary.main}`,
                  },
                }}
              >
                Book
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Layout>
  );
};

export default TestDetailPage;
