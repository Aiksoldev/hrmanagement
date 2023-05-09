import {
  Autocomplete,
  Box,
  Button,
  CardMedia,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import publishing from "../../Assets/PageHeaders/publishingbanner.png";
import Image from "next/image";
import { categories } from "@/Resources/BlogCategories";
import Select from "react-select";
import BlogCards from "./BlogCards";
import axios from "axios";
import { useRouter } from "next/router";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    contentContainer: {
      width: "100%",
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      gap: "50px",
      [theme.breakpoints.down("md")]: {
        padding: "20px",
      },
    },
    topBarContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      alignItems: "start",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    tabsContainer: {
      width: "30%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      padding: "10px",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    ImageContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    tabButtons: {
      width: "100%",
      padding: "15px 40px",
      borderRadius: "10px",
      background: theme.palette.grey[200],
      cursor: "pointer",
    },
    activeButton: {
      width: "100%",
      padding: "15px 40px",
      background: `${theme.palette.primary.main} `,
      color: `${theme.palette.white.main}`,
      cursor: "pointer",
      borderRadius: "10px",
    },
    FieldInRow: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: "50px",

      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
        gap: "20px",
      },
    },

    autocomplete: {
      width: "100%",
      minWidth: "150px",
      "& .MuiAutocomplete-inputRoot": {
        borderRadius: "50px",
      },
    },
    cardContainer: {
      width: "100%",

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      flexWrap: "wrap",
    },
  };
});

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
};
const baseUrl = getBaseUrl();

const BlogListSection = ({ BlogData }) => {
  const {
    container,
    contentContainer,
    topBarContainer,
    tabsContainer,
    ImageContainer,
    tabButtons,
    activeButton,
    FieldInRow,
    autocomplete,
    cardContainer,
  } = useStyle();
  const [bloglist, setbloglist] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  console.log(BlogData);
  const history = useRouter();
  const handleClick = (data) => {
    history.push({
      pathname: "/BlogLists",
      query: { type: data },
    });
    ViewAll(data);
  };

  useEffect(() => {
    if (BlogData) {
      setbloglist(BlogData);
    }
  }, []);

  const ViewAll = async (type) => {
    var qs = require("qs");
    var data = qs.stringify({ type: type, blogtype: "" });
    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/listhealthcorner`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        console.log("hello");
        console.log(response.data);
        setbloglist(response.data.listblog);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //  async function searchText() {
  //    await ApiServices.TCAMPartnerpublishSearchApi(
  //      searchItem,
  //      blogtypeis,
  //      selectedType
  //    )
  //      .then(async (res) => {
  //        if (res.status == "1") {
  //          if (res.listblog.length == 0) {
  //            setBlogData([]);
  //          } else {
  //            setBlogData(res.listblog);
  //          }
  //        }
  //      })
  //      .catch((err) => {
  //        console.log(err);
  //      });
  //  }

  const handleSelection = (e) => {
    console.log(e);
    console.log("aaa", e?.value);
    var qs = require("qs");
    var data = qs.stringify({ type: history?.query?.type, blogtype: e?.value });
    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/listhealthcorner`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setbloglist(response.data.listblog);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box className={container}>
      <Box className={contentContainer}>
        <Box className={topBarContainer}>
          <Box className={tabsContainer}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Categories
            </Typography>
            <Box
              className={
                history?.query?.type !== "Vedio" ? activeButton : tabButtons
              }
              onClick={() => handleClick("Image")}
            >
              Blogs
            </Box>
            <Box
              className={
                history?.query?.type === "Vedio" ? activeButton : tabButtons
              }
              onClick={() => handleClick("Vedio")}
            >
              Videos
            </Box>
          </Box>
          <Box className={ImageContainer}>
            <Image
              src={publishing}
              alt={"medy"}
              style={{ width: "100%", height: "100%" }}
            />
            <Box className={FieldInRow}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="text"
                  sx={{ borderRadius: "50px", overflow: "hidden" }}
                  fullWidth
                  onChange={(e) => setSearchItem(e.target.value)}
                  placeholder="Search By Title"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        // onClick={() => searchText()}
                        sx={{
                          borderRadius: "100px",
                          marginRight: "-15px",

                          fontSize: "16px",
                          height: "60px",
                          width: "100px",
                          background: (theme) => theme.palette.primary.main,
                          color: (theme) => theme.palette.white.main,
                        }}
                        edge="end"
                      >
                        Search
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <FormControl fullWidth>
                  <Autocomplete
                    disablePortal
                    options={categories}
                    className={autocomplete}
                    onChange={(e, val) => handleSelection(val)}
                    getOptionLabel={(option) => option.label}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select Blog Categories"
                      />
                    )}
                  />
                </FormControl>
                <Button
                  variant="contained"
                  sx={{ padding: "15px 30px", borderRadius: "50px" }}
                >
                  Reset
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={cardContainer}>
          {bloglist?.map((data, i) => {
            return (
              <BlogCards key={i} data={data} active={history?.query?.type} />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default BlogListSection;
