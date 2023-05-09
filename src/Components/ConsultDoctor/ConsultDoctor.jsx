"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import ConsultADoctor from "../../Assets/PageHeaders/Consult_a_doctor.png";
import { makeStyles } from "@mui/styles";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  List,
  ListItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
} from "react-google-places-autocomplete";
import Geocode from "react-geocode";
import DoctorCard from "../Cards/DoctorCard";

const Layout = dynamic(() => import("@/Layouts"), { ssr: true });

const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "50px",
      width: "100%",
      maxWidth: "1280px",
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
    filters: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: "20px",
      alignItems: "center",
    },
  };
});

const ConsultDoctor = ({ userSkills, userSkillsPhotoUrl, userDetails }) => {
  const {
    container,
    contentContainer,
    cardsContainer,
    TypoContainer,
    filters,
  } = useStyle();

  let history = useRouter();

  const [value, setValue] = useState(null);
  const [SearchHospital, setSearchHospital] = useState([]);
  const [latlng, setlatlng] = useState({
    lat: "",
    lng: "",
  });

  const [filterData, setfilterData] = useState({
    hospital_id: "",
    searchnamekey: "",
    recentChange: "",
  });

  const [DoctorDetails, setDoctorDetails] = useState([]);

  console.log(SearchHospital);

  function handleClick(id, name) {
    history.push(`/ConsultDoctor/ViewConsultDoctor/?title=${name}&id=${id}`);
  }

  const handleValue = (event) => {
    console.log(event);
    setValue(event);
    Geocode.setApiKey("AIzaSyCBMKz54vZuIMG7KAl0rkwBqrf0g-du02c");
    Geocode.fromAddress(event.value.description).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setlatlng({
          lat: lat,
          lng: lng,
        });
        geocodeByAddress(event.value.description);
        setfilterData({
          hospital_id: "",
          searchnamekey: "",
          recentChange: "location",
        });
      },
      (error) => {
        console.log("error  msg here", error);
      }
    );
  };

  function searchlisthospital(text) {
    var qs = require("qs");
    var data = qs.stringify({
      searchkey: text,
    });
    var config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API}/healthcare/adminSearchHospitaldata`,
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setSearchHospital(response.data.listhospital);
      })
      .catch(function (error) {
        console.log(error);
        // toast.error("Please enter valid data.");
      });
  }

  const resetClick = () => {
    setfilterData({
      hospital_id: "",
      searchnamekey: "",
      recentChange: "",
    });
    setDoctorDetails([]);
  };

  useEffect(() => {
    searchlisthospital();
  }, []);

  function handlehospital() {
    var qs = require("qs");

    let data = qs.stringify({
      skills_id: "",
      hospital_id:
        filterData?.recentChange === "hospital" ||
        filterData?.searchnamekey === ""
          ? filterData?.hospital_id
          : null,
      searchdoctor: latlng?.lat
        ? "location"
        : filterData?.recentChange === "hospital" ||
          filterData?.searchnamekey === ""
        ? 5
        : 1,
      searchnamekey:
        filterData?.recentChange === "doctor" || filterData?.hospital_id === ""
          ? filterData?.searchnamekey
          : null,
      longitude: latlng?.lng,
      latitude: latlng?.lat,
    });

    var config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API}/healthcare/doctorlisting`,
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data?.DoctorDetails);
        if (response.data.status === "1") {
          setDoctorDetails(response.data?.DoctorDetails);
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Please enter valid data.");
      });
  }

  useEffect(() => {
    if (
      filterData?.hospital_id ||
      filterData?.searchnamekey ||
      filterData?.recentChange
    ) {
      handlehospital();
    }
  }, [filterData]);

  return (
    <Layout>
      <Box className={container}>
        <Box className={contentContainer}>
          <Box>
            <Image
              src={ConsultADoctor}
              alt={"medy"}
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            />
          </Box>
          <Box className={filters}>
            <GooglePlacesAutocomplete
              autocompletionRequest={{
                componentRestrictions: {
                  country: ["ae", "in"],
                },
              }}
              apiOptions={{ language: "ar" }}
              apiKey="AIzaSyCBMKz54vZuIMG7KAl0rkwBqrf0g-du02c"
              selectProps={{
                value,
                placeholder: "Search by Location",
                onChange: handleValue,
              }}
              style={{
                borderRadius: "50px",
                overflow: "hidden",
                border: "none",
                flex: 2,
              }}
            />
            <FormControl
              variant="outlined"
              sx={{
                flex: "2",
              }}
            >
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={SearchHospital.map((option) => {
                  return option?.name;
                })}
                onChange={(event, newValue) => {
                  const data = SearchHospital.find(
                    (val) => val?.name === newValue
                  );
                  setValue("");
                  setlatlng({
                    lat: "",
                    lng: "",
                  });
                  setfilterData({
                    ...filterData,
                    ["hospital_id"]: data?.id,
                    ["recentChange"]: "hospital",
                  });
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
                      "& css-1fy6zy6-MuiInputBase-root-MuiOutlinedInput-root": {
                        border: "none",
                        borderRadius: "30px",
                      },
                    }}
                    fullWidth
                    placeholder="Search Hospital Name"
                  />
                )}
              />
            </FormControl>

            <FormControl
              variant="outlined"
              sx={{
                flex: "2",
              }}
            >
              <OutlinedInput
                id=""
                type="text"
                sx={{ borderRadius: "50px", overflow: "hidden" }}
                fullWidth
                placeholder="Search By Title"
                onChange={(e) => {
                  setfilterData({
                    ...filterData,
                    ["searchnamekey"]: e.target.value,
                    ["recentChange"]: "doctor",
                  });
                }}
              />
            </FormControl>

            <Button
              variant="contained"
              sx={{ padding: "15px 30px", borderRadius: "50px", flex: "1" }}
              onClick={resetClick}
            >
              Reset
            </Button>
          </Box>
          {filterData?.recentChange !== "" ? (
            <Box className={cardsContainer}>
              {DoctorDetails?.map((doctor) => {
                return (
                  <DoctorCard
                    key={doctor?.Id}
                    doctor={doctor}
                    link={"/Signin"}
                  />
                );
              })}
            </Box>
          ) : (
            <Box className={cardsContainer}>
              {userSkills?.map((data, i) => {
                return (
                  <Box key={i}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundImage: `url(${
                            userSkillsPhotoUrl + data?.skill_photo
                          })`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          width: "295px",
                          height: "180px",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleClick(data.id, data.slug);
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            color: "#212529",
                            fontSize: "1rem",
                          }}
                        >
                          {data?.skill_name}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )}
          <Box className={TypoContainer}>
            <Typography
              sx={{
                fontSize: "0.9rem",
                textAlign: "justify",
              }}
            >
              At Medy, we provide convenient access to experienced and skilled
              medical professionals who can help you with a wide range of health
              concerns. From minor ailments to chronic conditions, our doctors
              are available to offer expert guidance and specialized treatment
              plans. You can easily connect with licensed healthcare
              professionals, and get the medical advice you need without having
              to wait in long lines or for delayed appointments.
            </Typography>
            <Typography
              sx={{
                fontSize: "0.9rem",
                textAlign: "justify",
              }}
            >
              Simply book an appointment and get one of our partnered doctors to
              connect with you via video call, all from the comfort of your
              home. You can even get on-site doctor consultations through our
              app. Our doctors can also refer you to a specialist if needed for
              complex health issues. You also have the option to consult a
              specialist doctor through our online portal. Our experienced team
              is here to help you get the medical advice you need on a wide
              range of health concerns.
            </Typography>
            <Typography
              sx={{
                fontSize: "0.9rem",
              }}
            >
              With an array of services available at Medy, you can also avail of
              these benefits that come with these services.{" "}
            </Typography>
            <Box>
              <List
                sx={{
                  listStyleType: "disc",
                  pl: 5,
                  "& .MuiListItem-root": {
                    display: "list-item",
                  },
                }}
              >
                <ListItem dense={true}>
                  <Typography>
                    Our licensed healthcare professionalsprovide the best
                    medical advice and can answer any health-related questions
                  </Typography>{" "}
                </ListItem>
                <ListItem dense={true}>
                  <Typography>
                    We have integrated laboratories, so you can easily schedule
                    and receive lab tests fromthe same platform.
                  </Typography>{" "}
                </ListItem>
                <ListItem dense={true}>
                  <Typography>
                    Our partner clinics provide a range of medical services,
                    from routine check-ups to medical treatments{" "}
                  </Typography>{" "}
                </ListItem>
                <ListItem dense={true}>
                  <Typography>
                    Enjoy the ease and comfort of receiving healthcare services
                    from the comfort of your own home, with our virtual
                    consultations and prescription refills.
                  </Typography>{" "}
                </ListItem>
              </List>
            </Box>
            <Typography
              sx={{
                fontSize: "0.9rem",
                textAlign: "justify",
              }}
            >
              At Medy, we believe that everyone deserves access to the highest
              quality of healthcare, and we&apos;re committed to making it as
              accessible and convenient as possible. And we are leveraging the
              technology to bring healthcare to you, wherever you are.
            </Typography>
            <Typography
              sx={{
                fontSize: "0.9rem",
                textAlign: "justify",
              }}
            >
              Don&apos;t let health concerns go unaddressed. Book a consultation
              with one of our experienced doctors today and take the first step
              towards better health and wellness.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default ConsultDoctor;
