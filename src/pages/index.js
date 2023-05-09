import axios from "axios";
import dynamic from "next/dynamic";
import React from "react";
import { toast } from "react-toastify";
const LandingPage = dynamic(() => import("./LandingPage"), { ssr: false });

const Home = (props) => {
  console.log(props);
  return (
    <div>
      <LandingPage sliderData={props?.homedata} />
    </div>
  );
};

export async function getServerSideProps() {
  var qs = require("qs");
  let homedata = [];
  var data = qs.stringify({
    // longitude: log,
    // latitude: lat
  });
  var config = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API}/healthcare/homepagelistapi`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      if (response.data.status === "1") {
        homedata = response.data.homepagesliders;
        console.log(homedata);
      } else {
        toast.error(response?.data?.message);
      }
    })
    .catch(function (error) {
      toast.error(error?.response?.data?.message);
    });
  return {
    props: { homedata }, // will be passed to the page component as props
  };
}

export default Home;
