import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";
import { TrendingUpOutlined } from "@mui/icons-material";

const PharmacyGrupOrders = ({
  limit,
  listproductcount,
  pharmacyorderdatalist,
  productcount,
}) => {
  const [filterData, setfilterData] = useState({
    searchkey: "",
    todate: "",
    fromdate: "",
  });

  const [Limit, setLimit] = useState(0);
  const [ListProductCount, setListProductCount] = useState(0);
  const [PharmacayOrderDataList, setPharmacayOrderDataList] = useState([]);
  const [ProductCount, setProductCount] = useState(0);
  const [OrderDetail, setOrderDetail] = useState(null);
  const [ShowOrderDetailModal, setShowOrderDetailModal] = useState(false);
  const [InvoiceList, setInvoiceList] = useState(null);
  const SearchByOrderNum = () => {
    window.scrollTo(0, 0);
    var qs = require("qs");

    var data = qs.stringify(filterData);
    var config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API}/healthcare/groupsearch/order`,
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLimit(response.data?.limit);
        setListProductCount(response.data?.listproductcount);
        setPharmacayOrderDataList(response.data?.pharmacyorderdatalist);
        setProductCount(response.data?.productcount);
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    setLimit(limit);
    setListProductCount(listproductcount);
    setPharmacayOrderDataList(pharmacyorderdatalist);
    setProductCount(productcount);
  }, []);

  const handelReset = () => {
    setLimit(limit);
    setListProductCount(listproductcount);
    setPharmacayOrderDataList(pharmacyorderdatalist);
    setProductCount(productcount);
    setfilterData({
      searchkey: "",
      todate: "",
      fromdate: "",
    });
  };

  const handleOrderDetails = (data) => {
    var qs = require("qs");
    var payloadData = qs.stringify({
      order_id: data?.order_id,
    });

    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/viewordersdetails`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: payloadData,
    };

    axios(config)
      .then(function (response) {
        if (response.data.status === "1") {
          setOrderDetail(response.data.vieworderdata);
          setShowOrderDetailModal(TrendingUpOutlined);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });

    var config_1 = {
      method: "get",
      url: `${baseUrl}/healthcare/pharmacyinvoicepdf?order_id=${data?.order_id}&pharmacy_id=${data?.pharmacy_id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios(config_1)
      .then(function (response) {
        if (response.data.status === "1") {
          setInvoiceList(response.data.invoice);
        } else {
          // toast.error(response.data.message);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  const getLyveOrderDetails = (data) => {
    setLoader(true);
    var axios = require("axios");
    var qs = require("qs");
    let payloadData = null;

    payloadData = qs.stringify({
      order_number: data?.ordernum,
      type: data?.deliveryboy == "lyve" ? "lyve" : "medy",
    });

    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/lyveorderstatusapi`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: payloadData,
    };
    axios(config)
      .then(function (response) {
        if (response.data.status === "1") {
          let origin = response?.data?.origin;
          let destination = response?.data?.destination;

          //   dispatch({
          //     type: "TRACKING_ADDRESS",
          //     payload: {
          //       origionAddress: origin,
          //       destinationAddress: destination,
          //       addressTrackingModal: true,
          //       lyveorderDetails: response.data,
          //     },
          //   });
          //   setLoader(false);
          if (response.data.order_status != data?.order_status) {
            handleModelStatus(response.data.order_status, data?.order_id);
          }
        } else {
          toast.error(response.data.message);
          setLoader(false);
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
        setLoader(false);
      });
  };

  const handleModelStatus = (orderData, orderId) => {
    console.log("aditya", orderId);
    var axios = require("axios");
    var qs = require("qs");
    var data = qs.stringify({
      order_id: orderId,
      status: orderData,
      ordercheck: 1,
      product_order_id: "",
      pharmacy_id: Id,
    });
    var config = {
      method: "post",
      url: `${baseUrl}/healthcare/orderstatuschange`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.status == "1") {
          handelReset();
        }
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
        }}
      >
        <FormControl fullWidth variant="outlined">
          <OutlinedInput
            size="small"
            name="searchkey"
            id="outlined-adornment-password"
            type="text"
            sx={{ borderRadius: "5px", overflow: "hidden" }}
            fullWidth
            onChange={(e) =>
              setfilterData({ ...filterData, [e.target.name]: e.target.value })
            }
            value={filterData?.searchkey}
            placeholder="Search By Order No..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => SearchByOrderNum()}
                  sx={{
                    borderRadius: "5px",
                    marginRight: "-15px",
                    padding: "10px",
                    fontSize: "16px",
                    height: "60px",
                    background: "#7fb535",

                    color: (theme) => theme.palette.white.main,
                  }}
                  edge="end"
                >
                  <SearchIcon
                    sx={{
                      fontWeight: "bold",
                    }}
                  />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Box>
          <Button
            size="small"
            variant="contained"
            sx={{
              padding: "6px 25px",
              borderRadius: "5px",
              width: "max-content",
              textTransform: "capitalize",
              fontSize: "1rem",
            }}
            onClick={handelReset}
          >
            Reset
          </Button>
        </Box>
        <Box>
          <Button
            size="small"
            variant="contained"
            sx={{
              padding: "6px 25px",
              borderRadius: "5px",
              width: "max-content",
              textTransform: "capitalize",
              fontSize: "1rem",
            }}
          >
            Select Date
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="a dense table"
          stripe
        >
          <TableHead>
            <TableRow>
              <TableCell>Order No</TableCell>
              <TableCell align="left">User Name</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Order Status</TableCell>
              <TableCell align="left">Pharmacist</TableCell>
              <TableCell align="left">Delivery Boy</TableCell>
              <TableCell align="left">View Order</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PharmacayOrderDataList?.map((item, index) => {
              return (
                <TableRow
                  key={item.ordernum + index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    row.name
                  </TableCell>
                  <TableCell align="left">{item.ordernum}</TableCell>
                  <TableCell align="left">{item.name}</TableCell>
                  <TableCell align="left">{item.shipping_address}</TableCell>
                  <TableCell align="left">
                    {moment(item.created_at, "DD-MM-YYYY")}
                  </TableCell>
                  <TableCell align="left">{item?.order_status}</TableCell>
                  <TableCell align="left">{item?.pharmacistname}</TableCell>

                  <TableCell align="left">
                    {item.deliveryboy !== "Not Assign" ? (
                      <button
                        onClick={() => getLyveOrderDetails(item)}
                        className="dropdown-item"
                      >
                        <span>
                          <i
                            className="fa-solid fa-truck-clock"
                            id="togglePassword"
                          ></i>
                        </span>{" "}
                        {item.deliveryboy}
                      </button>
                    ) : (
                      item.deliveryboy
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <button
                      onClick={() => handleOrderDetails(item)}
                      className="dropdown-item"
                    >
                      <span>
                        <i className="far fa-eye" id="togglePassword"></i>
                      </span>{" "}
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PharmacyGrupOrders;
