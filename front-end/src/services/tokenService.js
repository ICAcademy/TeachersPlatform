const TOKEN_NAME = 'token';

export const tokenService = {
  getToken: () => localStorage.getItem(TOKEN_NAME) ?? JSON.parse(localStorage.getItem(TOKEN_NAME)),
  updateToken: (token) => {
    localStorage.setItem(TOKEN_NAME, token);
  },
  removeToken: () => {
    localStorage.removeItem(TOKEN_NAME);
  },
};
