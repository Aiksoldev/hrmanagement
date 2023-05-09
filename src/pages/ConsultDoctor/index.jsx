const ConsultDoctor = dynamic(
  () => import("@/components/ConsultDoctor/ConsultDoctor"),
  { ssr: false }
);
import dynamic from "next/dynamic";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const index = ({ userDetails, userSkillsPhotoUrl, userSkills }) => {
  return (
    <ConsultDoctor
      userSkills={userSkills}
      userSkillsPhotoUrl={userSkillsPhotoUrl}
      userDetails={userDetails}
    />
  );
};

export async function getServerSideProps() {
  var qs = require("qs");
  let userSkills = [];
  let userSkillsPhotoUrl = "";
  let userDetails = [];
  let token = "";

  var config1 = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API}/healthcare/listuserskills`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  await axios(config1)
    .then(function (response) {
      userSkills = response.data.UserSkillsList;
      userSkillsPhotoUrl = response.data.Skillphotosurl;
    })
    .catch(function (error) {
      toast.error(error?.response?.data?.message);
    });

  var qsData = require("qs");
  var listData = qsData.stringify({
    id: "",
  });
  var listConfig = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API}/healthcare/listprofile`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: listData,
  };

  await axios(listConfig)
    .then(function (response) {
      userDetails = response.data.UserDeatils[0];
    })
    .catch(function (error) {
      toast.error(error?.response?.data?.message);
    });
  return {
    props: { userSkills, userSkillsPhotoUrl, userDetails }, // will be passed to the page component as props
  };
}
export default index;
