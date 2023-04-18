import {
  Box,
  Button,
  Divider,
  FormControl,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import TopBanner from "@/Components/TopBanner/TopBanner";
import { Fade } from "react-awesome-reveal";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      justifyContent: "center",
      gap: "50px",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      overflow: "hidden",
    },
    subContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "50px",
      padding: "40px 0px",
      alignItems: "center",
      overflow: "hidden",
    },
    headingContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      textAlign: "center",
      width: "100%",
      maxWidth: "750px",
    },
    contentContainer: {
      maxWidth: "1440px",
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        width: "auto",
      },
    },
    formContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "25px",
      justifyContent: "space-evenly",
      padding: "20px",
      [theme.breakpoints.down("md")]: {
        width: "auto",
      },
    },
    AddressContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      justifyContent: "space-evenly",
      padding: "20px",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        width: "auto",
      },
    },
    iconContainer: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    icon: {
      height: "50px",
      width: "50px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: theme.palette.primary.main,
    },
    AddressBox: {
      padding: "20px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    mapContainer: {
      width: "100%",
      overflow: "hidden",
    },
  };
});

const Contact = () => {
  const {
    container,
    subContainer,
    headingContainer,
    contentContainer,
    formContainer,
    AddressContainer,
    iconContainer,
    icon,
    AddressBox,
    mapContainer,
  } = useStyle();
  return (
    <Box>
      <TopBanner
        title={"Get in touch with us"}
        desc={"Let's Talk Business!"}
        activePage={"Contact Us"}
      />
      <Box className={container}>
        <Box className={subContainer}>
          <Box className={headingContainer}>
            <Fade duration={1000} direction="up" triggerOnce>
              <Typography color={"primary"}>Contact</Typography>
            </Fade>
            <Fade duration={1200} direction="up" triggerOnce>
              <Typography variant="h3">Contact Us</Typography>
            </Fade>
          </Box>
          <Box className={contentContainer}>
            <Fade
              direction="left"
              duration={1500}
              triggerOnce
              style={{ width: "100%", height: "100%" }}
            >
              <Paper elevation={3} className={formContainer}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  <Typography color={"primary"} variant component={"span"}>
                    Get in
                  </Typography>{" "}
                  touch with us!
                </Typography>
                <Box>
                  <Typography>
                    There are many variations of passages of Lorem Ipsum
                    available but the majority have suffered alteration in some
                    form .
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "20px" }}>
                  <FormControl fullWidth>
                    <TextField name="name" placeholder="Name" fullWidth />
                  </FormControl>
                  <FormControl fullWidth>
                    <TextField name="email" placeholder="Email" fullWidth />
                  </FormControl>
                </Box>
                <Box sx={{ display: "flex", gap: "20px" }}>
                  <FormControl fullWidth>
                    <TextField name="subject" placeholder="Subject" fullWidth />
                  </FormControl>
                </Box>
                <Box sx={{ display: "flex", gap: "20px" }}>
                  <FormControl fullWidth>
                    <TextField
                      name="message"
                      placeholder="Message"
                      multiline
                      minRows={8}
                      fullWidth
                    />
                  </FormControl>
                </Box>
                <Box>
                  <Button variant="contained" sx={{ padding: "10px 30px" }}>
                    Send Message
                  </Button>
                </Box>
              </Paper>
            </Fade>
            <Fade
              direction="right"
              duration={1500}
              triggerOnce
              style={{ width: "100%", height: "100%" }}
            >
              <Paper elevation={3} className={AddressContainer}>
                <Box className={AddressBox}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      Head Office
                    </Typography>
                  </Box>
                  <Box className={iconContainer}>
                    <Box>
                      <Box className={icon}>
                        <HomeIcon
                          sx={{ color: (theme) => theme.palette.white.main }}
                        />
                      </Box>
                    </Box>
                    <Typography>
                      1100 West Road, Suite 300 Towson, MD 21204, United State
                      America.
                    </Typography>
                  </Box>
                  <Box className={iconContainer}>
                    <Box>
                      <Box className={icon}>
                        <EmailIcon
                          sx={{ color: (theme) => theme.palette.white.main }}
                        />
                      </Box>
                    </Box>
                    <Typography>admin@aiksol.com</Typography>
                  </Box>
                  <Box className={iconContainer}>
                    <Box>
                      <Box className={icon}>
                        <LocalPhoneIcon
                          sx={{ color: (theme) => theme.palette.white.main }}
                        />
                      </Box>
                    </Box>
                    <Typography>+92-41-5381745, +92-333-5377791</Typography>
                  </Box>
                </Box>
                <Divider sx={{ width: "80%" }} />
                <Box className={AddressBox}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      Branch Office
                    </Typography>
                  </Box>
                  <Box className={iconContainer}>
                    <Box>
                      <Box className={icon}>
                        <HomeIcon
                          sx={{ color: (theme) => theme.palette.white.main }}
                        />
                      </Box>
                    </Box>
                    <Typography>
                      1st Floor, Nabeel Plaza, Jhumra road, Block Z Abdullah
                      Pur, Faisalabad, Pakistan.
                    </Typography>
                  </Box>
                  <Box className={iconContainer}>
                    <Box>
                      <Box className={icon}>
                        <EmailIcon
                          sx={{ color: (theme) => theme.palette.white.main }}
                        />
                      </Box>
                    </Box>
                    <Typography>admin@aiksol.com</Typography>
                  </Box>
                  <Box className={iconContainer}>
                    <Box>
                      <Box className={icon}>
                        <LocalPhoneIcon
                          sx={{ color: (theme) => theme.palette.white.main }}
                        />
                      </Box>
                    </Box>
                    <Typography>+92-41-5381745, +92-333-5377791</Typography>
                  </Box>
                </Box>
              </Paper>
            </Fade>
          </Box>
        </Box>
      </Box>
      <Fade
        direction="down"
        duration={2000}
        triggerOnce
        style={{ width: "100%" }}
      >
        <Box className={mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16195.24611814709!2d73.09322914338809!3d31.424288394218035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392269f34089455d%3A0xf62843e6e2f71907!2sAikSol.!5e0!3m2!1sen!2s!4v1679290659482!5m2!1sen!2s"
            title="Aiksol Office Location"
            allowfullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ height: "550px", width: "100%", border: "none" }}
          ></iframe>
        </Box>
      </Fade>
    </Box>
  );
};

export default Contact;
