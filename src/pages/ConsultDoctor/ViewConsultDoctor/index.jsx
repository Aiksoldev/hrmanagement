import React from "react";
import * as cookie from "cookie";
import Layout from "@/Layouts";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const ViewConsultDoctorSection = dynamic(
  () =>
    import(
      "@/components/ConsultDoctor/ViewConsultDoctorSection/ViewConsultDoctorSection"
    ),
  { ssr: false }
);

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
};
const baseUrl = getBaseUrl();

const ViewConsultDoctor = (props) => {
  const router = useRouter()
 
  return (
    <Layout>
      <ViewConsultDoctorSection params={router?.query} />
    </Layout>
  );
};

export default ViewConsultDoctor;
