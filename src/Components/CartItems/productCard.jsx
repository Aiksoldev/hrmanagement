import { Box, IconButton, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      alignItems: "start",
      justifyContent: "space-between",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
    },
    ImageDetailsSection: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    quantityContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    quantityBox: {
      display: "flex",
      justifyContent: "start",
      padding: "10px 0px",
    },
    iconButton: {
      borderRadius: "2px !important",
      border: `1px solid ${theme.palette.grey[300]} !important`,
    },
  };
});

const ProductCard = ({ item, handleQuantity, handleDelete }) => {
  const {
    container,
    quantityContainer,
    ImageDetailsSection,
    quantityBox,
    iconButton,
  } = useStyle();
  return (
    <Box className={container}>
      <Box className={ImageDetailsSection}>
        <Box>
          <Image
            src={item?.product_image}
            alt={""}
            height={1000}
            width={1000}
            style={{ width: "100%", maxWidth: "80px", height: "auto" }}
          />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: "500", fontSize: "16px" }}>
            {" "}
            {item.product_name?.split(" ")[0] + " "}
            {item.product_name?.split(" ")[1] + " "}
            {item.product_name?.split(" ")[2] + " "}
            ...
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>{item.pharmacyname}</Typography>
          <Typography color={"primary"} sx={{ fontWeight: "600" }}>
            AED {(item.quantity * item.price).toFixed(2)}
          </Typography>
        </Box>
      </Box>
      <Box className={quantityContainer}>
        <Box>
          <Box className={quantityBox}>
            <IconButton
              className={iconButton}
              onClick={() => {
                handleQuantity("decrement", item);
              }}
            >
              <RemoveIcon sx={{ fontSize: "20px" }} />
            </IconButton>
            <TextField
              value={item?.quantity}
              sx={{ width: "50px" }}
              size="small"
              InputProps={{
                style: {
                  borderRadius: "0px",
                  textAlign: "center",
                },
              }}
              inputProps={{ style: { textAlign: "center" } }}
              disabled
            />
            <IconButton
              className={iconButton}
              onClick={() => {
                handleQuantity("increment", item);
              }}
            >
              <AddIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <IconButton
            onClick={() => {
              handleDelete(item.id, item);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
