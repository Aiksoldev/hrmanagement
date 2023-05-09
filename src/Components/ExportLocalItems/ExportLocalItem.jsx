"use client";
export const getLocalItems = () => {
  const token = window.localStorage.getItem("token");
  const baseUrl = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL_API;
  return {
    token,
    baseUrl,
  };
};
