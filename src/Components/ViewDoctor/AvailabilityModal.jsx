import { Box, IconButton, Modal, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      border: "1px solid red",
      width: 350,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      border: "none",
      borderRadius: "10px",
      background: theme.palette.white.main,
    },
    titleContainer: {
      width: "100%",
      padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#25aae1",
      color: theme.palette.white.main,
    },
    dayContainer: {
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      width: "100%",
    },
    fieldInRow: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "20px",
    },
  };
});

const AvailabilityModal = ({ open, setopen, weeklyslot }) => {
  console.log(weeklyslot?.Monday);
  const { container, titleContainer, dayContainer, fieldInRow } = useStyle();
  const handleClose = () => {
    setopen(false);
  };
  return (
    <Modal open={open} onClose={handleClose} sx={{ border: "none" }}>
      <Box className={container}>
        <Box className={titleContainer}>
          <Typography variant="h6">Availability Detail</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon
              color="inherit"
              sx={{ color: (theme) => theme.palette.white.main }}
            />
          </IconButton>
        </Box>
        <Box className={dayContainer}>
          <Box className={fieldInRow}>
            <Typography>Monday</Typography>
            <Typography>
              {weeklyslot?.Monday[0]?.status === "Open" ? (
                <>
                  {weeklyslot?.Monday[0]?.start_time} -
                  {weeklyslot?.Monday[0]?.end_time}
                </>
              ) : (
                "Closed"
              )}
            </Typography>
          </Box>

          <Box className={fieldInRow}>
            <Typography>Tuesday</Typography>
            <Typography>
              {weeklyslot?.Tuesday[0]?.status === "Open" ? (
                <>
                  {weeklyslot?.Tuesday[0]?.start_time} -
                  {weeklyslot?.Tuesday[0]?.end_time}
                </>
              ) : (
                "Closed"
              )}
            </Typography>
          </Box>

          <Box className={fieldInRow}>
            <Typography>Wednesday</Typography>
            <Typography>
              {weeklyslot?.Wednesday[0]?.status === "Open" ? (
                <>
                  {weeklyslot?.Wednesday[0]?.start_time} -
                  {weeklyslot?.Wednesday[0]?.end_time}
                </>
              ) : (
                "Closed"
              )}
            </Typography>
          </Box>

          <Box className={fieldInRow}>
            <Typography>Thursday</Typography>
            <Typography>
              {weeklyslot?.Thursday[0]?.status === "Open" ? (
                <>
                  {weeklyslot?.Thursday[0]?.start_time} -
                  {weeklyslot?.Thursday[0]?.end_time}
                </>
              ) : (
                "Closed"
              )}
            </Typography>
          </Box>

          <Box className={fieldInRow}>
            <Typography>Friday</Typography>
            <Typography>
              {weeklyslot?.Friday[0]?.status === "Open" ? (
                <>
                  {weeklyslot?.Friday[0]?.start_time} -
                  {weeklyslot?.Friday[0]?.end_time}
                </>
              ) : (
                "Closed"
              )}
            </Typography>
          </Box>

          <Box className={fieldInRow}>
            <Typography>Saturday</Typography>
            <Typography>
              {weeklyslot?.Saturday[0]?.status === "Open" ? (
                <>
                  {weeklyslot?.Saturday[0]?.start_time} -
                  {weeklyslot?.Saturday[0]?.end_time}
                </>
              ) : (
                "Closed"
              )}
            </Typography>
          </Box>

          <Box className={fieldInRow}>
            <Typography>Sunday</Typography>
            <Typography>
              {weeklyslot?.Sunday[0]?.status === "Open" ? (
                <>
                  {weeklyslot?.Sunday[0]?.start_time} -
                  {weeklyslot?.Sunday[0]?.end_time}
                </>
              ) : (
                "Closed"
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AvailabilityModal;
