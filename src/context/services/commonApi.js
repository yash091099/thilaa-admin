// services/commonApi.js
// Implement the common functions for API handling, token management, and authentication

export const getToken = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData?.token;
  };
  
  export const getCurrentUserId = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData?.accountId;
  };
  
  export const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };