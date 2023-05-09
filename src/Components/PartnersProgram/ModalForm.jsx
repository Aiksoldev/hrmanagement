import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Modal,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Country, State, City } from "country-state-city";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      width: "90%",
      maxWidth: "1000px",
      background: theme.palette.white.main,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      margin: "20px auto",
      height: "80vh",
      overflowY: "scroll",
      border: "none",
    },
    contentContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding: "20px",
    },
    FieldInRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
    },
  };
});

const ModalForm = ({ open, setOpen, title }) => {
  const { container, contentContainer, FieldInRow } = useStyle();
  const [showPassword, setShowPassword] = React.useState(false);
  const [countryList, setCountryList] = useState(null);
  const [country, setCountry] = useState(null);
  const [stateList, setStateList] = useState(null);
  const [state, setState] = useState(null);
  const [cityList, setCityList] = useState(null);
  const [city, setCity] = useState(null);
  //   const [addLocation, setAddlocation] = useState({
  //     lat: currentlat,
  //     lng: currentlng,
  //   });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  let temp = [];
  useEffect(() => {
    Country.getAllCountries()?.map((item) => {
      let dict = {
        label: item?.name,
        value: item?.isoCode,
      };
      temp.push(dict);
    });
    setCountryList(temp);
  }, []);

  const handleClose = (e) => {
    setOpen(false);
  };
  return (
    <Modal open={open} onClose={handleClose} sx={{ padding: "20px" }}>
      <Box className={container}>
        <Box className={contentContainer}>
          <Box>
            <Typography
              variant="h6"
              color={"primary"}
              sx={{ fontWeight: "400" }}
            >
              Register As {title}
            </Typography>
          </Box>
          <Box>
            <Typography>Register As</Typography>
          </Box>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <FormControlLabel
                  value="individual"
                  control={<Radio />}
                  label="Individual Hospital"
                />
                <FormControlLabel
                  value="group"
                  control={<Radio />}
                  label="Group"
                />
              </Box>
            </RadioGroup>
          </FormControl>

          <Box className={FieldInRow}>
            <FormControl fullWidth>
              <Typography sx={{ padding: "5px 0px" }}>Name</Typography>
              <TextField
                name="name"
                fullWidth
                size="small"
                placeholder="Name"
                InputProps={{ style: { borderRadius: "100px" } }}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography sx={{ padding: "5px 0px" }}>E-Mail</Typography>
              <TextField
                name="email"
                fullWidth
                placeholder="E-Mail"
                size="small"
                InputProps={{ style: { borderRadius: "100px" } }}
              />
            </FormControl>
          </Box>

          <Box className={FieldInRow}>
            <FormControl fullWidth>
              <Typography sx={{ padding: "5px 0px" }}>Password</Typography>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                sx={{ borderRadius: "100px" }}
                fullWidth
                size="small"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography sx={{ padding: "5px 0px" }}>Phone Number</Typography>
              <PhoneInput
                country={"ae"}
                inputProps={{
                  maxLength: "16",
                }}
                inputStyle={{
                  height: "40px",
                  width: "100%",
                  borderRadius: "100px",
                }}
              />
            </FormControl>
          </Box>

          <Box className={FieldInRow}>
            <FormControl fullWidth>
              <Typography sx={{ padding: "5px 0px" }}>
                Expiry date of DHA license
              </Typography>
              <TextField
                name="name"
                fullWidth
                size="small"
                type="date"
                placeholder="Name"
                InputProps={{ style: { borderRadius: "100px" } }}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography sx={{ padding: "5px 0px" }}>
                DHA License Number
              </Typography>
              <TextField
                name="email"
                fullWidth
                placeholder="E-Mail"
                size="small"
                InputProps={{ style: { borderRadius: "100px" } }}
              />
            </FormControl>
          </Box>

          <Box className={FieldInRow}>
            <FormControl fullWidth>
              <Typography sx={{ padding: "5px 0px" }}>
                Trade License Number
              </Typography>
              <TextField
                name="name"
                fullWidth
                size="small"
                placeholder="Name"
                InputProps={{ style: { borderRadius: "100px" } }}
              />
            </FormControl>
            <FormControl fullWidth>
              <Typography sx={{ padding: "5px 0px" }}>
                Expiry date of Trade license
              </Typography>
              <TextField
                name="email"
                fullWidth
                type="date"
                placeholder="E-Mail"
                size="small"
                InputProps={{ style: { borderRadius: "100px" } }}
              />
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Checkbox />
            <Typography>Custom Address</Typography>
          </Box>
          <Box>
            <FormControl fullWidth>
              <Typography sx={{ padding: "5px 0px" }}>
                Manual Address
              </Typography>
              <TextField
                name="email"
                fullWidth
                placeholder="E-Mail"
                size="small"
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalForm;
