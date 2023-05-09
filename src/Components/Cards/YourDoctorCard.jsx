import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Countdown from "react-countdown";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      width: "100%",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      alignItems: "center",
      borderRadius: "50px",
      position: "relative",
      overflow: "hidden",
      justifyContent: "center",
      textAlign: "center",
      cursor: "pointer",
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

const YourDoctorCard = ({ item, link, handleAddCart }) => {
  const { container, overlay, addtoCartContainer } = useStyle();
  const router = useRouter();

  const handleConsult = () => {
    console.log(item);
    
    router.push(`/ViewDoctor/${item?.slug}`);
  };

  return (
    <Box
      className={container}
      // onClick={() => {
      //   router.push(link);
      // }}
    >
      <Box sx={{ height: "180px" }}>
        <Image
          src={item.Profile_Photo}
          alt={"medy deals"}
          width={176}
          height={176}
          style={{
            width: "auto",
            height: "100%",
            maxHeight: "176px",
            maxWidth: "176px",
            borderRadius: "100%",
          }}
        />
      </Box>
      <Box>
        <Box className="feature-detail">
          <Typography
            variant="h4"
            sx={{ fontSize: "14px", color: (theme) => theme.palette.text.main }}
          >
            {item.name}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100px" }}
      >
        <Typography
          variant=""
          sx={{
            fontSize: "14px",
            fontWeight: "600",
            color: (theme) => theme.palette.grey[900],
          }}
        >
          {item?.skills_name?.toString().split(",").join(", ")}
        </Typography>
        <Typography variant="">{item?.hospitalname}</Typography>
      </Box>
      <Box className={addtoCartContainer} onClick={handleConsult}>
        <Typography sx={{ fontWeight: "bold" }}>Consult Now</Typography>
      </Box>
    </Box>
  );
};

export default YourDoctorCard;
