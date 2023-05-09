"use client";
import dynamic from "next/dynamic";
import React from "react";
const  Footer = dynamic(()=>import("../components/Footer/Footer"),{ssr:false})  
const Header = dynamic(() => import("@/components/Header"), { ssr: false });  


const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  console.log("hello");
  return {
    props: { message: `Next.js is awesome` }, // will be passed to the page component as props
  };
}

export default Layout;
