import { Box, Button, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/router";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      width: "100%",
      maxWidth: "360px",
      padding: "20px",
      minHeight: "250px",
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      position: "relative",
      textAlign: "center",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: theme.palette.white.main,
      gap: "10px",
      borderRadius: "10px",
      cursor: "pointer",
    },
    likeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      zIndex: "100",
    },
    ImageContainer: {
      width: "100%",
    },
  };
});

const ProductCard = ({ data, handleAddCart, handleHeartStatus }) => {
  const { container, likeButton, ImageContainer } = useStyle();
  const router = useRouter();
  const handleProductDetails = (link) => {
    console.log(link);
    router.push(`/Products/Details/${link?.slug}`);
  };
  return (
    <Box
      className={container}
      onClick={(e) => {
        e.stopPropagation();
        handleProductDetails(data);
      }}
    >
      <Box className={likeButton}>
        <IconButton
          disableRipple
          sx={{
            padding: "2px 5px",
            borderRadius: "5px",
            background: (theme) => theme.palette.text.secondary,
            color: (theme) => theme.palette.white.main,
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleHeartStatus(
              data.name,
              data.product_id,
              data.id,
              data.price,
              data.heartstatus
            );
          }}
        >
          {data.heartstatus == 0 ? (
            <FavoriteBorderIcon color="inherit" sx={{ fontSize: "20px" }} />
          ) : (
            <FavoriteIcon color="inherit" sx={{ fontSize: "20px" }} />
          )}
        </IconButton>
      </Box>
      <Box className={ImageContainer}>
        <Image
          src={data?.image}
          alt={""}
          height={1000}
          width={1000}
          quality={100}
          style={{ width: "auto", height: "200px" }}
        />
      </Box>
      <Box>
        <Typography sx={{ fontSize: "14px", fontWeight: "400" }}>
          {data?.name}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        AED {Number(data?.price).toFixed(2)}
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
            position: "absolute",
            right: "10px",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <StarIcon color="inherit" />
          {data?.averageRating}
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        {data.instockvalue == 0 ? (
          <Button fullWidth variant="contained">
            Out Of Stock
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              handleAddCart(data.id, data.name, data.price, data.product_id);
            }}
          >
            <ShoppingCartIcon /> Add To Cart
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;
