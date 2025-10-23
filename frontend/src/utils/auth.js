// src/utils/auth.js
export const saveUser = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

export const getRole = () => localStorage.getItem("role");
export const getToken = () => localStorage.getItem("token");
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
