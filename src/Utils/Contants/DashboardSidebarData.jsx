
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ReorderIcon from "@mui/icons-material/Reorder";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Groups3Icon from "@mui/icons-material/Groups3";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ReportIcon from "@mui/icons-material/Report";
import LogoutIcon from "@mui/icons-material/Logout";
import TextsmsIcon from "@mui/icons-material/Textsms";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
export const sidebarData = [
  {
    icon: <ViewComfyIcon />,
    title: "Dashboard",
    link: "",
    subChild: [],
  },
  {
    icon: <AccountCircleIcon />,
    title: "Profile",
    link: "#",
    subChild: [
      {
        icon: <AccountCircleIcon />,
        title: "My Profile",
        link: "#",
        subChild2: [],
      },
      {
        icon: <ContactMailIcon />,
        title: "Edit Profile",
        link: "#",
        subChild2: [],
      },
    ],
  },
  {
    icon: <ShoppingBagIcon />,
    title: "Orders",
    link: "",
    subChild: [],
  },
  {
    icon: <ReorderIcon />,
    title: "Product List",
    link: "",
    subChild: [],
  },
  {
    icon: <NotificationsActiveIcon />,
    title: "Notification",
    link: "",
    subChild: [],
  },
  {
    icon: <DocumentScannerIcon />,
    title: "My Prescriptions",
    link: "",
    subChild: [],
  },
  {
    icon: <LocalHospitalIcon />,
    title: "My Pharmacy",
    link: "",
    subChild: [],
  },
  {
    icon: <Groups3Icon />,
    title: "Pharmacist Staff Management",
    link: "",
    subChild: [],
  },
  {
    icon: <Diversity1Icon />,
    title: "Delivery Staff Management",
    link: "",
    subChild: [],
  },
  {
    icon: <AssessmentIcon />,
    title: "Report Management",
    link: "",
    subChild: [
      {
        icon: <ReportIcon />,
        title: "Order Report Management",
        link: "#",
        subChild2: [],
      },
      {
        icon: <ReportIcon />,
        title: "Delivery Boy Report",
        link: "#",
        subChild2: [],
      },
    ],
  },
  {
    icon: <TextsmsIcon />,
    title: "Grievance",
    link: "",
    subChild: [],
  },
  {
    icon: <LogoutIcon />,
    title: "Logout",
    link: "",
    subChild: [],
  },
];