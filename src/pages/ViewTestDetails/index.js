import dynamic from "next/dynamic";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LabTestDetails = dynamic(
  () => import("@/components/LabTestDetails/LabTestDetails"),
  { ssr: false }
);
const index = ({ labTestList, labTestCount }) => {
  return (
    <LabTestDetails labTestList={labTestList} labTestCount={labTestCount} />
  );
};
export async function getServerSideProps() {
  var qs = require("qs");
  let labTestCount = 0;
  let labTestList = [];

  var data = qs.stringify({
    id: "",
    page: 1,
    lab_id: "",
    type: "",
  });
  var config = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API}/healthcare/listlabstestdata`,
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      labTestList = response.data.listlabstest;
      labTestCount = response.data.labstestcount;
    })
    .catch(function (error) {
      toast.error(error?.response?.data?.message);
    });

  ////////////////////////////////////////

  return {
    props: { labTestCount, labTestList }, // will be passed to the page component as props
  };
}
export default index;
