import dynamic from "next/dynamic";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TCAMPromotions = dynamic(
  () => import("@/components/Others/TCAMPromotions"),
  {
    ssr: false,
  }
);
const index = ({ listpromotion, count }) => {
  return <TCAMPromotions listpromotion={listpromotion} count={count} />;
};
export async function getServerSideProps(context) {
  const { query } = context;

  let count = "";
  let listpromotion = [];
  var qs = require("qs");
  let data = qs.stringify({
    role_id: query?.id,
  });

  var config = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API}/healthcare/listtcampromotions`,
    headers: {
      //   Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      listpromotion = response.data?.listpromotion;
      count = response.data?.count;
    })
    .catch(function (error) {
      toast.error(error?.response?.data?.message);
    });

  return {
    props: { listpromotion, count }, // will be passed to the page component as props
  };
}
export default index;
