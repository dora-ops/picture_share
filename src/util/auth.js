export const getUserFromLocalStroage = () => {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');  
  return token ? { token, id } : undefined;
}

export const setTokenToLocalStroage = (token, id) => {
  localStorage.setItem('token', token);
  localStorage.setItem('id', id);
}

export const deleteTokenFromLocalStroage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
}
