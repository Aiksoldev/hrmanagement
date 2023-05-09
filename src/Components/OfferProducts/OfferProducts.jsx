const Layout = dynamic(() => import("@/Layouts"), { ssr: false });
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Button,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import dynamic from "next/dynamic";
import React, { useContext, useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import { store } from "@/Store";
import { useRouter } from "next/router";
import offer1 from "../../Assets/PageHeaders/offers1.jpg";
import healthcare from "../../Assets/PageHeaders/healthcare.jpg";
import beauty from "../../Assets/PageHeaders/beauty.jpg";
import tcam from "../../Assets/PageHeaders/tcam.png";
import food from "../../Assets/PageHeaders/food.jpg";
import clothing from "../../Assets/PageHeaders/clothing.jpg";
import cleaning from "../../Assets/PageHeaders/cleaning.jpg";
import Image from "next/image";
import ProductCard from "@/components/Cards/ProductCard";
import axios from "axios";
import { toast } from "react-toastify";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Loader from "../Loader/Loader";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    subContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",

      background: theme.palette.grey[100],
    },
    breadCrumContainer: {
      padding: "10px 20px",

      display: "flex",
      flexWrap: "wrap",
      gap: "5px",
      alignItems: "center",
    },
    contentContainer: {
      width: "100%",
      display: "flex",
      alignItems: "start",
      justifyContent: "space-between",
      gap: "20px",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
      },
    },
    categoriesContainer: {
      width: "100%",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      background: theme.palette.white.main,
       border:`1px solid ${theme.palette.grey[300]}`,
      transition: "0.5s",
      overflow: "hidden",
      [theme.breakpoints.down("md")]: {
        position: "absolute",
        zIndex: "150",
        width: "100%",
        left: "0px",
      },
    },
    catContainer: {
      position: "relative",
      width: "20%",
      transition: "0.7s",
      [theme.breakpoints.down("md")]: {
        width: "320px",
      },
    },
    contentSection: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      gap: "20px",

      padding: "0px 20px",
    },
    lengthContainer: {
      width: "100%",

      padding: "10px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "end",
      },
    },
    buttonContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    buttons: {
      padding: "5px 20px",
      border: "1px solid white",
      background: "white !important",
      fontWeight: "400",
      fontSize: "14px",
      cursor: "pointer",
      "&:hover": {
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
    cardsContainer: {
      width: "100%",

      width: "100%",
      display: "flex",

      gap: "20px",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    typoContainer: {
      width: "100%",

      padding: "10px 0px",
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    active: {
      background: "#32add2 !important",
      padding: "0px 16px",
      color: `${theme.palette.white.main} !important`,
    },
    activeChild: {
      background: theme.palette.primary.main,
      padding: "0px 16px",
      color: theme.palette.white.main,
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
  };
});

let handlePaginationCategory = null;
let handlePaginationId = null;
let sortingType = "";
let sorting = false;

const OfferProducts = () => {
  const {
    container,
    subContainer,
    breadCrumContainer,
    contentContainer,
    contentSection,
    categoriesContainer,
    lengthContainer,
    buttonContainer,
    buttons,
    cardsContainer,
    typoContainer,
    active,
    activeChild,
    closetab,
    catContainer,
    openingFlag,
  } = useStyle();
  const urlType = "class";

  const [checkmodecod, setCheckmodecod] = useState("none");
  const [activecalss, setActiveclass] = useState("");
  const [subcatid, setsubcatid] = useState("");
  const [adsensedata, setAdsense] = useState([]);
  const [adsensephotosurl, setAdsensephotosurl] = useState("");
  const [isActiveClassIndex, setIsActiveClassIndex] = useState(0);
  const [isActiveSubCatIndex, setIsActiveSubCatIndex] = useState(0);
  const [isActiveChildSubCatIndex, setIsActiveChildSubCatIndex] =
    useState(null);
  const [closeTab, setcloseTab] = useState(false);
  const [selectedClassType, setSelectedClassType] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [state, dispatch] = useContext(store);
  const [CategoriesData, setCategoriesData] = useState([]);
  const [lisSubtCategories, setListSubCategories] = useState([]);
  const [countProducts, setCountProducts] = useState("");
  const [isActive, setisActive] = useState(true);
  const [countProducts1, setCountProducts1] = useState();
  const [listCategoriesname, setListCategoriesname] = useState(null);
  const [pageCount, setPageCount] = useState(20);
  const [page, setPage] = useState(0);
  const [itemsData, setItemsData] = useState(null);
  const [itemsData3, setItemsData3] = useState([]);
  const [renderFlag, setrenderFlag] = useState(false);
  const [subCategoryTitle, setSubCategoryTitle] = useState(null);
  const [listChildCategory, setListChildCategory] = useState(null);
  const [childTitle, setChildTitle] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [prdouctVisible, setPrdouctVisible] = useState();
  const [selectedchild, setselectedchild] = useState(0);
  const [selectedsubchild, setselectedsubchild] = useState(0);
  const [currentSelectedCategory, setCurrentSelectedCategory] = useState(null);
  const [contentData, setContentData] = useState([]);
  const [loader, setLoader] = useState(false);

  const token = window.localStorage.getItem("token");
  let ipData = window.localStorage.getItem("IP");
  let id = "";
  id = localStorage.getItem("id");
  let UserloginId = localStorage.getItem("id");
  let role_id = localStorage.getItem("role_id");
  const getBaseUrl = () => {
    return process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
  };
  const baseUrl = getBaseUrl();
  const router = useRouter();
  const QueryData = router.query;

  function listOfProducts() {
    setisActive(true);
    var config = {
      method: "get",
      url: `${baseUrl}/healthcare/listcategories`,
    };

    axios(config)
      .then(function (response) {
        setLoader(false);
        setListCategories(response.data.listcategories);
      })
      .catch(function (error) {
        setLoader(false);
      });

    var listProductData = {
      method: "get",
      url: `${baseUrl}/healthcare/listofproductdata`,
    };

    axios(listProductData)
      .then(function (response) {
        setListProudctCategories(response.data.data);
        setListProudctCategories1(response.data.data);
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  }

  async function handleChange(event, value) {
    window.scrollTo(0, 0);
    let obj = {};
    setPage(value - 1);
    setisActive(true);
    // setLoader(true)
    let cartValue = id;
    if (role_id === null) {
      cartValue = ipData;
    }
    var qs = require("qs");
    let data;
    let sortingPlayload = state.productPayload;
    let dict = { ...sortingPlayload, page: value, sort: sortingType };
    if (sorting || value !== undefined) {
      data = qs.stringify(dict);
    } else {
      obj = {
        user_session_id: cartValue,
        user_id: "",
        page: value,
        longitude: longitude,
        latitude: latitude,
        sort: sortingType,
        tcamtype: selectedClassType,
      };
      if (handlePaginationCategory === "Category") {
        obj = {
          ...obj,
          category_id: [handlePaginationId],
          type: "Categories",
        };
      } else if (handlePaginationCategory === "SubCategory") {
        obj = { ...obj, sub_category_id: handlePaginationId };
      } else if (handlePaginationCategory === "ChildCategory") {
        obj = { ...obj, brick_id: handlePaginationId };
      } else {
        obj = {
          ...obj,
          category_id: QueryData.id,
          type: urlType,
          class_id: QueryData.id,
        };
      }
      data = qs.stringify({ ...obj });
    }
    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/searchproduct`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.data.status === "1") {
          setisActive(false);
          setLoader(false);
          setItemsData(response.data.itemsdata);
          setItemsData3(response.data.itemsdata);
          setPrdouctVisible(response.data.hide);
          setPageCount(response.data.resultscount);
          setCountProducts(response.data.countproducts);
        } else {
          toast.error(response.data.message);
          setisActive(false);
        }
      })
      .catch(function (error) {
        setisActive(false);
        setLoader(false);
        toast.error(error?.response?.data?.message);
      });
    setLoader(false);
  }

  function getproductcontentbyidapi() {
    var axios = require("axios");

    var qs = require("qs");
    var data = qs.stringify({
      id: QueryData?.id,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/getproductcontentdatabyid`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.data.status === "1") {
          setContentData(response.data.list);
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  }

  const handleAllProduct = (sortingData) => {
    setPage(0);
    setLoader(true);
    var location = null;
    var latitude = null;
    var longitude = null;

    if (window?.navigator && window?.navigator?.geolocation) {
      location = window?.navigator?.geolocation;
    }
    if (location) {
      location.getCurrentPosition(function (position) {
        latitude = position?.coords?.latitude;
        longitude = position?.coords?.longitude;

        window.scrollTo(0, 0);
        setListCategoriesname("");
        let uid;
        let cartValue = id;
        if (ipData === null) {
          uid = setSessionId(uuidv4());
          window.localStorage.setItem("IP", uuidv4());
        } else {
          setSessionId(ipData);
        }

        if (role_id === null) {
          cartValue = ipData;
        }
        var qs = require("qs");

        let data = null;
        let sortingPlayload = state.productPayload;
        let dict = { ...sortingPlayload, sort: sortingType };
        if (sorting) {
          data = qs.stringify(sortingData);
        } else {
          data = {
            user_id: "", // UserloginId,
            user_session_id: cartValue,
            category_id: QueryData.id,
            longitude: longitude,
            latitude: latitude,
            type: urlType,
            class_id: QueryData.id,
            sort: sortingType,
            page: 1,
            tcamtype: selectedClassType,
          };
          dispatch({
            type: "PRODUCT_PAYLOAD",
            payload: {
              productPayload: data,
            },
          });
        }
        data = qs.stringify({
          user_session_id: cartValue,
          user_id: "", // UserloginId,
          category_id: QueryData.id,
          longitude: longitude,
          latitude: latitude,
          type: urlType,
          class_id: QueryData.id,
          sort: sortingType,
          page: 1,
          tcamtype: selectedClassType,
        });
        var config = {
          method: "post",
          url: `${baseUrl}/healthcare/searchproduct`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data,
        };

        axios(config)
          .then(function (response) {
            if (response.data.status === "1") {
              setisActive(false);
              console.log(response.data.CategoriesData);
              setCategoriesData(response.data.CategoriesData);
              console.log(response.data?.countproducts);
              setCountProducts(response.data?.countproducts);
              console.log(response.data?.itemsdata);
              setItemsData(response.data?.itemsdata);
              setItemsData3(response.data?.itemsdata);
              setPrdouctVisible(response.data?.hide);
              setCountProducts1(response.data?.countproducts);
              setPageCount(response.data?.resultscount);
              console.log(response.data?.CategoriesData);
              setLoader(false);
              if (response.data?.AdsensePhotosurl) {
                setAdsense(response.data?.AdsenseData);
                setAdsensephotosurl(response.data?.AdsensePhotosurl);
              }
            } else {
              toast.error(response?.data?.message);
              setisActive(false);
              setLoader(false);
            }
          })
          .catch(function (error) {
            setisActive(false);
            setLoader(false);
          });
        var qs1 = require("qs");
        var dataId = qs1.stringify({
          id: cartValue,
        });

        var configWishList = {
          method: "post",
          url: `${baseUrl}/healthcare/listcartitemscount`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: dataId,
        };

        axios(configWishList)
          .then(function (response) {
            setLoader(false);
            dispatch({
              type: "ADD_WISHLISTCOUNT",
              payload: { wishListCount: response.data.wishlistlistcount },
            });
          })
          .catch(function (error) {
            setLoader(false);
            console.log(error);
          });
        listOfProducts();
      });
    }

    setTimeout(() => {
      setLongitude(longitude);
      setLatitude(latitude);
      if (latitude === null) {
        withoutLocationProduct();
      }
    }, [1000]);
  };

  const withoutLocationProduct = () => {
    setListCategoriesname("");
    let uid;
    let cartValue = id;
    if (ipData === null) {
      uid = setSessionId(uuidv4());
      window.localStorage.setItem("IP", uuidv4());
    } else {
      setSessionId(ipData);
    }

    if (role_id === null) {
      cartValue = ipData;
    }
    var qs = require("qs");
    var data = qs.stringify({
      user_session_id: cartValue,
      user_id: "", // UserloginId,
      category_id: QueryData.id,
      longitude: longitude,
      latitude: latitude,
      type: urlType,
      class_id: QueryData.id,
      tcamtype: selectedClassType,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/searchproduct`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.status === "1") {
          setisActive(false);
          setItemsData3(response.data.itemsdata);
          setItemsData(response.data.itemsdata);
          setPrdouctVisible(response.data.hide);
          setCountProducts1(response.data.countproducts);
          setCountProducts(response.data.countproducts);
          setPageCount(response.data.resultscount);
          console.log(response.data.CategoriesData);

          setCategoriesData(response.data.CategoriesData);
        } else {
          toast.error(response?.data?.message);
          setisActive(false);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
        setisActive(false);
      });
    var qs1 = require("qs");
    var dataId = qs1.stringify({
      id: cartValue,
    });

    var configWishList = {
      method: "post",
      url: `${baseUrl}/healthcare/listcartitemscount`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: dataId,
    };

    axios(configWishList)
      .then(function (response) {
        setLoader(false);
        dispatch({
          type: "ADD_WISHLISTCOUNT",
          payload: { wishListCount: response.data.wishlistlistcount },
        });
      })
      .catch(function (error) {
        setLoader(false);
      });
    listOfProducts();
  };

  const handleChildCategory = (item, value, index) => {
    setIsActiveChildSubCatIndex(index);
    setPage(0);
    setisActive(true);
    if (value === "0") {
      sorting = false;
    } else {
      sorting = true;
    }
    dispatch({
      type: "CATEGORY_DETAILS",
      payload: {
        categoryDetails: item,
      },
    });

    setChildTitle(item.title);
    handlePaginationCategory = "ChildCategory";
    setCurrentSelectedCategory("ChildCategory");
    handlePaginationId = item.id;
    var qs = require("qs");
    let childData = null;
    if (sorting) {
      childData = qs.stringify(value);
    } else {
      childData = {
        user_session_id: sessionId,
        user_id: "", // UserloginId,
        longitude: longitude,
        latitude: latitude,
        brick_id: item.id,
        sort: sortingType,
        page: 1,
        tcamtype: selectedClassType,
      };
      dispatch({
        type: "PRODUCT_PAYLOAD",
        payload: {
          productPayload: childData,
        },
      });
    }

    if (sorting) {
      childData = qs.stringify(value);
    } else {
      childData = qs.stringify({
        user_session_id: sessionId,
        user_id: "", // UserloginId,
        longitude: longitude,
        latitude: latitude,
        brick_id: item.id,
        sort: sortingType,
        page: 1,
        tcamtype: selectedClassType,
      });
    }

    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/searchproduct`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: childData,
    };

    axios(config)
      .then(function (response) {
        if (response.data.status === "1") {
          setisActive(false);
          setItemsData(response?.data?.itemsdata);
          setItemsData3(response?.data?.itemsdata);
          setPrdouctVisible(response?.data?.hide);
          setCountProducts(response?.data?.countproducts);
          setPageCount(response?.data?.resultscount);
        } else {
          toast.error(response?.data?.message);
          setisActive(false);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
        setisActive(false);
      });
  };

  const handleSubCategory = (item, value, index) => {
    setselectedchild(index);
    setIsActiveSubCatIndex(index);
    setIsActiveChildSubCatIndex(null);
    setPage(0);
    setisActive(true);
    if (value === "0") {
      sorting = false;
    } else {
      sorting = true;
    }
    dispatch({
      type: "CATEGORY_DETAILS",
      payload: {
        categoryDetails: item,
      },
    });

    handlePaginationCategory = "SubCategory";
    setCurrentSelectedCategory("SubCategory");
    handlePaginationId = item.id;
    setLoader(true);
    var axios = require("axios");
    var qs = require("qs");

    let data = null;
    let sortingPayload = state.categoryPayLoad;
    if (sorting) {
      data = sortingPayload;
    } else {
      data = qs.stringify({ class_id: item.id });
    }

    dispatch({
      type: "CATEGORY_PAYLOAD",
      payload: {
        categoryPayLoad: data,
      },
    });

    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/bricklistdata`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setListChildCategory(response.data.brickcodesdata);
        setLoader(false);
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
        setLoader(false);
      });

    setLoader(false);
    setSubCategoryTitle(item.title);

    let cartValue = id;
    if (role_id === null) {
      cartValue = sessionId;
    }
    var qs = require("qs");

    let dataSearch = null;
    if (sorting) {
      dataSearch = qs.stringify(value);
      setLoader(false);
    } else {
      dataSearch = {
        user_session_id: cartValue,
        user_id: "", // UserloginId,
        longitude: longitude,
        latitude: latitude,
        sub_category_id: item.id,
        sort: sortingType,
        page: 1,
        tcamtype: selectedClassType,
      };
      dispatch({
        type: "PRODUCT_PAYLOAD",
        payload: {
          productPayload: dataSearch,
        },
      });
      setLoader(false);
    }

    if (sorting) {
      dataSearch = qs.stringify(value);
    } else {
      dataSearch = qs.stringify({
        user_session_id: cartValue,
        user_id: "", // UserloginId,
        longitude: longitude,
        latitude: latitude,
        sub_category_id: item.id,
        sort: sortingType,
        page: 1,
        tcamtype: selectedClassType,
      });
    }

    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/searchproduct`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: dataSearch,
    };

    axios(config)
      .then(function (response) {
        if (response.data.status === "1") {
          setLoader(false);
          setisActive(false);
          setItemsData(response.data.itemsdata);
          setItemsData3(response.data.itemsdata);
          setPrdouctVisible(response.data.hide);
          setCountProducts(response.data.countproducts);
          setPageCount(response.data.resultscount);
        } else {
          setisActive(false);
          setLoader(false);
          toast.error(response.data.message);
        }
      })
      .catch(function (error) {
        setLoader(false);
        setisActive(false);
        toast.error(error?.response?.data?.message);
      });
    setLoader(false);
  };

  const handleCategory = (item, value, index) => {
    setIsActiveClassIndex(index);
    console.log(selectedClassType);
    setIsActiveSubCatIndex(null);
    let title = item.title;

    setPage(0);
    setisActive(true);
    if (value === "0") {
      sorting = false;
    } else {
      sorting = true;
    }
    dispatch({
      type: "CATEGORY_DETAILS",
      payload: {
        categoryDetails: item,
      },
    });
    setCheckmodecod("none");
    setSubCategoryTitle(null);
    setChildTitle(null);
    setListCategoriesname(item.title);
    let cartValue = id;
    if (role_id == null) {
      cartValue = sessionId;
    }
    handlePaginationCategory = "Category";
    setCurrentSelectedCategory("Category");
    handlePaginationId = item.id;
    // setLoader(true);
    var axios = require("axios");
    var qs = require("qs");
    let data = null;
    let sortingPayload = state.categoryPayLoad;
    if (sorting) {
      data = sortingPayload;
    } else {
      data = qs.stringify({ family_id: item.id });
    }

    dispatch({
      type: "CATEGORY_PAYLOAD",
      payload: {
        categoryPayLoad: data,
      },
    });

    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/classlistdata`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.status === "1") {
          setListSubCategories(response.data.classcodesdata);
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });

    let dataSearch = null;
    // if (sorting) {
    //   dataSearch = qs.stringify(value);
    // } else {
    //   dataSearch = {
    //     category_id: [item.id],
    //     type: "Categories",
    //     longitude: longitude,
    //     latitude: latitude,
    //     user_session_id: cartValue,
    //     user_id: "",
    //     sort: sortingType,
    //     page: 1,
    //     tcamtype: selectedClassType,
    //   };
    //   dispatch({
    //     type: "PRODUCT_PAYLOAD",
    //     payload: {
    //       productPayload: dataSearch,
    //     },
    //   });
    // }

    if (sorting) {
      dataSearch = qs.stringify(value);
    } else {
      dataSearch = qs.stringify({
        category_id: [item.id],
        type: "Categories",
        longitude: longitude,
        latitude: latitude,
        user_session_id: cartValue,
        user_id: "",
        sort: sortingType,
        page: 1,
        tcamtype:
          QueryData?.title === "Alternative Medicines(TCAM)"
            ? item?.title?.toLowerCase()
            : QueryData?.title === "Offers" || QueryData?.title === "Offer"
            ? "offers"
            : "",
      });
    }

    var configSearch = {
      method: "post",
      url: `${baseUrl}/healthcare/searchproduct`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: dataSearch,
    };

    axios(configSearch)
      .then(function (response) {
        if (response.data.status === "1") {
          setisActive(false);
          setItemsData(response.data.itemsdata);
          setItemsData3(response.data.itemsdata);
          setPrdouctVisible(response.data.hide);
          setCountProducts(response.data.countproducts);
          setPageCount(response.data.resultscount);
        } else {
          toast.error(response.data.message);
          setisActive(false);
        }
      })
      .catch(function (error) {
        setisActive(false);
        toast.error(error?.response?.data?.message);
      });
  };

  const handleAllData = () => {
    sorting = true;
    setselectedchild(0);
    setIsActiveClassIndex(0);
    setExpandedchild(false);
    setExpanded(false);
    handleAllProduct();
  };

  const handleHightoLow = () => {
    let CategoryDetails = state.categoryDetails;
    sortingType = -1;
    sorting = true;
    let productPayloaddata = state.productPayload;
    let new_obj = { ...productPayloaddata, sort: -1 };
    if (currentSelectedCategory === "Category") {
      handleCategory(CategoryDetails, new_obj, isActiveClassIndex);
    } else if (currentSelectedCategory === "SubCategory") {
      handleSubCategory(CategoryDetails, new_obj, isActiveSubCatIndex);
    } else if (currentSelectedCategory === "ChildCategory") {
      handleChildCategory(CategoryDetails, new_obj, isActiveChildSubCatIndex);
    } else {
      handleAllProduct(new_obj);
    }
  };

  const handleLowtoHigh = () => {
    let CategoryDetails = state.categoryDetails;
    sortingType = 1;
    sorting = true;
    let productPayloaddata = state.productPayload;
    let data = { ...productPayloaddata, sort: 1 };
    if (currentSelectedCategory === "Category") {
      handleCategory(CategoryDetails, data, isActiveClassIndex);
    } else if (currentSelectedCategory === "SubCategory") {
      handleSubCategory(CategoryDetails, data, isActiveSubCatIndex);
    } else if (currentSelectedCategory === "ChildCategory") {
      handleChildCategory(CategoryDetails, data, isActiveChildSubCatIndex);
    } else {
      handleAllProduct(data);
    }
  };

  const handleAddCart = (cardId, name, price, product_id) => {
    if (latitude == "undefined" && longitude == "undefined") {
      alert(
        "You denied to location permission,\nAllow the permission from browser's settings or add your product to cart."
      );
    } else {
      setLoader(true);
      let cartValue = id;
      if (role_id === null) {
        cartValue = sessionId;
      }
      var axios = require("axios");
      var qs = require("qs");
      var data = qs.stringify({
        user_session_id: cartValue,
        user_id: UserloginId,
        product_id: product_id,
        product_name: name,
        product_pharmacy_id: cardId,
        price: price,
        quantity: 1,
      });

      var config = {
        method: "post",
        url: `${baseUrl}/healthcare/addtocart`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };
      let addCartData = [];
      axios(config)
        .then(function (response) {
          setLoader(false);

          response.data.cartdata.map((item) => {
            addCartData.push({
              product_name: item.product_name,
              price: item.price,
              quantity: item.quantity,
            });
          });
          dispatch({
            type: "ADD_CART",
            payload: {
              cartCount: response.data.cartitemscount,
              cartData: addCartData,
            },
          });
          window.localStorage.setItem("cart", response.data.cartitemscount);
          window.localStorage.setItem(
            "localCartData",
            JSON.stringify(addCartData)
          );
          setLoader(false);
          toast.success(response.data.message);
        })
        .catch(function (error) {
          setLoader(false);
          console.log(error);
        });
    }
  };

  const handleHeartStatus = (
    name,
    productid,
    productpharmacyid,
    price,
    heartstatus
  ) => {
    let data = [...itemsData3];
    let objIndex = data.findIndex((obj) => obj.id == productpharmacyid);
    data[objIndex].heartstatus = heartstatus == 0 ? 1 : 0;
    setItemsData(data);

    if (heartstatus == 0) {
      heartstatus = 1;
    } else {
      heartstatus = 0;
    }

    let cartValue = id;
    if (role_id === null) {
      cartValue = sessionId;
    }
    var axios = require("axios");
    var qs = require("qs");
    var dataVal = qs.stringify({
      user_session_id: cartValue,
      user_id: UserloginId,
      product_id: productid,
      product_pharmacy_id: productpharmacyid,
      product_name: name,
      price: price,
      heartstatus: heartstatus,
    });
    // setLoader(true);
    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/addtowishlist`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: dataVal,
    };

    axios(config)
      .then(function (response) {
        toast.success(response.data.message);
        // setLoader(false);
        if (heartstatus == 0) {
          dispatch({
            type: "ADD_WISHLISTCOUNT",
            payload: { wishListCount: state.wishListCount - 1 },
          });
        } else {
          dispatch({
            type: "ADD_WISHLISTCOUNT",
            payload: { wishListCount: state.wishListCount + 1 },
          });
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    setSubCategoryTitle("");
    setSelectedClassType("");
    handleAllProduct();
    getproductcontentbyidapi();
    // handleAdsense();
  }, [QueryData]);

  const [expanded, setExpanded] = React.useState(false);
  const [expandedchild, setExpandedchild] = React.useState(false);

  const AccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const AccordionChangechild = (panel) => (event, isExpanded) => {
    setExpandedchild(isExpanded ? panel : false);
  };
  console.log(QueryData?.title);
  return (
    <>
      <Layout>
        <Box className={container}>
          <Box className={subContainer}>
            <Box className={breadCrumContainer}>
              <Breadcrumbs separator={">"}>
                <Link href={"/"}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "400", fontSize: "14px" }}
                  >
                    Home
                  </Typography>
                </Link>
                <Link href={"#"}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "400", fontSize: "14px" }}
                  >
                    {QueryData?.title}
                  </Typography>
                </Link>
                <Link href={"#"}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "400", fontSize: "14px" }}
                  >
                    {subCategoryTitle ? subCategoryTitle : ""}
                  </Typography>
                </Link>
              </Breadcrumbs>
            </Box>
            <Box className={contentContainer}>
              <Box className={`${catContainer} ${closeTab ? closetab : ""}`}>
                <Box
                  className={openingFlag}
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
                <Box
                  className={`${categoriesContainer} ${
                    closeTab ? closetab : ""
                  }`}
                >
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
                    {CategoriesData?.map((item, i) => {
                      return (
                        <Accordion
                          key={i}
                          expanded={expanded === item?.title}
                          onChange={AccordionChange(item?.title)}
                        >
                          <AccordionSummary
                            className={isActiveClassIndex == i ? active : ""}
                            expandIcon={<ExpandMoreIcon color={"inherit"} />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            onClick={() => {
                              handleCategory(item, "0", i);
                              console.log(item);
                              if (
                                QueryData?.title ===
                                "Alternative Medicines(TCAM)"
                              ) {
                                setSelectedClassType(
                                  item?.title?.toLowerCase()
                                );
                              } else if (
                                QueryData?.title === "Offers" ||
                                QueryData?.title === "Offer"
                              ) {
                                setSelectedClassType("offers");
                              }
                            }}
                          >
                            <Typography
                              color={"inherit"}
                              variant=""
                              sx={{
                                width: "100%",
                                flexShrink: 0,
                                fontSize: "14px",
                                color:
                                  isActiveClassIndex == i
                                    ? "white !important"
                                    : "auto",
                              }}
                            >
                              {item?.title}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails sx={{ padding: "0px" }}>
                            {lisSubtCategories?.length > 0
                              ? lisSubtCategories?.map((data, ind) => {
                                  return (
                                    <Accordion
                                      key={ind}
                                      expanded={expandedchild === data?.title}
                                      onChange={AccordionChangechild(
                                        data?.title
                                      )}
                                    >
                                      <AccordionSummary
                                        className={
                                          selectedchild === ind
                                            ? activeChild
                                            : ""
                                        }
                                        sx={{ padding: "0px 16px" }}
                                        onClick={() =>
                                          handleSubCategory(data, "0", ind)
                                        }
                                        expandIcon={
                                          <ExpandMoreIcon color={"inherit"} />
                                        }
                                      >
                                        <Typography
                                          color={"inherit"}
                                          sx={{
                                            fontSize: "14px",
                                            color:
                                              selectedchild == ind
                                                ? "white !important"
                                                : "auto",
                                          }}
                                        >
                                          {data.title}
                                        </Typography>
                                      </AccordionSummary>
                                      <AccordionDetails sx={{ padding: "0px" }}>
                                        {listChildCategory?.length > 0
                                          ? listChildCategory?.map(
                                              (itemss, index) => {
                                                return (
                                                  <Accordion key={index}>
                                                    <AccordionSummary
                                                      onClick={() =>
                                                        handleChildCategory(
                                                          itemss,
                                                          "0",
                                                          index
                                                        )
                                                      }
                                                      sx={{
                                                        padding: "0px 16px",
                                                      }}
                                                      expandIcon={
                                                        <ExpandMoreIcon
                                                          color={"inherit"}
                                                        />
                                                      }
                                                    >
                                                      <Typography
                                                        sx={{
                                                          fontSize: "14px",
                                                        }}
                                                      >
                                                        {itemss?.title}
                                                      </Typography>
                                                    </AccordionSummary>
                                                  </Accordion>
                                                );
                                              }
                                            )
                                          : null}
                                      </AccordionDetails>
                                    </Accordion>
                                  );
                                })
                              : null}
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                  </Box>
                </Box>
              </Box>

              <Box className={contentSection}>
                <Box>
                  <Image
                    src={
                      QueryData?.title === "Offer"
                        ? offer1
                        : QueryData?.title === "Healthcare"
                        ? healthcare
                        : QueryData?.title === "Beauty "
                        ? beauty
                        : QueryData?.title === "Alternative Medicines(TCAM)"
                        ? tcam
                        : QueryData?.title === "Food "
                        ? food
                        : QueryData?.title === "Clothing"
                        ? clothing
                        : QueryData?.title === "Cleaning "
                        ? cleaning
                        : offer1
                    }
                    alt={""}
                    quality={100}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "20px",
                    }}
                  />
                </Box>
                <Box className={lengthContainer}>
                  <Box>
                    {itemsData?.length > 0 ? (
                      <Typography>
                        Showing{" "}
                        <Typography
                          sx={{ fontWeight: "bold" }}
                          component={"span"}
                        >
                          {page * 20 + 1}
                        </Typography>{" "}
                        to{" "}
                        <Typography
                          sx={{ fontWeight: "bold" }}
                          component={"span"}
                        >
                          {page * 20 + itemsData?.length}
                        </Typography>{" "}
                        from
                        <Typography
                          sx={{ fontWeight: "bold" }}
                          component={"span"}
                        >
                          {" "}
                          {countProducts}
                        </Typography>{" "}
                        items
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Box>
                  <Box className={buttonContainer}>
                    <Typography>Sort By:</Typography>
                    <Box variant="" className={buttons} onClick={handleAllData}>
                      All
                    </Box>
                    <Box
                      variant=""
                      className={buttons}
                      onClick={handleHightoLow}
                    >
                      High to Low
                    </Box>
                    <Box
                      variant=""
                      className={buttons}
                      onClick={handleLowtoHigh}
                    >
                      Low to High
                    </Box>
                  </Box>
                </Box>
                <Box className={cardsContainer}>
                  {itemsData?.map((data, i) => {
                    return (
                      <ProductCard
                        key={i}
                        data={data}
                        handleAddCart={handleAddCart}
                        handleHeartStatus={handleHeartStatus}
                      />
                    );
                  })}
                </Box>
                <Box>
                  <Stack spacing={22}>
                    <Pagination
                      count={Math.ceil(countProducts / 20)}
                      onChange={handleChange}
                      // currentPage={1}
                      onPageActive={1}
                      shape="rounded"
                    />
                  </Stack>
                </Box>
                <Box className={typoContainer}>
                  <Typography sx={{ fontSize: "1rem" }}>
                    At Medy, we believe that everyone deserves to live a healthy
                    and fulfilling life and also emphasize the importance of
                    taking care of your health. We provide you with a vast range
                    of products and services that can make your life easy.
                  </Typography>
                  <Typography sx={{ fontSize: "1rem" }}>
                    On Medy’s platform, you can find a collection of products
                    that are on offer from pharmacies around the country. You
                    will find everything from over-the-counter medications to
                    vitamins and supplements, all at discounted prices.
                  </Typography>
                  <Typography sx={{ fontSize: "1rem" }}>
                    Finding the best deals on healthcare products can be a
                    hassle, but exclusive Medy’s offers have made it easier. We
                    have gathered all the best deals in one place so that you
                    can save your precious time and money.
                  </Typography>
                  <Typography sx={{ fontSize: "1rem" }}>
                    Whether you are trying to stock up on your cold and flu
                    medicine or you run out of shampoo and conditioner, you are
                    sure to find something on our Offers page, and that too with
                    exclusive deals from the top pharmacies.
                  </Typography>
                  <Typography sx={{ fontSize: "1rem" }}>
                    So why not look around and see what deals you can find? You
                    will be amazed at how much you can save by shopping with our
                    premium offers and deals. And as always, we are committed to
                    providing high-quality products from trusted brands, so you
                    can shop with confidence.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Layout>
      {loader ? <Loader /> : null}
    </>
  );
};

export default OfferProducts;
