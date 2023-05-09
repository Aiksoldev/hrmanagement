import { Box, Divider, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import ReactHtmlParser from "react-html-parser";

const useStyle = makeStyles((theme) => {
  return {
    container: {
     
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      background: theme.palette.grey[100],
    },
    subContainer: {
      width: "100%",
      maxWidth: "1280px",

      display: "flex",
      alignItems: "start",
      justifyContent: "space-between",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    contentContainer: {
      width: "100%",
      background: theme.palette.white.main,
      padding: "20px",
      border: `1px solid ${theme.palette.grey[300]}`,
    },
    listContainer: {
      width: "50%",
      border: `1px solid ${theme.palette.grey[300]}`,
      display: "flex",
      padding: "20px",
      background: theme.palette.white.main,

      flexDirection: "column",
      gap: "10px",
      [theme.breakpoints.down('md')]:{
        width:'100%'
      }
    },
    blogCards: {
      display: "flex",
      alignItems: "start",
      justifyContent: "",
      gap: "10px",
      cursor: "pointer",
    },
  };
});

const BlogDetailsSection = ({ blogdata, recent }) => {
  const {
    container,
    subContainer,
    contentContainer,
    listContainer,
    blogCards,
  } = useStyle();
  console.log(recent, blogdata);
  const router = useRouter();

  const handleNavigate = (data) => {
    router.push(`/BlogLists/Details/${data?.slug}`);
  };

  return (
    <Box className={container}>
      <Box className={subContainer}>
        <Box className={contentContainer}>
          {blogdata?.length > 0 &&
            blogdata?.map((data, i) => {
              return (
                <Box key={i}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      padding:'20px',
                      color:(theme)=>theme.palette.grey[800]
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "400", textTransform: "capitalize"}}
                    >
                      {data?.title}
                    </Typography>
                    <Box>
                      {data?.blogtype === "Image" ? (
                        <Image
                          src={data?.image_path}
                          alt={data?.image_path}
                          height={1000}
                          width={1000}
                          style={{ width: "100%", height: "auto" }}
                        />
                      ) : (
                        <video
                          width="100%"
                          height="240"
                          playsInline
                          loop
                          muted
                          controls
                          alt="All the devices"
                          src={data.image_path}
                        />
                      )}
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "1rem" }}>
                        {ReactHtmlParser(data.descriptions)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: "400", textTransform: "capitalize" }}
            ></Typography>
          </Box>
        </Box>
        <Box className={listContainer}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: "500" }}>Recent Posts</Typography>
          </Box>
          <Divider />
          {recent?.map((item, i) => {
            return (
              <Box
                key={i}
                className={blogCards}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate(item);
                }}
              >
                <Box sx={{ padding: "10px" }}>
                  {item?.blogtype === "Image" ? (
                    <Image
                      src={item?.image_path}
                      alt={""}
                      height={1000}
                      width={1000}
                      style={{ width: "100px", height: "auto" }}
                    />
                  ) : (
                    <video
                      width="100"
                      height="50"
                      playsInline
                      loop
                      muted
                      controls
                      alt="All the devices"
                      src={item.image_path}
                    />
                  )}
                </Box>
                <Box>
                  <Typography
                    sx={{ paddingBottom: "10px", textTransform: "capitalize" }}
                  >
                    {item?.title}
                  </Typography>
                  <Typography>
                    Posted at:{moment(item?.create_at).format("DD MMMM YYYY")}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default BlogDetailsSection;
