import dynamic from "next/dynamic";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TCAMPublishings = dynamic(
  () => import("@/components/Others/TCAMPublishings"),
  {
    ssr: false,
  }
);
const index = ({ listblog, blogcount }) => {
  return <TCAMPublishings listblog={listblog} blogcount={blogcount} />;
};
export async function getServerSideProps(context) {
  const { query } = context;

  let blogcount = "";
  let listblog = [];
  var qs = require("qs");
  let data = qs.stringify({
    type: query?.id,
    page: 1,
  });

  var config = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API}/healthcare/tcampartnerpublishing`,
    headers: {
      //   Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      listblog = response.data?.listblog;
      blogcount = response.data?.blogcount;
    })
    .catch(function (error) {
      toast.error(error?.response?.data?.message);
    });

  return {
    props: { listblog, blogcount }, // will be passed to the page component as props
  };
}
export default index;
