import HRMFeaturesCard from "@/Components/Cards/HRMFeaturesCard";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { Fade } from "react-awesome-reveal";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import BackpackIcon from "@mui/icons-material/Backpack";
import AddchartIcon from "@mui/icons-material/Addchart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import StorageIcon from "@mui/icons-material/Storage";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      width: "100%",
      overflow: "hidden",
      display: "flex",
      flexWrap: "wrap",
      gap: "40px",
      justifyContent: "space-evenly",
      padding:'20px 20px'
    },
    Card: {
      width: "100%",
      maxWidth: "350px",
    },
  };
});

const HRMFeatures = () => {
  const { container, Card } = useStyle();
  const [cardData] = useState([
    {
      icon: (
        <ImportantDevicesIcon color={"inherit"} sx={{ fontSize: "55px" }} />
      ),
      title: "Employee Self Service",
      desc: "ESS delivers a superior user experience by combining web-based and mobile simplicity with powerful and practical features that drive productivity and user satisfaction.",
    },
    {
      icon: <MobileFriendlyIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Mobile App",
      desc: "Increase enagagement, satisfaction and empower your employees with real-time visibility and control of their work life anytime and anywhere with the Android App.",
    },
    {
      icon: <FingerprintIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Time & Attendance",
      desc: "Attendance data will be sync with Team Suite and integrated with the payroll will eliminate manual reconciliation. Shifts, Overtime, Outdoor and Branch all included.",
    },
    {
      icon: <ManageAccountsIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Leave Management",
      desc: "Team Suite provide workflow based leave application and approval and notification to each stakeholder. Configure your leave type and rules with robust engine.",
    },
    {
      icon: <CreditScoreIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Loan Management",
      desc: "Team Suite has flexibility to create Loan types, requests, approval based on workflow and integrated with payroll with zero manual calculation involved in the process",
    },
    {
      icon: (
        <CurrencyExchangeIcon color={"inherit"} sx={{ fontSize: "55px" }} />
      ),
      title: "Claim & Reimbursement",
      desc: "Creation of dynamic reimbursement heads, application and approval can be defined using a workflow.",
    },
    {
      icon: <AutoModeIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Recruitment",
      desc: "Recruitment via manpower requisition management, interview and hiring is simplified using Team Suite. Department heads can submit manpower requisition and processed with workflow.",
    },
    {
      icon: <RecentActorsIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Performance (PMS)",
      desc: "Team Suite is all-in-one HCM system supports you, your executives, managers and employees' performance and development. It connect instantly, making light work of big detail.",
    },
    {
      icon: <BackpackIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Travel Management",
      desc: "Travel request with individual preferences can be generated mentioning ticketing, hostel, advance request and approval can be managed using dynamic workflow.",
    },
    {
      icon: <AccountTreeIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Organization Chart",
      desc: "Team Suite has facility to create multiple / multilevel reporting hierarchy for a company or group of companies. Custom Org. chats can be generated based on parameters.",
    },
    {
      icon: <AddchartIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "HR Analytics",
      desc: "Team Suite inbuilt live performance analytics provide you with a range of business metrics to allow faster and better informed management decisions in a real time fashion",
    },
    {
      icon: <ExitToAppIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Exit Management",
      desc: "Employees Full & Final settlement can be prepared based on resignation, automatically calculates outstanding Loan balances, Notice pay and Leave Encashment, Gratuity and PF.",
    },
    {
      icon: <StorageIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Employee Database",
      desc: "Get the complete details about employee statutory information and manage checklist. Get complete view on employee movement right from interview till the final settlement.",
    },
    {
      icon: (
        <AccountBalanceWalletIcon color={"inherit"} sx={{ fontSize: "55px" }} />
      ),
      title: "Payroll",
      desc: "Team Suite has automated rule based payroll management right from creating, tax, advances, lease, deductions and benefits which give a faster payroll output and improve productivity.",
    },
    {
      icon: <AccessTimeIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Time Sheet",
      desc: "Calculate & log the time an employee spends at his workstation. Track his productivity and implement improvements, if required.",
    },
  ]);
  return (
    <Box className={container}>
      {cardData?.map((data, i) => {
        return (
          <Fade
            key={i}
            duration={200 * i}
            direction="up"
            className={Card}
            fraction={0.1}
            triggerOnce
          >
            <HRMFeaturesCard data={data} />
          </Fade>
        );
      })}
    </Box>
  );
};

export default HRMFeatures;
