import { SnackbarContext } from "@/Context/SnackbarContext";
import { Alert, Snackbar } from "@mui/material";
import React, { useContext } from "react";

const SnackBar = () => {
  const { snackbarData, setsnackbarData } = useContext(SnackbarContext);

  const handleClose = (e) => {
    setsnackbarData({
      openToast: false,
      type: "",
      message: "",
    });
  };
  return (
    <Snackbar
      open={snackbarData?.openToast}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarData?.type}
        sx={{ width: "100%" }}
      >
        {snackbarData?.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
