import Layout from "@/Layouts";
import BlogDetailsSection from "@/components/Blogs/BlogDetailsSection";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

const BlogDetails = (props) => {
  console.log(props);
  const router = useRouter();
  console.log(router.query);
  return (
    <Layout>
      <BlogDetailsSection recent={props?.recent} blogdata={props?.blogdata} />
    </Layout>
  );
};

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
};
const baseUrl = getBaseUrl();

export async function getServerSideProps(context) {
  console.log(context.query);
  console.log("hello");
  let blogdata = {};
  let recentblogs = {};
  var qs = require("qs");
  var data = qs.stringify({
    id: context.query?.slug,
    type: "blog",
    page: "",
  });
  var config = {
    method: "post",
    url: `${baseUrl}/healthcare/listblogdata`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      console.log(response.data.listblog);
      blogdata = response.data.listblog;
    })
    .catch(function (error) {
      console.log(error);
    });

  var dataRecent = qs.stringify({
    id: "",
    type: "blog",
    page: "",
  });
  var configRecent = {
    method: "post",
    url: `${baseUrl}/healthcare/listblogdata`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: dataRecent,
  };

  await axios(configRecent)
    .then(function (response) {
      console.log(response.data.listblog);
      recentblogs = response.data.listblog;
    })
    .catch(function (error) {
      console.log(error);
    });

  return {
    props: {
      recent: recentblogs,
      blogdata: blogdata,
    }, // will be passed to the page component as props
  };
}

export default BlogDetails;
