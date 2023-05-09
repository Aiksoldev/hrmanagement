const Layout = dynamic(() => import("@/Layouts"), { ssr: false });
const BlogListSection = dynamic(
  () => import("@/components/Blogs/BlogListSection"),
  { ssr: false }
);

import axios from "axios";
import dynamic from "next/dynamic";
import React from "react";
const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
};
const baseUrl = getBaseUrl();

const BlogList = ({ BlogData }) => {
  return (
    <Layout>
      <BlogListSection BlogData={BlogData} />
    </Layout>
  );
};

export default BlogList;

export async function getServerSideProps(context) {
  var qs = require("qs");
  let BlogData = [];
  var data = qs.stringify({
    type: context?.query?.type || "Image",
    blogtype: "",
  });
  var config = {
    method: "post",
    url: `${baseUrl}/healthcare/listhealthcorner`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      BlogData = response.data.listblog;
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  return {
    props: { BlogData }, // will be passed to the page component as props
  };
}
