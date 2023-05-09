import dynamic from "next/dynamic";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TCAMPartnerProfile = dynamic(
  () => import("@/components/Others/TCAMPartnerProfile"),
  { ssr: false }
);
const index = ({ doctorData, Paginationcount, Description, tcamImage }) => {
  return (
    <TCAMPartnerProfile
      doctorData={doctorData || []}
      Paginationcount={Paginationcount || 0}
      Description={Description || ""}
      tcamImage={tcamImage || []}
    />
  );
};
export async function getServerSideProps(context) {
  var qs = require("qs");
  const { query } = context;
  let doctorData = [];
  let Paginationcount = 0;
  let Description = "";
  let tcamImage = "";
  var qs = require("qs");
  var data = qs.stringify({
    id: query?.id,
  });
  var config = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API}/healthcare/tcampartnerprofiles`,
    headers: {
      //   Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      doctorData = response.data?.listtcam;
      Paginationcount = response.data?.count;
      Description = response.data?.description;
      tcamImage = response.data?.tcam_image;
    })
    .catch(function (error) {
      toast.error(error?.response?.data?.message);
    });

  return {
    props: { doctorData, Paginationcount, Description, tcamImage }, // will be passed to the page component as props
  };
}
export default index;
