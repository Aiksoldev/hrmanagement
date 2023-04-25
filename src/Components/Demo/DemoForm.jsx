import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "50px 10px",
    },
    subContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      width: "100%",
      maxWidth: "1280px",
    },
    headingContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "10px",
      width: "100%",
      maxWidth: "700px",
    },
    contentContainer: {
      width: "100%",
      maxWidth: "1000px",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    fieldInRow: {
      width: "100%",
      display: "flex",
      gap: "20px",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
    },
  };
});

const DemoForm = () => {
  const {
    container,
    subContainer,
    headingContainer,
    contentContainer,
    fieldInRow,
  } = useStyle();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
  };
  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={headingContainer}>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Thank you for your interest in HRMS.
          </Typography>
          <Box className={"customdivider"}></Box>
        </Box>
        <form className={contentContainer} onSubmit={handleSubmit}>
          <Typography>
            Please provide your details and one of our specialists will be in
            touch with you shortly.
          </Typography>
          <Box className={"customdivider"} />
          <Box className={fieldInRow}>
            <FormControl fullWidth>
              <TextField
                name={"name"}
                required
                label={"Name"}
                fullWidth
                size="small"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                name={"companyName"}
                required
                label={"Company Name"}
                fullWidth
                size="small"
              />
            </FormControl>
          </Box>
          <Box className={fieldInRow}>
            <FormControl fullWidth>
              <TextField
                name={"email"}
                required
                label={"Email"}
                type="email"
                fullWidth
                size="small"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                name={"phone"}
                required
                type="number"
                label={"Phone Number"}
                fullWidth
                size="small"
              />
            </FormControl>
          </Box>
          <Box className={fieldInRow}>
            <FormControl fullWidth>
              <TextField
                name={"city"}
                required
                label={"City"}
                fullWidth
                size="small"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                name={"employees"}
                required
                type="number"
                label={"Number of employees"}
                fullWidth
                size="small"
              />
            </FormControl>
          </Box>
          <Box>
            <Button
              variant={"contained"}
              type="submit"
              sx={{ padding: "10px 30px", borderRadius: "20px" }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default DemoForm;
