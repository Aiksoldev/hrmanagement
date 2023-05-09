const HomeLandingSection = dynamic(() =>
  import("@/components/HomePage/HomeLanding/HomeLandingSection")
);
import dynamic from "next/dynamic";
import React from "react";
import * as cookie from "cookie";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "@/Layouts";
const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
};
const baseUrl = getBaseUrl();
const HomeLanding = (props) => {
  console.log(props)
  return (
    <Layout>
      <HomeLandingSection
        homeproduct={props?.homeproduct}
        count={props?.count}
        title={props?.title}
        page={props?.page}
      />
    </Layout>
  );
};

export default HomeLanding;
export async function getServerSideProps(context) {
  console.log(context.query);
  const parsedCookies = cookie.parse(context.req.headers.cookie);
  const token = parsedCookies?.token;
  console.log(token);
  const { title, page } = context.query;
  let homelandingproduct = [];
  let countproduct = "";
  var qs = require("qs");
  if (title == null) {
    var TypeIsProduct = title;
  } else {
    var TypeIsProduct = title;
  }
  var data = qs.stringify({
    type: TypeIsProduct,
    page: page,
  });
  var config = {
    method: "post",
    url: `${baseUrl}/healthcare/homepagelandinglist`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      console.log(response?.data);
      homelandingproduct = response.data.Homelandingproduct;
      countproduct = response.data.count;
    })
    .catch(function (error) {
      toast.error(error?.response?.data?.message);
    });

  return {
    props: {
      homeproduct: homelandingproduct,
      count: countproduct,
      title: title,
      page: page,
    }, // will be passed to the page component as props
  };
}
