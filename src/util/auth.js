export const getUserFromLocalStroage = () => {
  const userToken = localStorage.getItem('token');
  const userInfo = localStorage.getItem('userInfo'); 
  return userToken ? { userToken, userInfo } : undefined;
}

export const setTokenToLocalStroage = (token, userInfo) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

export const deleteTokenFromLocalStroage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
}
