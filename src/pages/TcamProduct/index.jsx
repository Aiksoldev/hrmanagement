import dynamic from "next/dynamic";
import React from "react";
const Layout = dynamic(() => import("@/Layouts"), { ssr: true });
const TcamProduct = () => {
  return (
    <Layout>
      <div>TcamProduct</div>
    </Layout>
  );
};

export default TcamProduct;
