"use client";

import { TCAMBreadcrumbsContext } from "@/Context/TCAMBreadcrumbsContext";
import { Breadcrumbs, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

const TCAMBreadcrumb = () => {
  const { breadCrumbList, setbreadCrumbList } = useContext(
    TCAMBreadcrumbsContext
  );
  let history = useRouter();

  const handelClick = (breadcrumb) => {
    history.push({
      pathname: breadcrumb?.path,
      query: breadcrumb?.query ? { ...history?.query } : undefined,
    });
  };

  useEffect(() => {
    console.log(history?.pathname.split("/TCAM")[1]);
    if (breadCrumbList?.length < 2) {
      let List = JSON.parse(JSON.stringify(breadCrumbList));
      List.push({
        path: "/TCAMPartnerProfile",
        query: true,
        name: history?.query?.TcamName,
      });
      setbreadCrumbList(List);
    }

    setbreadCrumbList((prev) => {
      if (prev?.length === 2) {
        let List = JSON.parse(JSON.stringify(prev));
        List.push({
          path: history?.pathname,
          query: true,
          name: history?.pathname.split("/TCAM")[1],
        });
        return List;
      } else if (prev?.length > 2) {
        let List = JSON.parse(JSON.stringify(prev));
        List.splice(List.length - 1, 1, {
          path: history?.pathname,
          query: true,
          name: history?.pathname.split("/TCAM")[1],
        });
        return List;
      }
    });
  }, [history]);
  console.log(breadCrumbList);

  return (
    <Paper
      sx={{
        padding: "10px",
        backgroundColor: (theme) => theme?.palette?.background?.grey,
      }}
      elevation={0}
    >
      <Breadcrumbs aria-label="breadcrumb">
        {breadCrumbList?.map((breadcrumb, idx) => {
          return (
            <Typography
              underline="hover"
              color="inherit"
              key={idx}
              onClick={() => handelClick(breadcrumb)}
              sx={{
                cursor: "pointer",
                color: (theme) => theme.palette.primary.main,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {breadcrumb?.name}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </Paper>
  );
};

export default TCAMBreadcrumb;
