import SoftwareCard from "@/Components/Cards/SoftwareCard";
import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import f1 from "../../../Assets/feature/f1.png";
import f2 from "../../../Assets/feature/f2.png";
import f3 from "../../../Assets/feature/f3.png";
import f4 from "../../../Assets/feature/f4.png";
import f5 from "../../../Assets/feature/f5.png";
import f6 from "../../../Assets/feature/f6.png";
import f7 from "../../../Assets/feature/f7.png";
import f8 from "../../../Assets/feature/f8.png";
import access from "../../../Assets/feature/access.jpg";
import com from "../../../Assets/feature/com.png";
import rep from "../../../Assets/feature/rep.png";
import FeatureCard from "@/Components/Cards/FeatureCard";
import { Fade } from "react-awesome-reveal";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "50px 20px",
      [theme.breakpoints.down('md')]:{
        padding:'10px'
      }
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      alignItems: "center",
    },
    headingContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      alignItems: "center",
      textAlign: "center",
    },
    contentContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      padding: "50px 0px",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    },
    divider: {
      width: "150px",
      height: "2px",
      background: theme.palette.grey[500],
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    innerDivider: {
      width: "50px",
      height: "4px",
      position: "absolute",
      top: "-1px",
      background: theme.palette.grey[800],
    },
    Typo: {
      color: theme.palette.grey[600],
    },
  };
});

const BenefitAndFeature = () => {
  const {
    container,
    subContainer,
    headingContainer,
    contentContainer,
    divider,
    innerDivider,
    Typo,
  } = useStyle();
  const [cardData] = useState([
    {
      img: f1,
      title: "All in one HR Solution",
      desc: "From Payroll to Performance Management, We've Got You Covered",
    },
    {
      img: f2,
      title: "Time and attendance tracking",
      desc: "Track employee hours and attendance with ease.",
    },
    {
      img: f3,
      title: "Easy employee onboarding",
      desc: "Add new employees to your database in seconds.",
    },
    {
      img: f4,
      title: "Employee performance monitoring",
      desc: "Keep track of employee performance and progress",
    },
    {
      img: f5,
      title: "Ticket management for query resolution",
      desc: "Resolve employee queries and issues in a timely manner.",
    },
    {
      img: f6,
      title: "Streamlined subscription management",
      desc: "Manage employee subscriptions and benefits effortlessly.",
    },
    {
      img: f7,
      title: "Task assignment and tracking",
      desc: "Assign and track employee tasks to stay on top of deadlines.",
    },
    {
      img: f8,
      title: "Quick access to employee records and history",
      desc: "Quick access to employee records and history",
    },
    {
      img: com,
      title: "Roles and communication management",
      desc: "Define and assign roles for streamlined communication and processing.",
    },
    {
      img: rep,
      title: "Customizable report generation",
      desc: "Generate customized reports for deeper insights",
    },
    {
      img: f1,
      title: "Leave management and time off requests.",
      desc: "Manage employee leave and time off requests efficiently.",
    },
    {
      img: access,
      title: "Access anytime, anywhere",
      desc: "Mobile Ready, use from any device anywhere",
    },

    {
      img: f2,
      title: "Cost-effective",
      desc: "Pay as you go, simplified payment methods",
    },
    {
      img: f6,
      title: "Secure",
      desc: "SSL, 2- Factor Authentication and lot more",
    },
    {
      img: f3,
      title: "Instant Notifications",
      desc: "Send / Receive instant notifications",
    },
    {
      img: f7,
      title: "Mobile Ready",
      desc: "Be smart and available all the time.",
    },
  ]);
  return (
    <>
      <Box className={container}>
        <Box className={subContainer}>
          <Box className={headingContainer}>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              Benefits & Features
            </Typography>
            <Box>
              <Box className={divider}>
                <Box className={innerDivider}></Box>
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" className={Typo}>
                Automated HR Processes to Save Time and Boost Productivity
              </Typography>
            </Box>
          </Box>
          <Box className={contentContainer}>
            {cardData?.map((data, i) => {
              return (
                <Fade
                  duration={500 * (i + 1)}
                  direction="up"
                  key={i}
                  triggerOnce
                >
                  <FeatureCard data={data} />
                </Fade>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BenefitAndFeature;
