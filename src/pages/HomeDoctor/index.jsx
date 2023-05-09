import Layout from "@/Layouts";
import HomeDoctorSection from "@/components/HomeDoctor/HomeDoctorSection";
import React from "react";
import * as cookie from "cookie";
import axios from "axios";
import { toast } from "react-toastify";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
};
const baseUrl = getBaseUrl();

const HomeDoctor = (props) => {
  console.log(props);
  return (
    <Layout>
      <HomeDoctorSection imagedata={props?.imagedata} count={props?.count} page={props?.page} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const page = context.query?.page;
  const parsedCookies = cookie.parse(context.req.headers.cookie);
  const token = parsedCookies?.token;
  let imagedata = [];
  let count = "";
  var qs = require("qs");
  var data = qs.stringify({
    page: page ? page : 1,
  });
  var config = {
    method: "post",
    url: `${baseUrl}/healthcare/listdoctorshome`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      imagedata = response.data.doctors;
      count = response.data.doctorscount;
    })
    .catch(function (error) {
      toast.error(error?.response?.data?.message);
    });
  return {
    props: {
      imagedata: imagedata,
      count: count,
      page:page
    }, // will be passed to the page component as props
  };
}

export default HomeDoctor;
