import dynamic from "next/dynamic";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Tabs = dynamic(() => import("@/components/Tabs"), {
  ssr: false,
});
const index = ({
  limit,
  listproductcount,
  pharmacyorderdatalist,
  productcountt,
}) => {
  console.log("dasasds");
  console.log(pharmacyorderdatalist);
  console.log(listproductcount);
  console.log(productcountt);
  console.log(limit);
  return (
    <Tabs
      limit={limit}
      listproductcount={listproductcount}
      pharmacyorderdatalist={pharmacyorderdatalist}
      productcountt={productcountt}
    />
  );
};
export async function getServerSideProps(context) {
  const { query } = context;

  let limit = 10;
  let listproductcount = 0;
  let pharmacyorderdatalist = [];
  let productcount = 0;
  var qs = require("qs");
  let data = qs.stringify({
    user_id: "63c7ee54272e08883cc809e5",
    checkstatus: query?.Status || "All",
    page: 1,
  });

  var config = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API}/healthcare/listpharmacygrouporders`,
    headers: {
      //   Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      console.log(response?.data);
      limit = response.data?.limit;
      listproductcount = response.data?.listproductcount;
      pharmacyorderdatalist = response.data?.pharmacyorderdatalist;
      productcount = response.data?.productcount;
    })
    .catch(function (error) {
      toast.error(error?.response?.data?.message);
    });

  return {
    props: { limit, listproductcount, pharmacyorderdatalist, productcount }, // will be passed to the page component as props
  };
}
export default index;
