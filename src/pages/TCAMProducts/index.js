import dynamic from "next/dynamic";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TCAMProducts = dynamic(() => import("@/components/Others/TCAMProducts"), {
  ssr: false,
});
const index = ({ tcamproducts, productphotosurl }) => {
  return (
    <TCAMProducts
      tcamproducts={tcamproducts}
      productphotosurl={productphotosurl}
    />
  );
};
export async function getServerSideProps(context) {
  const { query } = context;

  let productphotosurl = "";
  let tcamproducts = [];
  var qs = require("qs");
  let data = qs.stringify({
    type: query?.id,
    id: query.Products_id,
    page: 1,
  });

  var config = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API}/healthcare/tcampartnerproduct`,
    headers: {
      //   Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      console.log(response.data?.listtcam);

      tcamproducts = response.data?.tcamproducts;
      productphotosurl = response.data?.productphotosurl;
    })
    .catch(function (error) {
      toast.error(error?.response?.data?.message);
    });

  return {
    props: { tcamproducts, productphotosurl }, // will be passed to the page component as props
  };
}
export default index;
