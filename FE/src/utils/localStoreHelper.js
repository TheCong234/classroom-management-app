export const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  }
  return null;
};

export const getPhone = () => {
  const phone = localStorage.getItem("phone");
  if (phone) {
    return phone;
  }
  return null;
};

export const getEmail = () => {
  const email = localStorage.getItem("email");
  if (email) {
    return email;
  }
  return null;
};

export const removeToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    localStorage.removeItem("token");
  }
};
