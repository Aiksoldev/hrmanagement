const Layout = dynamic(() => import("@/Layouts"), { ssr: false });
const ProductsDetails = dynamic(
  () => import("@/components/Products/ProductsDetails"),
  { ssr: false }
);

import axios from "axios";
import dynamic from "next/dynamic";

import React from "react";

import { toast } from "react-toastify";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
};
const baseUrl = getBaseUrl();
const Details = ({ product }) => {
  console.log(product);
  return (
    <>
      <Layout>
        <ProductsDetails product={product} />
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  let product = {};
  var qs = require("qs");
  var data = qs.stringify({
    id: context?.query?.slug,
  });
  var config = {
    method: "post",
    url: `${baseUrl}/healthcare/phramcyproductidtogetdetails`,
    headers: {
      //  Authorization: `Bearer ${token}`,
      //  "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      console.log(response?.data?.PharmacyProducts);
      product = response.data.PharmacyProducts;
      //  listData(latlocal, loglocal);
    })
    .catch(function (error) {
      toast.error(error?.response?.data?.message);
    });

  return {
    props: { product }, // will be passed to the page component as props
  };
}

export default Details;
