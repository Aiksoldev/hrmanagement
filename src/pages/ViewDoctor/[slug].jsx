import Layout from "@/Layouts";
import { Box, Button, ListItem, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState } from "react";
import * as cookie from "cookie";
import Image from "next/image";
import Link from "next/link";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useRouter } from "next/router";
import AvailabilityModal from "@/components/ViewDoctor/AvailabilityModal";
import Ellipse from "../../Assets/Ellipse.png";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      background: theme.palette.grey[100],
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",

      display: "flex",
      flexDirection: "column",

      borderRadius: "10px",
      alignItems: "center",
      padding: "20px",
      background: theme.palette.white.main,
    },
    FieldInRow: {
      width: "100%",
      padding: "15px 20px",
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
      borderRadius: "10px",
    },
    button: {
      padding: "5px 20px",
      background: theme.palette.text.secondary,
      color: theme.palette.white.main,
      borderRadius: "100px",
    },
  };
});

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
};
const baseUrl = getBaseUrl();

const ViewDoctor = (props) => {
  const { profile, skill, education, mark, slug, weeklyslot } = props;
  console.log(weeklyslot);
  const { container, subContainer, FieldInRow, button } = useStyle();
  const history = useRouter();
  const [open, setopen] = useState(false);
  return (
    <Layout>
      <Box className={container}>
        <Box className={subContainer}>
          <Box>
            <Box
              sx={{
                backgroundImage: `url(${Ellipse.src})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "130px",
                width: "130px",
                position: "relative",
                padding: "15px",
              }}
            >
              <Image
                src={profile?.Image}
                alt={profile?.Image}
                width="100"
                height="100"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                  borderRadius: "50%",
                }}
              />
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  padding: "5px",
                  backgroundColor: (theme) => theme.palette.white.main,
                  position: "absolute",
                  bottom: -15,
                  borderRadius: "50%",
                  left: "27%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#25aae1",
                    borderRadius: "50%",
                  }}
                ></Box>
              </Box>
            </Box>
          </Box>
          <Box className={FieldInRow}>
            <Typography>Name</Typography>
            <Typography sx={{ fontWeight: "500" }}>{profile?.Name}</Typography>
          </Box>
          <Box className={FieldInRow}>
            <Typography>Specialization</Typography>
            <Box>
              {skill?.map((item, i) => {
                return (
                  <Box
                    key={i}
                    sx={{
                      padding: "3px 10px",
                      background: "#daedfd",
                      borderRadius: "15px",
                    }}
                  >
                    {item}
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box className={FieldInRow}>
            <Typography> Hospital Name</Typography>
            <Typography sx={{ fontWeight: "500" }}>
              {profile?.hospitalname}
            </Typography>
          </Box>
          <Box className={FieldInRow}>
            <Typography>Qualification</Typography>
            <Box>
              {education?.map((item, i) => {
                return (
                  <Box
                    key={i}
                    sx={{
                      padding: "3px 10px",
                    }}
                  >
                    {item?.title}
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box className={FieldInRow}>
            <Typography>Experience</Typography>
            <Typography sx={{ fontWeight: "500" }}>
              {profile?.Experience}
            </Typography>
          </Box>
          <Box className={FieldInRow}>
            <Typography>Consultation Availability</Typography>
            <Typography
              sx={{ fontWeight: "500", cursor: "pointer" }}
              color={"primary"}
              onClick={() => {
                setopen(true);
              }}
            >
              View
            </Typography>
          </Box>
          <Box className={FieldInRow} sx={{ background: "#daedfd " }}>
            <Typography> Consultation Fee</Typography>
            <Typography sx={{ fontWeight: "500" }}>
              {profile.Consultation_fee}
            </Typography>
          </Box>
          <Box className={FieldInRow}>
            <Typography></Typography>
            <Typography sx={{ fontWeight: "500" }} color={"primary"}>
              <Link
                href={{
                  pathname: "/Signin",
                  query: { id: slug },
                }}
              >
                Write a review
              </Link>
            </Typography>
          </Box>
          <Box className={FieldInRow}>
            <Typography></Typography>
            <Button
              className={button}
              onClick={() => {
                history.push("/Signin");
              }}
            >
              <Typography
                variant="h6"
                color={"inherit"}
                sx={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                Book An Appointment{" "}
                <ArrowRightAltIcon color="inherit" sx={{ fontSize: "45px" }} />
              </Typography>
            </Button>
          </Box>
        </Box>
        <AvailabilityModal
          open={open}
          setopen={setopen}
          weeklyslot={weeklyslot}
        />
      </Box>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const slug = context.query?.slug;
  const parsedCookies = cookie.parse(context.req.headers.cookie);
  const token = parsedCookies?.token;
  console.log(slug);
  let profile = {};
  let skill = {};
  let education = {};
  let Availability = {};
  let weeklyslot = {};
  let mark = [];
  var qs = require("qs");
  var data = qs.stringify({
    doctor_id: slug,
    skills_id: "",
    searchdoctor: 3,
  });

  var dataslot = qs.stringify({
    doctor_id: slug,
  });

  var configDashboard = {
    method: "post",
    url: `${baseUrl}/healthcare/listdoctorslotweekly
        `,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: dataslot,
  };

  var config = {
    method: "post",
    url: `${baseUrl}/healthcare/doctorlisting`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  await axios(configDashboard)
    .then(async function (response) {
      let dict = [];
      for (var i = 0; i < response.data.timeslots.length; i++) {
        if (response.data.timeslots[i].status == "Open") {
          for (var j = 0; j < response.data.timeslots[i].date.length; j++) {
            dict.push(response.data.timeslots[i].date[j]);
          }
        }
      }
      mark = dict;
    })
    .catch(function (error) {
      toast.error(error?.response?.data?.message);
    });

  await axios(config)
    .then(function (response) {
      profile = response.data.DoctorDetails[0];
      skill = response.data.DoctorDetails[0].Skills;
      education = response.data.DoctorDetails[0].EducationsDetails_data;
      response.data.Availability.map((item) => {
        if (item.Monday) {
          weeklyslot.Monday = item?.Monday;
          // setMondaySlotArray(item.Monday);
          if (item.Monday[0].status === "Open") {
            Availability.Monday = true;
          } else {
            Availability.Monday = false;
          }
        } else if (item.Tuesday) {
          weeklyslot.Tuesday = item?.Tuesday;

          // setTuesdaySlotArray(item.Tuesday);
          if (item.Tuesday[0].status === "Open") {
            // setChktus(true);
            Availability.Tuesday = true;
          } else {
            Availability.Tuesday = true;

            // setChktus(false);
          }
        } else if (item.Wednesday) {
          weeklyslot.Wednesday = item?.Wednesday;

          // setWednesdaySlotArray(item.Wednesday);
          if (item.Wednesday[0].status === "Open") {
            // setChkwed(true);
            Availability.Wednesday = true;
          } else {
            // setChkwed(false);
            Availability.Wednesday = false;
          }
        } else if (item.Thursday) {
          weeklyslot.Thursday = item?.Thursday;

          // setThursdaySlotArray(item.Thursday);
          if (item.Thursday[0].status === "Open") {
            // setChkthu(true);
            Availability.Thursday = true;
          } else {
            // setChkthu(false);
            Availability.Thursday = false;
          }
        } else if (item.Friday) {
          // setFridaySlotArray(item.Friday);
          weeklyslot.Friday = item?.Friday;

          if (item.Friday[0].status === "Open") {
            // setChkfri(true);
            Availability.Friday = true;
          } else {
            // setChkfri(false);
            Availability.Friday = false;
          }
        } else if (item.Saturday) {
          // setSaturdaySlotArray(item.Saturday);
          weeklyslot.Saturday = item?.Saturday;

          if (item.Saturday[0].status === "Open") {
            // setChksat(true);
            Availability.Saturday = true;
          } else {
            // setChksat(false);
            Availability.Saturday = false;
          }
        } else if (item.Sunday) {
          // setSundaySlotArray(item.Sunday);
          weeklyslot.Sunday = item?.Sunday;

          if (item.Sunday[0].status === "Open") {
            // setChksun(true);
            Availability.Sunday = true;
          } else {
            // setChksun(false);
            Availability.Sunday = false;
          }
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  return {
    props: {
      profile,
      skill,
      education,
      Availability,
      mark,
      slug,
      weeklyslot,
    }, // will be passed to the page component as props
  };
}

export default ViewDoctor;
