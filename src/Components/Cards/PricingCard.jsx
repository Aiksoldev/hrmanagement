import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import DoneIcon from "@mui/icons-material/Done";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      padding: "20px",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      width: "100%",
      maxWidth: "300px",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      cursor: "pointer",
      transition: "0.5s",
    },
    subContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      width: "100%",
      alignItems: "center",
      padding: "10px 0px",
    },
    active: {
      transform: "scale(1.05)",
      transition: "0.5s",
      boxShadow: "rgba(100, 100, 111, 0.8) 0px 7px 29px 0px",
    },
  };
});

const PricingCard = ({ data, handleActiveCard }) => {
  const { container, subContainer, active } = useStyle();
  return (
    <Box
      className={`${container} ${data?.active ? active : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        handleActiveCard(data?.title);
      }}
    >
      <Box className={subContainer}>
        <Box>
          <Typography variant="h5">{data?.title}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "end", gap: "10px" }}>
          <Typography variant="h3" color={"primary"}>
            {data?.Price}
          </Typography>
          <Typography>/ Year</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {data?.details?.map((det,i) => {
            return (
              <Box key={i} sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Box>
                  <DoneIcon
                    sx={{
                      color: det.active
                        ? (theme) => theme.palette.grey[700]
                        : (theme) => theme.palette.grey[400],
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: det.active
                        ? (theme) => theme.palette.grey[700]
                        : (theme) => theme.palette.grey[400],
                    }}
                  >
                    {det?.title}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box>
          <Button
            sx={{
              padding: "10px 20px",
              borderRadius: "20px",
              background: data?.active
                ? (theme) => theme.palette.background.main
                : (theme) => theme.palette.grey[300],
              color: (theme) => theme.palette.white.main,
            }}
          >
            Buy Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PricingCard;
