const PharmacyGroupSideBar = [
  {
    name: "Dashboard",
    path: "/Dashboard/PharmacyGroup",
    subItems: [],
  },
  {
    name: "Profile",
    path: "/Dashboard/MyProfile",
    subItems: [
      {
        name: "My Profile",
        path: "/Dashboard/MyProfile",
      },
      {
        name: "Edit Profile",
        path: "/Dashboard/PharmacyGroup/EditProfile",
      },
    ],
    rolesId: [13],
  },
  {
    name: "Profile",
    path: "/Dashboard/PharmacyGroup",
    subItems: [],
    rolesId: [13],
  },
];

export const getRolesWiseSideBar = () => {
  return abc;
};
