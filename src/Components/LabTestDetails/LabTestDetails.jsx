"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Diagnostics from "../../Assets/PageHeaders/diagnostic.png";
import { makeStyles } from "@mui/styles";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  List,
  ListItem,
  OutlinedInput,
  Pagination,
  Paper,
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
import DiagnosticLabTestCard from "../Cards/DiagnosticLabTestCard";

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
      gap: "50px",
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

const ConsultDoctor = ({ labTestCount, labTestList }) => {
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
  const [SearchLabs, setSearchLabs] = useState([]);
  const [LabTestCounts, setLabTestCounts] = useState(0);
  const [LabTestList, setLabTestList] = useState([]);
  const [page, setpage] = useState(1);
  const [filterData, setfilterData] = useState({
    lab_id: "",
    testname: "",
    recentChange: "",
  });

  useEffect(() => {
    setLabTestCounts(labTestCount);
    setLabTestList(labTestList);
  }, [labTestCount, labTestList]);

  const [DoctorDetails, setDoctorDetails] = useState([]);

  console.log(SearchHospital);

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
        // setSearchLabs(response.data.listhospital);
      })
      .catch(function (error) {
        console.log(error);
        // toast.error("Please enter valid data.");
      });
  }

  const resetClick = () => {
    setfilterData({
      lab_id: "",
      testname: "",
      recentChange: "",
    });
    setLabTestList(labTestList);
    setLabTestCounts(labTestCount);
  };

  useEffect(() => {
    searchlisthospital();
  }, []);

  const getTestLabs = (e) => {
    let value = e.target.value;
    if (value === "") {
      console.log("dasdsa");
      setfilterData({
        lab_id: "",
        testname: "",
        recentChange: "",
      });
    } else {
      var qs = require("qs");
      var data = qs.stringify({
        searchkey: value,
      });
      var config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API}/healthcare/adminSearchlabdata`,
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setSearchLabs(response.data.listlab);
        })
        .catch(function (error) {
          console.log(error);
          // toast.error("Please enter valid data.");
        });
    }
  };

  const getLabListData = () => {
    window.scrollTo(0, 0);
    var qs = require("qs");

    var data = qs.stringify({
      id: "labsearchfilters",
      page: filterData?.recentChange === "testname" ? "" : page ? page : 1,
      lab_id: filterData?.recentChange === "lab_id" ? filterData?.lab_id : "",
      type:
        filterData?.recentChange === "lab_id" && filterData?.lab_id !== ""
          ? "lab"
          : "",
      testname: filterData?.recentChange === "testname" && filterData?.testname,
    });
    var config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API}/healthcare/listlabstestdata`,
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response?.data?.listlabstest);
        setLabTestList(response.data.listlabstest);
        setLabTestCounts(response.data.labstestcount);
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };
  const handleBookClick = (id, slug) => {
    history.push({
      pathname: `/LabTestDetails/${slug}`,
      query: { id: id },
    });
  };

  useEffect(() => {
    if (
      filterData?.lab_id ||
      filterData?.testname ||
      filterData?.recentChange
    ) {
      getLabListData();
    }
  }, [filterData]);
  console.log(LabTestList);

  return (
    <Layout>
      <Box className={container}>
        <Box className={contentContainer}>
          <Box>
            <Image
              src={Diagnostics}
              alt={"Diagnostics"}
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            />
          </Box>
          <Box className={filters}>
            <FormControl
              variant="outlined"
              sx={{
                flex: "3",
              }}
            >
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={SearchLabs.map((option) => {
                  return option?.name;
                })}
                onChange={(event, newValue) => {
                  const data = SearchLabs.find((val) => val?.name === newValue);

                  setfilterData({
                    ...filterData,
                    ["lab_id"]: data?.id,
                    ["recentChange"]: "lab_id",
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
                    onChange={getTestLabs}
                    fullWidth
                    placeholder="Search Hospital Name"
                  />
                )}
              />
            </FormControl>

            <FormControl
              variant="outlined"
              sx={{
                flex: "3",
              }}
            >
              <OutlinedInput
                id=""
                type="text"
                sx={{ borderRadius: "50px", overflow: "hidden" }}
                fullWidth
                placeholder="Search by Test Name"
                onChange={(e) => {
                  setfilterData({
                    ...filterData,
                    ["testname"]: e.target.value,
                    ["recentChange"]: "testname",
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

          <Box className={cardsContainer}>
            {LabTestList?.map((data, i) => {
              console.log(data);
              return (
                <DiagnosticLabTestCard
                  key={i}
                  data={data}
                  handleClick={handleBookClick}
                />
              );
            })}
          </Box>
          <Box className={cardsContainer}>
            <Pagination
              count={Math.ceil(LabTestCounts / 8)}
              variant="outlined"
              shape="rounded"
              onChange={(e, value) => {
                console.log(value);

                history.push({
                  pathname: `/LabTestDetails`,
                  query: { page: value },
                });
              }}
            />
          </Box>

          <Box className={TypoContainer}>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Medical Laboratory in Dubai
            </Typography>
            <Typography
              sx={{
                fontSize: "0.9rem",
                textAlign: "justify",
              }}
            >
              When it comes to your health and well-being, you may be unaware of
              what is going on inside your body since many diseases do not show
              any signs until significant damage has been done. A medical
              examination reveals the true state of your health. It assists you
              in understanding your body from within and taking the necessary
              steps to prevent/control any serious issues. Medy is an online
              medical platform that brings convenience and ease to booking and
              scheduling diagnostic tests and lab tests in Dubai. We have
              partnered with esteemed, certified labs to arrange sample
              collection directly at your residence, providing privacy and
              assurance. You can get blood tests, full-body checks, and other
              preventive health checkups with regular reports sent to your
              doorstep.
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Choose from a variety of profiles & tests. Among the most common
              requested tests are:
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
                dense={true}
              >
                <ListItem dense={true}>
                  <Typography>Vitamin profile</Typography>
                </ListItem>
                <ListItem dense={true}>
                  <Typography>Kidney/Renal profile</Typography>
                </ListItem>
                <ListItem dense={true}>
                  <Typography>Lipid profile</Typography>
                </ListItem>
                <ListItem dense={true}>
                  <Typography>Thyroid profile</Typography>
                </ListItem>
                <ListItem dense={true}>
                  <Typography>Iron Deficiency profile</Typography>
                </ListItem>
                <ListItem dense={true}>
                  <Typography>Hormone profile</Typography>
                </ListItem>
                <ListItem dense={true}>
                  <Typography>Liver profile</Typography>
                </ListItem>
                <ListItem dense={true}>
                  <Typography>Cardiac Risk profile</Typography>
                </ListItem>
                <ListItem dense={true}>
                  <Typography>Cancer Profile for Male &Female</Typography>
                </ListItem>
                <ListItem dense={true}>
                  <Typography>Hemogram (CBC)</Typography>
                </ListItem>
                <ListItem dense={true}>
                  <Typography>Food intolerance & Food Allergy test</Typography>
                </ListItem>
                <ListItem dense={true}>
                  <Typography>Pregnancy Profile & NIPT test</Typography>
                </ListItem>
                <ListItem dense={true}>
                  <Typography>Basic Health Check-up Package</Typography>
                </ListItem>
                <ListItem dense={true}>
                  <Typography>Extensive Health Check-up Package</Typography>
                </ListItem>
              </List>
            </Box>

            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Detect health problems early on with our comprehensive blood tests
            </Typography>
            <Typography
              sx={{
                fontSize: "0.9rem",
                textAlign: "justify",
              }}
            >
              Regular health check-ups are important for both healthy people and
              people who have health problems in order to keep track of their
              current condition and be cautious about future health risks.
              People in good health can detect problems before they occur, and
              in preventive cases, they can recover and manage diseases before
              they worsen. Health checks aren&apos;t just for people of a
              certain age. There are requirements for children, adults, and the
              elderly. Many people believe that routine medical exams are only
              required if they have a disease and that they should be avoided
              while they are healthy. Our Dubai blood test labs also have
              specialized allergy tests for food sensitivity and food
              intolerance, vitamin tests, and comprehensive health check-up
              packages. Medy offers accurate and trustworthy medical information
              that has been written, reviewed, and validated by our medical
              professionals. Following a diagnosis, our experts recommend the
              best and most reliable medicines, ointments, and over-the-counter
              health products.
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Blood Test/Lab Test in the Comfort Of Your Home
            </Typography>
            <Typography
              sx={{
                fontSize: "0.9rem",
                textAlign: "justify",
              }}
            >
              Medy has the perfect solution to make this process easier for you!
              We&apos;ll be able to take care of everything for you, wherever
              you are, from a routine blood count to an infection detection
              culture test. Select a time and day, and then pay online from the
              convenience of your home or after using our service. Our
              collection representative will visit your location to collect a
              sample while taking all necessary precautions. We will perform the
              necessary tests in our cutting-edge lab. After receiving the
              findings, you can view or download your report online.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default ConsultDoctor;
