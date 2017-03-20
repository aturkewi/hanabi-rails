export const storeToken = (token) => {
  localStorage.token = token;
}

export const getToken = () => {
  if (localStorage.token) {
    return localStorage.token
  }
  console.warn('no token')
}

export const isAuthenticated = () => {
  return !!getToken();
}