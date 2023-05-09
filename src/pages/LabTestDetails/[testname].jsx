import dynamic from "next/dynamic";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TestDetailPage = dynamic(
  () => import("@/components/LabTestDetails/TestDetailPage"),
  { ssr: false }
);
const index = ({ testDetail }) => {
  return <TestDetailPage testDetail={testDetail} />;
};
export async function getServerSideProps(context) {
  var qs = require("qs");
  const { query } = context;

  var qs = require("qs");
  var testDetail = null;
  var data = qs.stringify({
    id: query?.testname,
  });
  var config = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API}/healthcare/viewlabtestdetails`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      testDetail = response.data.listlabstest[0];
    })
    .catch(function (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    });

  return {
    props: { testDetail }, // will be passed to the page component as props
  };
}
export default index;
