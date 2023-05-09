"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import others from "../../Assets/PageHeaders/others.png";
import { makeStyles } from "@mui/styles";
import {
  Autocomplete,
  Box,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import AYURVEDA from "../../Assets/PageHeaders/AYURVEDA.jpg";
import ACUPUNCTURE from "../../Assets/PageHeaders/ACUPUNCTURE.jpg";
import CHIROPRACTICMEDICINE from "../../Assets/PageHeaders/CHIROPRACTICMEDICINE.jpg";
import DIETANDNUTRITION from "../../Assets/PageHeaders/DIETANDNUTRITION.jpg";
import GYMSANDLIFESTYLEFITNESS from "../../Assets/PageHeaders/GYMSANDLIFESTYLEFITNESS.jpg";
import HOMOPATHY from "../../Assets/PageHeaders/HOMOPATHY.jpg";
import TRADITIONALCHINESEMEDICINE from "../../Assets/PageHeaders/TRADITIONALCHINESEMEDICINE.jpg";
import MEDITATION from "../../Assets/PageHeaders/MEDITATION.jpg";
import NATUROPATHY from "../../Assets/PageHeaders/NATUROPATHY.jpg";
import PHYSIOTHERAPY from "../../Assets/PageHeaders/PHYSIOTHERAPY.jpg";
import UNANIMEDICINE from "../../Assets/PageHeaders/UNANIMEDICINE.jpg";
import PETCARE from "../../Assets/PageHeaders/PETCARE.jpg";
import REIKIHEALING from "../../Assets/PageHeaders/REIKIHEALING.jpg";
import WELLNESS from "../../Assets/PageHeaders/WELLNESS.jpg";
import YOGA from "../../Assets/PageHeaders/YOGA.jpg";
import Carousel from "react-elastic-carousel";
const TCAMLayout = dynamic(() => import("@/Layouts/TCAMLayout"), { ssr: true });
const TCAMBreadcrumb = dynamic(() => import("./TCAMBreadcrumb"), {
  ssr: false,
});

const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0px 25px",
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "50px",
      width: "100%",
      //   maxWidth: "1280px",
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
    TypoContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "2px",
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
      maxWidth: "300px",
      width: "100%",
      padding: "20px 10px",
      [theme.breakpoints.down("770")]: {
        minWidth: "100%",
        maxWidth: "100%",
      },
    },
  };
});

const TCAMPartnerProfile = ({
  doctorData,
  Paginationcount,
  Description,
  tcamImage,
}) => {
  const { contentContainer, cardsContainer, TypoContainer } = useStyle();
  const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
  };
  const baseUrl = getBaseUrl();
  const token = window.localStorage.getItem("token");
  let history = useRouter();
  const [bannerImage, setbannerImage] = useState("");
  const carouselRef = useRef(null);
  const [DoctorsData, setDoctorsData] = useState([]);

  const PartnerProfileImageData = [
    {
      id: 11,
      image: AYURVEDA,
    },
    {
      id: 16,
      image: ACUPUNCTURE,
    },
    {
      id: 17,
      image: CHIROPRACTICMEDICINE,
    },
    {
      id: 18,
      image: DIETANDNUTRITION,
    },
    {
      id: 9,
      image: GYMSANDLIFESTYLEFITNESS,
    },
    {
      id: 19,
      image: HOMOPATHY,
    },
    {
      id: 25,
      image: TRADITIONALCHINESEMEDICINE,
    },
    {
      id: 20,
      image: MEDITATION,
    },
    {
      id: 21,
      image: NATUROPATHY,
    },
    {
      id: 22,
      image: PHYSIOTHERAPY,
    },
    {
      id: 26,
      image: UNANIMEDICINE,
    },
    {
      id: 23,
      image: PETCARE,
    },
    {
      id: 24,
      image: REIKIHEALING,
    },
    {
      id: 27,
      image: WELLNESS,
    },
    {
      id: 10,
      image: YOGA,
    },
  ];

  const searchlistname = (name) => {
    if (name === "") {
      setDoctorsData(doctorData);
    } else {
      var qs = require("qs");
      var data = qs.stringify({
        id: history?.query.id,
        searchname: name,
      });
      var config = {
        method: "post",
        url: `${baseUrl}/healthcare/tcampartnerprofilessearch`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setDoctorsData(response.data.listtcam);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    let Matched = PartnerProfileImageData.find(
      (val) => val?.id == history?.query.id
    );

    if (Matched) {
      setbannerImage(Matched?.image);
    } else {
      setbannerImage(others);
    }
  }, [history?.query.id]);
  useEffect(() => {
    setDoctorsData(doctorData);
  }, [doctorData]);

  return (
    <TCAMLayout>
      <Box className={contentContainer}>
        <Box>
          <Image
            src={bannerImage}
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
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={doctorData.map((option) => {
                return option?.name;
              })}
              onChange={(event, newValue) => {
                searchlistname(newValue);
              }}
              sx={{
                "& .MuiAutocomplete-hasClearIcon.css-1h51icj-MuiAutocomplete-root .MuiAutocomplete-inputRoot":
                  {
                    paddingRight: "0px ",
                  },
                "& .MuiAutocomplete-hasClearIcon.css-1ruhu24-MuiAutocomplete-root .MuiOutlinedInput-root":
                  {
                    paddingRight: "0px ",
                  },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="outlined-adornment-password"
                  type="text"
                  sx={{
                    outline: "none",
                    border: "none",
                    "& .css-ql2wih-MuiInputBase-root-MuiOutlinedInput-root": {
                      border: "none",
                      borderRadius: "30px",
                    },
                    "& .css-1fy6zy6-MuiInputBase-root-MuiOutlinedInput-root": {
                      border: "none",
                      borderRadius: "30px",
                    },
                    "& .css-1h51icj-MuiAutocomplete-root .MuiOutlinedInput-root":
                      {
                        borderRadius: "30px",
                      },
                  }}
                  fullWidth
                  onChange={(e) => searchlistname(e.target.value)}
                  placeholder="Search By Name"
                />
              )}
            />
          </FormControl>
        </Box>

        <Box>
          <Box
            sx={{
              width: "280px",
              height: "auto",
              borderRadius: "10px",
              display: " inline-block",
              float: "left",
            }}
          >
            <Box
              sx={{
                padding: "0px 30px 30px 0px ",
              }}
            >
              <section className="slider-section">
                <Carousel
                  onNextEnd={({ index }) => {
                    clearTimeout(resetTimeout);
                    if (index + 1 === tcamImage?.length) {
                      resetTimeout = setTimeout(() => {
                        carouselRef?.current?.goTo(0);
                      }, 3000); // same time
                    }
                  }}
                  showArrows={false}
                  ref={carouselRef}
                  enableAutoPlay={true}
                  enableSwipe={false}
                  enableMouseSwipe={false}
                  duration={3000}
                  autoPlaySpeed={5000}
                  itemsToShow={1}
                >
                  {tcamImage?.map((item, index) => (
                    <>
                      <div className="slide_img">
                        <Image
                          src={item.slider_image}
                          alt={item.slider_image}
                          width="250"
                          height="0"
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "10px",
                            display: " inline-block",
                            float: "left",
                          }}
                        />
                      </div>
                      <div className="slider_text" key={index}>
                        <h2>{item.slider_title}</h2>
                        <p>{item.slider_descriptions}</p>
                      </div>
                    </>
                  ))}
                </Carousel>
              </section>
            </Box>
          </Box>

          <Typography
            sx={{
              textAlign: "justify",
            }}
          >
            An ancient Indian system that uses natural herbs, lifestyle changes,
            and body treatments to promote health and balance in the body and
            mind. An ancient Indian system that uses natural herbs, lifestyle
            changes, and body treatments to promote health and balance in the
            body and mind. An ancient Indian system that uses natural herbs,
            lifestyle changes, and body treatments to promote health and balance
            in the body and mind. An ancient Indian system that uses natural
            herbs, lifestyle changes, and body treatments to promote health and
            balance in the body and mind. An ancient Indian system that uses
            natural herbs, lifestyle changes, and body treatments to promote
            health and balance in the body and mind. An ancient Indian system
            that uses natural herbs, lifestyle changes, and body treatments to
            promote health and balance in the body and mind. An ancient Indian
            system that uses natural herbs, lifestyle changes, and body
            treatments to promote health and balance in the body and mind. An
            ancient Indian system that uses natural herbs, lifestyle changes,
            and body treatments to promote health and balance in the body and
            mind.An ancient Indian system that uses natural herbs, lifestyle
            changes, and body treatments to promote health and balance in the
            body and mind. An ancient Indian system that uses natural herbs,
            lifestyle changes, and body treatments to promote health and balance
            in the body and mind. An ancient Indian system that uses natural
            herbs, lifestyle changes, and body treatments to promote health and
            balance in the body and mind. An ancient Indian system that uses
            natural herbs, lifestyle changes, and body treatments to promote
            health and balance in the body and mind.
          </Typography>
        </Box>
        <Box className={cardsContainer}>
          {DoctorsData?.map((data) => {
            return (
              <Box
                key={data?.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Box
                  sx={{
                    width: "280px",
                    border: "1px solid black",
                    height: "200px",
                    padding: "10px",
                    borderRadius: "3px",
                  }}
                >
                  <Image
                    src={data?.image}
                    alt={"medy"}
                    width="200"
                    height="200"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  {data?.name}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Box className={TypoContainer}></Box>
      </Box>
    </TCAMLayout>
  );
};

export default TCAMPartnerProfile;
