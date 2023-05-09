import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import Layout from "..";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { sidebarData } from "@/Utils/Contants/DashboardSidebarData";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      padding: "20px 0px",
      background: theme.palette.grey[200],
      display: "flex",
      alignItems: "start",
      justifyContent: "space-between",
      gap: "20px",
      position: "relative",
    },

    categoriesContainer: {
      width: "100%",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      background: theme.palette.white.main,
      border: `1px solid ${theme.palette.grey[300]}`,
      transition: "0.5s",
      overflow: "hidden",
      height: "100%",
      maxheight: "80vh",

      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        width: "5px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(200,200,200,1)",
      },
      [theme.breakpoints.down("md")]: {
        // position: "absolute",
        zIndex: "150",
        width: "100%",
        left: "0px",
      },
    },
    catContainer: {
      position: "relative",
      width: "25%",
      transition: "0.7s",
      zIndex: "100",
      [theme.breakpoints.down("md")]: {
        width: "320px",
        position: "absolute",
      },
    },
    childContainer: {
      width: "100%",

      padding: "0px 20px",
    },
    closetab: {
      [theme.breakpoints.down("md")]: {
        width: "0px",
      },
    },
    openingFlag: {
      height: "40px",
      width: "30px",
      position: "absolute",
      top: "0px",
      right: "0px",
      transform: "translate(100%,-0%)",
      background: theme.palette.primary.main,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.white.main,
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    pageContainer: {
      padding: "20px",
      borderRadius: "10px",
      background: theme.palette.white.main,
    },
    subCatContainer: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      padding: "10px 20px",
      borderTop: `1px solid ${theme.palette.grey[300]}`,
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
      color: theme.palette.grey[500],
      fontSize: "14px",
      cursor: "pointer",
    },
    accordiontitle: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      color: theme.palette.grey[500],
      fontSize: "14px",
      cursor: "pointer",
    },
  };
});

const DashboardLayout = ({ children }) => {
  const {
    container,
    childContainer,
    closetab,
    catContainer,
    openingFlag,
    categoriesContainer,
    pageContainer,
    subCatContainer,

    accordiontitle,
  } = useStyle();
  const [closeTab, setcloseTab] = useState(true);
  const [CategoriesData] = useState([]);
  return (
    <Layout>
      <Box className={container}>
        <Box className={`${catContainer} ${closeTab ? closetab : ""}`}>
          <Box
            className={openingFlag}
            sx={{ opacity: closeTab ? "0.5" : "1" }}
            onClick={() => {
              setcloseTab(!closeTab);
            }}
          >
            {closeTab ? (
              <ChevronRightIcon color="inherit" />
            ) : (
              <KeyboardArrowLeftIcon color="inherit" />
            )}
          </Box>
          <Box className={`${categoriesContainer} ${closeTab ? closetab : ""}`}>
            <Box
              sx={{
                padding: "10px 20px",
                width: "100%",
                position: "relative",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "400" }}>
                Categories
              </Typography>
            </Box>
            <Box>
              {sidebarData?.map((item, i) => {
                if (item?.subChild?.length > 0) {
                  return (
                    <Accordion
                      disableGutters
                      key={i}
                      sx={{
                        "&.MuiAccordion-root:before": {
                          display: "none !important",
                          border: "none !important",
                        },
                        "&.MuiPaper-elevation1": {
                          boxShadow: "none !important",
                          border: "none !important",
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ padding: "0px 20px" }}
                      >
                        <Box className={accordiontitle}>
                          <Box>{item?.icon}</Box>
                          <Typography color={"inherit"} variant="">
                            {item?.title}
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails sx={{ padding: "0px 20px" }}>
                        {item?.subChild?.map((data, ind) => {
                          if (data?.subChild2?.length > 0) {
                            return (
                              <Accordion
                                disableGutters
                                key={ind}
                                sx={{
                                  "&.MuiAccordion-root:before": {
                                    display: "none !important",
                                    border: "none !important",
                                  },
                                  "&.MuiPaper-elevation1": {
                                    boxShadow: "none !important",
                                    border: "none !important",
                                  },
                                }}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  sx={{ padding: "0px 20px" }}
                                >
                                  <Box className={accordiontitle}>
                                    <Box>{data?.icon}</Box>
                                    <Typography color={"inherit"} variant="">
                                      {data?.title}
                                    </Typography>
                                  </Box>
                                </AccordionSummary>
                                <AccordionDetails sx={{ padding: "0px" }}>
                                  {data?.subchild3?.map((schild, index) => {
                                    return (
                                      <Box
                                        key={index}
                                        className={subCatContainer}
                                      >
                                        <Box>{schild?.icon}</Box>
                                        <Typography
                                          color={"inherit"}
                                          variant=""
                                        >
                                          {schild?.title}
                                        </Typography>
                                      </Box>
                                    );
                                  })}
                                </AccordionDetails>
                              </Accordion>
                            );
                          } else {
                            return (
                              <Box key={i} className={subCatContainer}>
                                <Box>{data?.icon}</Box>
                                <Typography color={"inherit"} variant="">
                                  {data?.title}
                                </Typography>
                              </Box>
                            );
                          }
                        })}
                      </AccordionDetails>
                    </Accordion>
                  );
                } else {
                  return (
                    <Box key={i} className={subCatContainer}>
                      <Box>{item?.icon}</Box>
                      <Box>{item?.title}</Box>
                    </Box>
                  );
                }

                <Box key={i}></Box>;
              })}
            </Box>
          </Box>
        </Box>
        <Box className={childContainer}>
          <Box className={pageContainer}>{children}</Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default DashboardLayout;
