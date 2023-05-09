"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import publishingbanner from "../../Assets/PageHeaders/publishingbanner.png";
const TCAMLayout = dynamic(() => import("@/Layouts/TCAMLayout"), { ssr: true });
const TCAMBreadcrumb = dynamic(() => import("./TCAMBreadcrumb"), {
  ssr: false,
});
const useStyle = makeStyles((theme) => {
  return {
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      width: "100%",
      padding: "20px",
    },
    cardsContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      flexWrap: "wrap",
      width: "100%",
    },
  };
});

const TCAMPublishings = ({ listblog, blogcount }) => {
  const { contentContainer, cardsContainer } = useStyle();
  const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
  };
  const baseUrl = getBaseUrl();
  const token = window.localStorage.getItem("token");
  let history = useRouter();
  const [TCAMPublishings, setTCAMPublishings] = useState([]);
  const [searchKey, setsearchKey] = useState("");
  console.log(blogcount);
  console.log(TCAMPublishings);

  const searchPublisings = () => {
    if (searchKey === "") {
      setTCAMPublishings(listblog);
    } else {
      var qs = require("qs");
      var data = qs.stringify({
        searchname: searchKey,
        type: history?.query.id,
        blogtype: "Image",
      });
      var config = {
        method: "post",
        url: `${baseUrl}/healthcare/tcampartnerpublishingsearch`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setTCAMPublishings(response.data.listblog);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const resetClick = () => {
    setTCAMPublishings(listblog);
  };

  useEffect(() => {
    setTCAMPublishings(listblog);
  }, [listblog]);

  return (
    <TCAMLayout>
      <Box className={contentContainer}>
        <Box>
          <Image
            src={publishingbanner}
            alt={"medy"}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "10px",
            }}
          />
        </Box>
        <Box>
          <TCAMBreadcrumb />
        </Box>
        <Box className={cardsContainer}>
          <FormControl fullWidth variant="outlined" sx={{ maxWidth: "500px" }}>
            <OutlinedInput
              size="small"
              sx={{ borderRadius: "50px", overflow: "hidden", padding: "5px" }}
              id="outlined-adornment-password"
              type="text"
              fullWidth
              placeholder="Search By Topic"
              value={searchKey}
              onChange={(e) => {
                setsearchKey(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={searchPublisings}
                    sx={{
                      borderRadius: "100px",
                      marginRight: "-15px",
                      fontSize: "16px",
                      height: "60px",
                      width: "100px",
                      background: (theme) => theme.palette.primary.main,
                      color: (theme) => theme.palette.white.main,
                    }}
                    edge="end"
                  >
                    Search
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Box>
            <Button
              size="small"
              variant="contained"
              sx={{
                padding: "12px 30px",
                borderRadius: "5px",
                flex: "1",
                textTransform: "capitalize",
              }}
              onClick={resetClick}
            >
              Reset
            </Button>
          </Box>
        </Box>

        <Box className={cardsContainer}>
          {TCAMPublishings?.map((data) => {
            return (
              <Box key={data?.id}>
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    width: "300px",
                    borderRadius: "20px",

                    height: "350px",
                  }}
                >
                  <Box
                    sx={{
                      backgroundImage: `url(${data?.image_path})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      width: "300px",
                      height: "280px",
                      borderRadius: "20px 20px 0px 0px",
                      cursor: "pointer",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      padding: "10px 15px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#212529",
                        fontSize: "18px",
                        textOverflow: "ellipsis",
                        fontWeight: 500,
                      }}
                    >
                      {data?.title}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            );
          })}
        </Box>
      </Box>
    </TCAMLayout>
  );
};

export default TCAMPublishings;
