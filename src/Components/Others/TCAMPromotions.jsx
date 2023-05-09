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
import promotionbanner from "../../Assets/PageHeaders/promotionbanner.png";
import promotionimg from "../../Assets/PageHeaders/promotionimg.jpg";
const TCAMLayout = dynamic(() => import("@/Layouts/TCAMLayout"), { ssr: true });
const TCAMBreadcrumb = dynamic(() => import("./TCAMBreadcrumb"), {
  ssr: false,
});
const useStyle = makeStyles((theme) => {
  return {
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "50px",
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

const TCAMPromotions = ({ listpromotion, count }) => {
  const { contentContainer, cardsContainer } = useStyle();
  const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
  };
  const baseUrl = getBaseUrl();
  const token = window.localStorage.getItem("token");
  let history = useRouter();
  const [TCAMPromotions, setTCAMPromotions] = useState([]);
  const [searchKey, setsearchKey] = useState("");

  const searchPromotions = () => {
    if (searchKey === "") {
      setTCAMPromotions(listpromotion);
    } else {
      var qs = require("qs");
      var data = qs.stringify({
        searchname: searchKey,
        role_id: history?.query.id,
      });
      var config = {
        method: "post",
        url: `${baseUrl}/healthcare/searchtcampromotions`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setTCAMPromotions(response.data.listpromotion);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const resetClick = () => {
    setTCAMPromotions(listpromotion);
  };

  useEffect(() => {
    setTCAMPromotions(listpromotion);
  }, [listpromotion]);

  return (
    <TCAMLayout>
      <Box className={contentContainer}>
        <Box>
          <Image
            src={promotionbanner}
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
              id="outlined-adornment-password"
              type="text"
              size="small"
              sx={{ borderRadius: "50px", overflow: "hidden", padding: "5px" }}
              fullWidth
              placeholder="Search By Promotion"
              value={searchKey}
              onChange={(e) => {
                setsearchKey(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={searchPromotions}
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
          <Box
            sx={{
              width: "100%",
              height: "fit-content",
              backgroundImage: `url(${promotionimg.src})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderRadius: "50px",
              padding: "10%",
              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                fontStyle: "normal",
                fontWeight: 900,
                fontSize: "96px",
                color: (theme) => theme.palette.white.main,
                textTransform: "uppercase",
                lineHeight: "50px",
              }}
            >
              Latest
            </Typography>
            <Typography
              sx={{
                fontStyle: "normal",
                fontWeight: 900,
                fontSize: "60px",
                color: (theme) => theme.palette.white.main,
                textTransform: "uppercase",
              }}
            >
              promotions
            </Typography>
            <Typography
              sx={{
                fontStyle: "normal",
                fontSize: "20px",
                color: (theme) => theme.palette.white.main,
                maxWidth: "450px",
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s
            </Typography>
          </Box>
        </Box>

        <Box className={cardsContainer}>
          {TCAMPromotions?.map((data) => {
            return (
              <Box
                key={data?.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%",
                  height: "590px",
                  maxWidth: "500px",
                  color: "#fff",
                  padding: "20px",
                  overflow: "hidden",
                  background: "linear-gradient(270deg,#8cbe4d,#35b1ce 77%)",
                  borderRadius: "40px",
                }}
              >
                <Paper
                  sx={{
                    borderRadius: "30px",
                    padding: "10px",
                  }}
                >
                  <Image
                    src={data?.image}
                    alt={"medy"}
                    width="200"
                    height="200"
                    style={{
                      width: "100%",
                      height: "300px",
                      borderRadius: "20px",
                    }}
                  />
                </Paper>
                <Typography
                  sx={{
                    color: "#fcff00",
                    fontSize: "24px",
                    fontWeight: 600,
                  }}
                >
                  {data?.name}
                </Typography>
                <Typography
                  sx={{
                    lineClamp: "5",
                    WebkitLineClamp: "5",
                    color: (theme) => theme.palette.white.main,
                    fontWeight: "400",
                    fontSize: "16px",
                  }}
                >
                  {data?.descriptions.slice(0, 365)}
                  {data?.descriptions.length > 365 && "..."}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </TCAMLayout>
  );
};

export default TCAMPromotions;
