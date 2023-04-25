const { createContext, useState } = require("react");

export const SnackbarContext = createContext();
export const SnackbarContextProvider = ({ children }) => {
  const [snackbarData, setsnackbarData] = useState({
    openToast: false,
    type: "",
    message: "",
  });
  return (
    <SnackbarContext.Provider value={{ snackbarData, setsnackbarData }}>
      {children}
    </SnackbarContext.Provider>
  );
};
