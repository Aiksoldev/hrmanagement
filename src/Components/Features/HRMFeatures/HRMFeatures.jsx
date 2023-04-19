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
import BadgeIcon from "@mui/icons-material/Badge";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import BeenhereIcon from "@mui/icons-material/Beenhere";
const useStyle = makeStyles((theme) => {
  return {
    container: {
      width: "100%",
      overflow: "hidden",
      display: "flex",
      flexWrap: "wrap",
      gap: "40px",
      justifyContent: "space-evenly",
      padding: "20px 20px",
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
      title: "Performance",
      desc: "Set goals, track progress, and conduct evaluations to ensure that your employees are performing at their best. With our performance management tools, and many more.",
    },
    {
      icon: <MobileFriendlyIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Employee self-service",
      desc: "Our HRM software offers employee self-service features that enable employees to view and add their own personal information, request time off, and more.",
    },
    {
      icon: <FingerprintIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Time & Attendance",
      desc: "Automating attendance data collection and integration with payroll systems can eliminate the need for manual reconciliation. This includes tracking employee shifts any many more.",
    },
    {
      icon: <ManageAccountsIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Leave Management",
      desc: "A workflow-based leave application and approval system can simplify the leave management process. It can also notify all relevant parties about leave requests.",
    },
    {
      icon: <CreditScoreIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Loan Management",
      desc: "Efficient loan management can be achieved by using a system that enables the creation of different loan types, streamlines loan requests and approvals through a workflow-based process.",
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
      desc: "A comprehensive human capital management system should support the performance and development of executives, managers, and employees.",
    },
    {
      icon: <BackpackIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Travel Management",
      desc: "Travel request with individual preferences can be generated mentioning ticketing, hostel, advance request and approval can be managed using dynamic workflow.",
    },
    {
      icon: <AccountTreeIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Calendar & Notifications",
      desc: "Calendar & notification modules you updated about ongoing & upcoming events such leave applications, requests, tickets, documents expiry etc.",
    },
    {
      icon: <AddchartIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "HR Analytics",
      desc: "Our software contains live performance analytics that provide you with a range of business metrics to allow faster and better informed management decisions in a real time fashion",
    },
    {
      icon: <ExitToAppIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Compliance",
      desc: "HRM facilitates organizations to manage their people data with state of the art technologies. You can save the personal and official details of people, their jobs & designations, etc on a fingertip.",
    },
    {
      icon: <StorageIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Employee Database",
      desc: "Keep a comprehensive record of employee information, including statutory details and employment history. Manage checklists to ensure compliance with HR policies and regulations.",
    },
    {
      icon: (
        <AccountBalanceWalletIcon color={"inherit"} sx={{ fontSize: "55px" }} />
      ),
      title: "Payroll",
      desc: "Automate payroll management using rule-based calculations. Manage taxes, advances, leases, deductions, and benefits. Increase productivity and accuracy of payroll processing",
    },
    {
      icon: <AccessTimeIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Time Office & Leave",
      desc: "HRM you have freedom to apply any policy for your time office & leave. You can manage single shift, multiple shifts, flexible hours, late policies all together.",
    },

    {
      icon: <BadgeIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Open Source Integration",
      desc: "Our HRM software is designed to integrate seamlessly with open source management systems, enabling you to customize and extend the functionality of your HRM.",
    },
    {
      icon: (
        <SupervisedUserCircleIcon color={"inherit"} sx={{ fontSize: "55px" }} />
      ),
      title: "Role Management",
      desc: "Create and manage roles and permissions for different levels of access and authority. Ensure data security and compliance by controlling access to sensitive information. ",
    },
    {
      icon: <BeenhereIcon color={"inherit"} sx={{ fontSize: "55px" }} />,
      title: "Project Subscription",
      desc: "Create and manage project subscriptions for clients. Monitor project progress and performance using real-time data and analytics.",
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
