import React, { createContext, useState } from "react";

export const TCAMBreadcrumbsContext = createContext();

const TCAMBreadcrumbsContextProvider = ({ children }) => {
  const [breadCrumbList, setbreadCrumbList] = useState([
    {
      name: "tcam",
      path: "/Others",
      query: false,
    },
  ]);
  return (
    <TCAMBreadcrumbsContext.Provider
      value={{
        breadCrumbList,
        setbreadCrumbList,
      }}
    >
      {children}
    </TCAMBreadcrumbsContext.Provider>
  );
};

export default TCAMBreadcrumbsContextProvider;
