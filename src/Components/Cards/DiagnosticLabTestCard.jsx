import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";

const DiagnosticLabTestCard = ({ data, handleClick }) => {
  return (
    <Box>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          width: "270px",
          height: "350px",
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${data?.labtestphotourl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            width: "270px",
            height: "190px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            handleClick(data.id, data.slug);
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "10px 15px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Typography
            sx={{
              color: "#212529",
              fontSize: "16px",
              textOverflow: "ellipsis",
              fontWeight: "bold",
            }}
          >
            {data?.labtest_name}
          </Typography>
          <Typography
            sx={{
              color: "#212529",
              fontSize: "15px",
              fontWeight: "semibold",
            }}
          >
            {data?.lab_name}
          </Typography>
          <Typography
            sx={{
              color: "#212529",
              fontSize: "18px",
              color: "#71ad21",
              fontWeight: 800,
            }}
          >
            {Number(data.labtest_amount).toFixed(2)} AED
          </Typography>
          <Button
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.white.main,
            }}
            onClick={() => {
              handleClick(data.id, data.slug);
            }}
          >
            Book
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default DiagnosticLabTestCard;
