import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import Layout from "../../Layouts";
import pharmacy from "../../Assets/icons/pharmacy.png";
import doctor from "../../Assets/icons/doctor.png";
import lab from "../../Assets/icons/lab.png";
import Fitness_img from "../../Assets/icons/Fitness_img.jpg";
import images from "../../Assets/icons/images.png";
import download1 from "../../Assets/icons/download1.jpg";
import acupuncture from "../../Assets/icons/acupuncture.png";
import chiropractic from "../../Assets/icons/chiropractic.png";
import dietandnutrition from "../../Assets/icons/dietandnutrition.png";
import homeopathy from "../../Assets/icons/homeopathy.png";
import meditation from "../../Assets/icons/meditation.png";
import naturopathy from "../../Assets/icons/naturopathy.png";
import physiotherapy from "../../Assets/icons/physiotherapy.png";
import veterinary from "../../Assets/icons/veterinary.png";
import reiki from "../../Assets/icons/reiki.png";
import traditionalchinesmedicine from "../../Assets/icons/traditionalchinesmedicine.png";
import unanitreatment from "../../Assets/icons/unani-treatment.png";
import wellness from "../../Assets/icons/wellness.png";
import Image from "next/image";
import PartnersCard from "@/components/Cards/PartnersCard";
import ModalForm from "@/components/PartnersProgram/ModalForm";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      background: theme.palette.grey[50],

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0px 20px",
    },
    subContainer: {
      width: "100%",
      maxWidth: "850px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      padding: "20px",
      background: theme.palette.white.main,
      color: theme.palette.grey[800],
    },
    CardContainer: {
      width: "100%",

      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
      flexWrap: "wrap",
    },
  };
});

const PartnerProgram = () => {
  const { container, subContainer, CardContainer } = useStyle();
  const [open, setOpen] = useState(false);
  const [title,settitle] = useState('');
  const [healthcarepartner] = useState([
    {
      title: "Pharmacy",
      img: pharmacy,
      tag: "pharmacy",
    },
    {
      title: "Hospital",
      img: doctor,
      tag: "hospital",
    },
    {
      title: "Lab",
      img: lab,
      tag: "lab",
    },
  ]);
  const [tcamPartner] = useState([
    {
      title: "Fitness Center",
      img: Fitness_img,
      tag: "fitnessCoach",
    },
    {
      title: "Yoga Center",
      tag: "yoga",
      img: images,
    },
    {
      title: "Ayurveda Center",
      tag: "ayurvedic",
      img: download1,
    },
    {
      title: "Acupuncture Clinic",
      tag: "acupuncture",
      img: acupuncture,
    },
    {
      title: "Chiropractic Center",
      tag: "chiropractic",
      img: chiropractic,
    },
    {
      title: "Diet & Nutrition Center",
      tag: "nutrition",
      img: dietandnutrition,
    },
    {
      title: "Homeopathic Center",
      tag: "homeopathic",
      img: homeopathy,
    },
    {
      title: "Meditation Center",
      tag: "meditation",
      img: meditation,
    },
    {
      title: "Naturopathy Treatment Center",
      tag: "naturopathy",
      img: naturopathy,
    },
    {
      title: "Physiotherapy Clinic",
      tag: "physiotherapy",
      img: physiotherapy,
    },
    {
      title: "Veterinary Clinic",
      tag: "veterinary",
      img: veterinary,
    },
    {
      title: "Reiki Healing",
      tag: "reikihealing",
      img: reiki,
    },
    {
      title: "Traditional Chinese Medical Center",
      tag: "medical",
      img: traditionalchinesmedicine,
    },
    {
      title: "Unani Treatment Center",
      tag: "unani",
      img: unanitreatment,
    },
    {
      title: "Wellness Center",
      tag: "wellness",
      img: wellness,
    },
  ]);
  return (
    <Layout>
      <Box className={container}>
        <Box className={subContainer}>
          <Box>
            <Typography
              variant="h6"
              color={"inherit"}
              sx={{ fontWeight: "500" }}
            >
              Healthcare Partners
            </Typography>
          </Box>
          <Box className={CardContainer}>
            {healthcarepartner?.map((data, i) => {
              return (
                <PartnersCard
                  setOpen={setOpen}
                  settitle={settitle}
                  key={i}
                  data={data}
                />
              );
            })}
          </Box>
          <Box sx={{ paddingTop: "20px" }}>
            <Typography
              variant="h6"
              color={"inherit"}
              sx={{ fontWeight: "500" }}
            >
              TCAM Partners
            </Typography>
          </Box>
          <Box className={CardContainer}>
            {tcamPartner?.map((data, i) => {
              return (
                <PartnersCard
                  setOpen={setOpen}
                  settitle={settitle}
                  key={i}
                  data={data}
                />
              );
            })}
          </Box>
        </Box>
        <ModalForm open={open} setOpen={setOpen} title={title} />
      </Box>
    </Layout>
  );
};

export default PartnerProgram;
