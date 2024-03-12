export const addUserLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};
export const removeUserLocalStorage = () => {
  localStorage.removeItem('user');
};

export const getUserLocalStorage = () => {
  const result = localStorage.getItem('user');
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const addThemeLocalStorage = (value) => {
  localStorage.setItem('isDarkTheme', value);
};
export const getThemeLocalStorage = () => {
  const result = localStorage.getItem('isDarkTheme');
  const isDarkTheme = result ? JSON.parse(result) : false;
  return isDarkTheme;
};
