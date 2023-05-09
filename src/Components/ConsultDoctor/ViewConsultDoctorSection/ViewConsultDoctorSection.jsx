import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Geocode from "react-geocode";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress } from "react-google-places-autocomplete";
import DoctorCard from "@/components/Cards/DoctorCard";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      padding: "40px 20px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    InputFieldContainer: {
      width: "100%",

      display: "flex",
      gap: "20px",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cardContainer: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      flexWrap: "wrap",
    },
  };
});

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
};

const baseUrl = getBaseUrl();
const cookies = new Cookies();
const ViewConsultDoctorSection = ({ params }) => {
  console.log(params);
  const { container, InputFieldContainer, cardContainer } = useStyle();
  const [hospital, sethospital] = useState("");
  const role_id = cookies.get("role_id");
  const token = cookies.get("token");
  const datavalue = params.title;
  const [image, setImage] = useState([]);
  const [list, setList] = useState("none");
  const [serachDoctor, setSerachDoctor] = useState();
  const [searchHospital, setSerachHospital] = useState([]);
  const [longitude, setlongitude] = useState();
  const [latitude, setlatitude] = useState();
  const [isActive, setisActive] = useState(true);
  const [value, setValue] = useState(null);

  var searchKey = 0;
  function handleChange(e) {
    setSerachDoctor(e.target.value);
    searchKey = 1;
    doctorlisting(longitude, latitude, e.target.value);
  }
  function handlehospitalChange(e) {
    sethospital(e.target.value);
    searchlisthospital(e.target.value);
    setList("block");
  }

  const handleValue = (event) => {
    datalatlng = [];
    setValue(event);
    Geocode.setApiKey("AIzaSyCBMKz54vZuIMG7KAl0rkwBqrf0g-du02c");
    Geocode.fromAddress(event.value.description).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        geocodeByAddress(event.value.description);
        doctorlisting(lng, lat, "location");
      },
      (error) => {
        console.log("error  msg here", error);
      }
    );
  };
  const successPosition = async (position) => {
    doctorlisting(position.coords.longitude, position.coords.latitude);
    setlatitude(position.coords.latitude);
    setlongitude(position.coords.longitude);

    Geocode.setApiKey(process.env.REACT_APP_MAP_KEYS);
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.enableDebug();
    Geocode.fromLatLng(
      position.coords.latitude,
      position.coords.longitude
    ).then(
      (response) => {
        const formatted_address = response.results[0].formatted_address;
        setAddValue(formatted_address);
      },
      (error) => {
        console.error("error", error);
      }
    );
  };

  const getCurrentLoaction = () => {
    if ("geolocation" in navigator) {
      // navigator.geolocation.getCurrentPosition(getCoor, errorCoor, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
      navigator.geolocation.getCurrentPosition(
        (pos) => successPosition(pos)
        // (err) => deniedPosition(err),
      );
    } else {
      alert("Your Browser doesn't support location service !");
    }
  };
  useEffect(() => {
    getCurrentLoaction();
  }, []);
  const handleConsultDr = (item) => {
    if (role_id == 3) {
      history.push({
        pathname: `/dashboard/doctor-information`,
        state: { id: item.slug, rescheduletype: searchskill.type },
      });
      window.localStorage.setItem(
        "doctor_url",
        "/dashboard/doctor-information?id"
      );
      window.localStorage.setItem(
        "url",
        `/dashboard/doctor-information?id=${item.slug}`
      );
    } else {
      history.push({ pathname: `/login` });
    }
  };

  var datalatlng = [];
  async function getLocation(name, lat, lng, address) {
    if (lat === undefined) {
    } else {
      var latitudeloc = lat.coordinates[0];
      var longitudeloc = lng.coordinates[1];
    }
    var lat = latitudeloc;
    var lng = longitudeloc;
    datalatlng = [...datalatlng, { add: { lat, lng }, name, address }];
    setlocation(datalatlng);
  }

  setTimeout(() => {
    setisActive(false);
  }, 2000);

  function handleSendOffer(e, id, name, type) {
    if (type === "hospital") {
      sethospital(name);
      setList("none");
      setSerachHospital([]);
    } else {
      setSerachHospital([]);
    }
    var qs = require("qs");
    let data = null;
    if (type === "hospital") {
      data = qs.stringify({
        skills_id: "",
        hospital_id: id,
        searchdoctor: 5,
      });
    } else {
      data = qs.stringify({
        skills_id: id,
        longitude: longitude,
        latitude: latitude,
      });
    }

    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/doctorlisting`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.status === "1") {
          setImage(response.data.DoctorDetails);
          setName(response.data.DoctorDetails);
        }
      })
      .catch(function (error) {
        console.log(error);
        // toast.error("Please enter valid data.");
      });
  }
  function searchlisthospital(text) {
    var qs = require("qs");
    var data = qs.stringify({
      searchkey: text,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/adminSearchHospitaldata`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setSerachHospital(response.data.listhospital);
      })
      .catch(function (error) {
        console.log(error);
        // toast.error("Please enter valid data.");
      });
  }
  function searchlistskills(skillname) {
    var qs = require("qs");
    var data = qs.stringify({
      Searchskillnamekey: skillname,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/searchlistskills`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setsearchData(response.data.UserSkillsList);
      })
      .catch(function (error) {
        console.log(error);
        // toast.error("Please enter valid data.");
      });
  }

  function doctorlisting(log, lat, name) {
    var qs = require("qs");
    let data = null;
    if (name === undefined) {
      data = qs.stringify({
        skills_id: datavalue,
        searchdoctor: searchKey,
        longitude: log,
        latitude: lat,
      });
    } else if (name === "location") {
      console.log("aa");
      data = qs.stringify({
        skills_id: datavalue,
        searchdoctor: "location",
        longitude: log,
        latitude: lat,
      });
    } else {
      data = qs.stringify({
        skills_id: "",
        searchdoctor: searchKey,
        searchnamekey: name,
        longitude: log,
        latitude: lat,
      });
    }
    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/doctorlisting`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(async function (response) {
        if (response.data.status === "1") {
          // if(searchKey==0){
          //   SetskillName(response?.data?.skill_name);
          // }
          setImage(response?.data?.DoctorDetails);
          setName(response?.data?.DoctorDetails);
          response.data.DoctorDetails.map((x) =>
            getLocation(`${x.Name}`, x.location, x.location, x.address)
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const resetClick = () => {
    setValue("");
    setSerachDoctor("");

    sethospital([]);

    searchKey = 0;
    doctorlisting(longitude, latitude);
  };
  console.log(image);
  return (
    <Box className={container}>
      <Box className={InputFieldContainer}>
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
            position: "relative",
          }}
        >
          <TextField
            fullWidth
            value={hospital}
            InputProps={{ style: { borderRadius: "100px" } }}
            placeholder="Search Hospital Name"
            onChange={(e) => {
              handlehospitalChange(e);
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              top: "60px",
              background: "white !important",
              zIndex: "100",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              border:
                searchHospital.length > 0
                  ? (theme) => `1px solid ${theme.palette.grey[300]}`
                  : "none",
            }}
          >
            {searchHospital?.map((data, i) => {
              return (
                <Typography
                  key={i}
                  sx={{ padding: "0px 10px", cursor: "pointer" }}
                  onClick={(e) =>
                    handleSendOffer(e, data.id, data.name, "hospital")
                  }
                >
                  {data?.name}
                </Typography>
              );
            })}
          </Box>
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
            onChange={(e) => handleChange(e)}
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
      <Box className={cardContainer}>
        {image.length > 0
          ? image?.map((data, i) => {
              return <DoctorCard key={i} doctor={data} link={"/Signin"} />;
            })
          : "The doctors seem to have lost their stethoscope, please be patient till we help them find it."}
      </Box>
    </Box>
  );
};

export default ViewConsultDoctorSection;
