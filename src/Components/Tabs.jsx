import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PharmacyGrupOrders from "./PharmacyGrupOrders";
import PharmacyGroupProductList from "./PharmacyGroupProductList";
const Tabs = ({
  limit,
  listproductcount,
  pharmacyorderdatalist,
  productcountt,
}) => {
  console.log(limit);
  console.log(listproductcount);
  console.log(pharmacyorderdatalist);
  console.log(productcountt);
  const history = useRouter();
  const handleChange = (event, newValue) => {
    console.log(newValue);
    history.push({
      pathname: "",
      query: { Status: newValue },
    });
  };
  const Tabs = [
    {
      name: "All",
      selecetd: true,
      component: (
        <PharmacyGrupOrders
          limit={limit}
          listproductcount={listproductcount}
          pharmacyorderdatalist={pharmacyorderdatalist}
          productcountt={productcountt}
        />
      ),
    },
    {
      name: "Shipped",
      selecetd: false,
      component: <PharmacyGroupProductList />,
    },
    {
      name: "Pending",
      selecetd: false,
      component: <Typography>Pending</Typography>,
    },
    {
      name: "Delivered",
      selecetd: false,
      component: <Typography>Delivered</Typography>,
    },
    {
      name: "Cancelled",
      selecetd: false,
      component: <Typography>Cancelled</Typography>,
    },
  ];
  console.log(history);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={history?.query?.Status || "All"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                {Tabs?.map((tab) => {
                  return (
                    <Tab label={tab?.name} value={tab?.name} key={tab?.name} />
                  );
                })}
              </TabList>
            </Box>
            {Tabs?.map((tab) => {
              return (
                <TabPanel value={tab?.name} key={tab?.name}>
                  {tab?.component}
                </TabPanel>
              );
            })}
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default Tabs;
