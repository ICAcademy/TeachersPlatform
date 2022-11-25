const TOKENS_LS_NAME = 'token';

export const tokenService = {
  getTokens: () =>
    localStorage.getItem(TOKENS_LS_NAME) ?? JSON.parse(localStorage.getItem(TOKENS_LS_NAME)),
  getAccessToken: () => {
    const tokens = tokenService.getTokens();
    return tokens?.accessToken;
  },
  updateTokens: (tokens) => {
    localStorage.setItem(TOKENS_LS_NAME, JSON.stringify(tokens));
  },
  updateAccessTokens: (accessToken) => {
    const tokens = tokenService.getTokens();
    tokens.accessToken = accessToken;
    tokenService.updateTokens(tokens);
  },
  removeTokens: () => {
    localStorage.removeItem(TOKENS_LS_NAME);
  },
  // getUserInfo: () => {
  //   const tokens = JSON.parse(tokenService.getTokens());
  //   return (
  //     tokens?.user ?? {
  //       email: '',
  //       id: '',
  //       isActivated: false,
  //     }
  //   );
  // },
};
