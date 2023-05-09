import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Countdown from "react-countdown";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const DoctorCard = ({ doctor, link, handleAddCart }) => {
  const { container, countdown, overlay, addtoCartContainer } = useStyle();
  const router = useRouter();
  return (
    <Box
      className={container}
      onClick={() => {
        router.push(link);
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            width: "100px",
          }}
        >
          <Image
            src={doctor?.Image}
            alt={"medy deals"}
            width={100}
            height={150}
            style={{ width: "100px", height: "100%", borderRadius: "5px" }}
          />
        </Box>
        <Box
          sx={{
            textAlign: "left",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "#212529",
            }}
          >
            Dr Name
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              color: "#3d3d3f",
            }}
          >
            Rating Name
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              color: "#3d3d3f",
            }}
          >
            Consultation fee : {Number(0).toFixed(2)} AED
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              color: "#3d3d3f",
            }}
          >
            {" "}
            Hospital : dasda
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              color: "#3d3d3f",
            }}
          >
            {" "}
            Specialization :<p className="skill-list">dasdas</p>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorCard;

const useStyle = makeStyles((theme) => {
  return {
    container: {
      width: "100%",
      padding: "20px",
      borderRadius: "10px",
      position: "relative",
      width: "400px",
      overflow: "hidden",
      cursor: "pointer",
      background: "white !important",
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    },

    countdown: {
      color: theme.palette.white.main,
    },
    overlay: {
      position: "absolute",
      background: "url(./cardbg.png)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom",
      backgroundSize: "100%",

      height: "100%",
      top: "0px",
      width: "100%",
    },
    addtoCartContainer: {
      position: "absolute",
      bottom: "0px",
      zIndex: "100",

      color: theme.palette.grey[800],
      background: "#ffea00",
      padding: "2px 20px",
      borderRadius: "20px",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      justifyContent: "center",
    },
  };
});
