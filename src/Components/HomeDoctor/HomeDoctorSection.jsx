import theme from "@/Theme/theme";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      padding: "20px",
      background: theme.palette.white.main,
    },
    contentContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      gap: "20px",
      flexWrap: "wrap",
    },

    Card: {
      width: "100%",
      maxWidth: "440px",
      minHeight: "200px",
      display: "flex",
      alignItems: "start",
      gap: "20px",
      padding: "20px",
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      borderRadius: "10px",
      cursor: "pointer",
    },
  };
});

const HomeDoctorSection = ({ imagedata, count, page }) => {
  const { container, contentContainer, Card } = useStyle();
  console.log(imagedata, count, page);
  const history = useRouter();
  async function handleChange(event, value) {
    window.scrollTo(0, 0);
    history.push(`/HomeDoctor?page=${value}`);
  }

  const handleConsultDr = (item) => {
    history.push({
      pathname: `/Signin`,
      query: { id: item.slug },
    });
    window.localStorage.setItem(
      "doctor_url",
      "/dashboard/doctor-information?id"
    );
    window.localStorage.setItem(
      "url",
      `/dashboard/doctor-information?id=${item.slug}`
    );
  };

  return (
    <Box className={container}>
      <Box>
        <Typography>
          Showing{" "}
          <Typography component={"span"} sx={{ fontWeight: "bold" }}>
            {(page - 1) * 20 + 1}
          </Typography>{" "}
          to
          <Typography component={"span"} sx={{ fontWeight: "bold" }}>
            {" "}
            {(page - 1) * 20 + imagedata?.length}
          </Typography>{" "}
          from
          <Typography component={"span"} sx={{ fontWeight: "bold" }}>
            {" "}
            {count}
          </Typography>{" "}
          items
        </Typography>
      </Box>
      <Box className={contentContainer}>
        {imagedata.length > 1 ? (
          imagedata?.map((data, i) => {
            return (
              <Box
                key={i}
                className={Card}
                onClick={() => handleConsultDr(data)}
              >
                <Box>
                  <Image
                    src={data?.Profile_Photo}
                    alt={""}
                    height={1000}
                    width={1000}
                    style={{
                      width: "100px",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: "500" }}>
                    {data?.First_Name}
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    Fee : {Number(data.Consultation_fee).toFixed(2)} AED
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    Hospital : {data.hospitalname}
                  </Typography>
                </Box>
              </Box>
            );
          })
        ) : (
          <Typography>
            The doctors seem to have lost their stethoscope, please be patient
            till we help them find it.
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {count && count > 12 ? (
          <div className="pagination-list">
            <Stack spacing={22}>
              <Pagination
                count={Math.ceil(count / 12)}
                onChange={handleChange}
                // currentPage={1}
                onPageActive={1}
                shape="rounded"
              />
            </Stack>
          </div>
        ) : null}
      </Box>
    </Box>
  );
};

export default HomeDoctorSection;
