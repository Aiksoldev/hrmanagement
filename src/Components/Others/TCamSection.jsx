"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import others from "../../Assets/PageHeaders/others.png";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { getLocalItems } from "@/components/ExportLocalItems/ExportLocalItem";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

const Layout = dynamic(() => import("@/Layouts"), { ssr: true });

const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "50px",
      width: "100%",
      maxWidth: "1280px",
      padding: "20px",
    },
    cardsContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
      flexWrap: "wrap",
      width: "100%",
    },
    TypoContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "2px",
    },
  };
});

const TCamSection = () => {
  const { container, contentContainer, cardsContainer, TypoContainer } =
    useStyle();
  const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
  };
  const baseUrl = getBaseUrl();
  const token = window.localStorage.getItem("token");
  const [Tcam, setTcam] = useState([]);
  let history = useRouter();

  useEffect(() => {
    homelisting();
  }, []);

  function homelisting() {
    var qs = require("qs");
    var data = qs.stringify({});
    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/listAdminTcamData`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.data.status === "1") {
          setTcam(response.data.listtcam);
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  }

  function handleClick(name, Packages_id, Products_id, Data, TcamName) {
    // history.push({
    //   pathname: `/landingothers/${name}`,
    //   state: {
    //     Packages_id: Packages_id,
    //     Products_id:Products_id
    //   },
    //   target: "_blank",
    // });
    console.log("TcamName inside others", Data);
    history.push({
      pathname: `/TCAMPartnerProfile`,
      query: {
        id: Data,
        TcamName: TcamName,
        Packages_id: Packages_id,
        Products_id: Products_id,
      },

      target: "_blank",
    });
  }

  return (
    <Layout>
      <Box className={container}>
        <Box className={contentContainer}>
          <Box>
            <Image
              src={others}
              alt={"medy"}
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            />
          </Box>
          <Box className={cardsContainer}>
            {Tcam?.map((data, i) => {
              return (
                <Box
                  key={i}
                  class="flip-box"
                  onClick={() => {
                    handleClick(
                      data.navigation,
                      data.Packages_id,
                      data.Products_id,
                      data.roleis,
                      data.name
                    );
                  }}
                >
                  <Box class="flip-box-inner">
                    <Box class="flip-box-front">
                      <Image
                        src={data?.image}
                        alt={data?.description}
                        width={1000}
                        height={1000}
                        style={{
                          width: "100%",
                          maxWidth: "200px",
                          height: "100%",
                        }}
                      />
                    </Box>
                    <Box class="flip-box-back">
                      <p>{data.description}</p>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box className={TypoContainer}>
            <Typography>
              Our TCAM services offer a range of treatments that combine modern
              medicine with traditional healing methods, providing you with
              holistic care that supports your overall health and wellness. The
              team of experienced and licensed healthcare professionals trained
              in TCAM services will provide you with the best and highest
              quality of care.
              <br /> Our comprehensive range of TCAM services includes treatment
              by acupuncture, herbal medicine, meditation, and more. These
              practices are effective in treating a wide range of health issues,
              from chronic illness to mental health concerns.
              <br /> We understand that every individual has unique health
              needs, and that’s why we offer holistic services tailored to your
              health concerns. The services are safe and can be used in
              conjunction with conventional medical treatments. We strive to
              provide the highest quality of care, with services tailored to
              each individual’s needs and preferences. The TCAM services are not
              only effective but also affordable.
              <br /> At Medy, we believe in a holistic approach to healthcare
              that addresses the physical, mental, and emotional well-being of
              patients. Don’t let health concerns hold you back. Explore our
              TCAM services today and discover the many benefits of traditional
              and alternative healing practices.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default TCamSection;
