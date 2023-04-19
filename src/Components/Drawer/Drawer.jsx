import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";


const useStyle = makeStyles((theme)=>{
  return {
    Active:{
      background:theme.palette.grey[200]
    }
  }
})

export default function TemporaryDrawer({ open, setOpen, navlinks }) {
  const {Active} = useStyle()
    const router = useRouter()
    const handleNavigate = (link)=>{
        router.push(link)
    }
  return (
    <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {navlinks.map((text, index) =>
            index < 3 ? (
              <ListItem
                key={index}
                disablePadding
                onClick={() => handleNavigate(text?.link)}
                className={text?.selected ? Active : ""}
              >
                <ListItemButton>
                  <ListItemIcon>{text?.icons}</ListItemIcon>
                  <ListItemText primary={text?.title} color="inherit" />
                </ListItemButton>
              </ListItem>
            ) : null
          )}
        </List>
        <Divider />
        <List>
          {navlinks.map((text, index) =>
            index >= 3 ? (
              <ListItem
                key={index}
                disablePadding
                onClick={() => handleNavigate(text?.link)}
                className={text?.selected ? Active : ""}
              >
                <ListItemButton>
                  <ListItemIcon>{text?.icons}</ListItemIcon>
                  <ListItemText primary={text?.title} />
                </ListItemButton>
              </ListItem>
            ) : null
          )}
        </List>
      </Box>
    </Drawer>
  );
}
