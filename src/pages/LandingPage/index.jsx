import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
import Geocode from "react-geocode";
const Layout = dynamic(() => import("../../Layouts", { ssr: false }));
import HomeSlider from "@/components/HomePage/HomeSlider";
import { store } from "@/Store";
import axios from "axios";
import HealthProducts from "@/components/HomePage/HealthProducts";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
const useStyle = makeStyles(() => {
  return {
    container: {
      width: "100%",
    },
  };
});

const HomePageSlider = [
  {
    slider_image:
      "https://test.medy.ae/api/uploads/homepageslider/slider_image-1660729117415.jpg",
  },
  {
    slider_image:
      "https://test.medy.ae/api/uploads/homepageslider/slider_image-1681721290751.jpg",
  },
];

const LandingPage = ({ sliderData }) => {
  const { container } = useStyle();

  const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
  };
  const baseUrl = getBaseUrl();
  // const token = window.localStorage.getItem("token");
  const [allData, setAllData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [yourdoctor, setYourDoctors] = useState([]);
  const [listcam, setListCam] = useState([]);
  const [addvalueaddresses, setAddValue] = useState();
  const [Homepagelat, setHomepagelat] = useState();
  const [Homepagelog, setHomepagelog] = useState();
  const [HomepageId, setHomepageId] = useState();
  const [labtest, setLabTest] = useState([]);

  const [homePageSlider, setHomePageSlider] = useState([]);
  const [offer, setOffer] = useState([]);
  const [DealOfDay, setDealOfDay] = useState([]);
  let id = localStorage.getItem("id");
  let role_id = localStorage.getItem("role_id");
  const [sessionId, setSessionId] = useState(null);
  const [state, dispatch] = useContext(store);
  const successPosition = async (position) => {
    ipAdd(position.coords.longitude, position.coords.latitude);
    // setlatitude(position.coords.latitude);
    // setlongitude(position.coords.longitude);
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
        console.error("a");
      }
    );
  };
  const getCurrentLoaction = () => {
    if ("geolocation" in navigator) {
      // navigator.geolocation.getCurrentPosition(getCoor, errorCoor, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
      navigator.geolocation.getCurrentPosition(
        (pos) => successPosition(pos),
        (err) => deniedPosition(err)
      );
    } else {
      alert("Your Browser doesn't support location service !");
    }
  };
  const deniedPosition = (error) => {
    ipAdd();
    // alert(
    //   "You denied to location permission,\nAllow the permission from browser's settings or add your address manually."
    // );
  };

  useEffect(() => {
    getCurrentLoaction();
  }, []);

  async function ipAdd(log, lat) {
    let uid;
    let cartValue = id;
    let locdata = log;
    let latdata = lat;
    let ipData = window.localStorage.getItem("IP");

    if (ipData === null) {
      uid = uuidv4();
      uid = uid.replace(/-|\s/g, "");
      dispatch({
        type: "ADD_UID",
        payload: { uid: uid },
      });
      setSessionId(uid);
      ipData = uid;
      window.localStorage.setItem("IP", uid);
    } else {
      dispatch({
        type: "ADD_UID",
        payload: { uid: ipData },
      });
      setSessionId(ipData);
    }

    if (role_id === null) {
      cartValue = ipData;
    }

    var qs = require("qs");
    var data = qs.stringify({
      user_session_id: cartValue,
      longitude: log,
      latitude: lat,
    });
    window.localStorage.setItem("log", log);
    window.localStorage.setItem("lat", lat);
    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/homepageproductlist`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        if (response.data.status === "1") {
          setHomepagelat(log);
          setHomepagelog(lat);
          setHomepageId(cartValue);
          setBlogData(response.data.blogdata);
          setYourDoctors(response.data.yourdoctor);
          setListCam(response.data.listtcam);
          setLabTest(response.data.yourlabtest);
          setAllData(response.data.data);
          //
          // setHomePageSlider(response.data.homepagesliders)
          setOffer(response.data.offersproducts);
          setDealOfDay(response.data.DealOfDay);
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });

    var qs1 = require("qs");
    var dataId = qs1.stringify({
      id: cartValue,
    });

    var configWishList = {
      method: "post",
      url: `${baseUrl}/healthcare/listcartitemscount`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: dataId,
    };

    axios(configWishList)
      .then(function (response) {
        if (response.data.status === "1") {
          window.localStorage.setItem(
            "wishlist",
            response.data.wishlistlistcount
          );

          dispatch({
            type: "ADD_WISHLISTCOUNT",
            payload: { wishListCount: response.data.wishlistlistcount },
          });
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  }

  return (
    <Layout>
      <Box className={container}>
        <HomeSlider HomePageSlider={sliderData} />
        <HealthProducts
          AllData={allData}
          BlogData={blogData}
          YourDoctors={yourdoctor}
          listcam={listcam}
          LabTest={labtest}
          Offer={offer}
          Id={HomepageId}
          lat={Homepagelat}
          log={Homepagelog}
          DealOfDay={DealOfDay}
        />
      </Box>
    </Layout>
  );
};

export default LandingPage;
