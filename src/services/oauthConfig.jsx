export const googleConfig = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
  authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  scope: "openid profile email",
};
  
export const facebookConfig = {
  clientId: import.meta.env.VITE_FACEBOOK_CLIENT_ID,
  redirectUri: import.meta.env.VITE_FACEBOOK_REDIRECT_URI,
  authorizationUrl: "https://www.facebook.com/v19.0/dialog/oauth",
  scope: "email",
};

export const githubConfig = {
  clientId: import.meta.env.VITE_GITHUB_CLIENT_ID,
  redirectUri: import.meta.env.VITE_GITHUB_REDIRECT_URI,
  authorizationUrl: "https://github.com/login/oauth/authorize",
  scope: "user",
};
  

export const twitterConfig = {
  clientId: import.meta.env.VITE_TWITTER_CLIENT_ID,
  redirectUri: import.meta.env.VITE_TWITTER_REDIRECT_URI,
  authorizationUrl: "https://twitter.com/i/oauth2/authorize",
  scope: "tweet.read users.read offline.access",
  responseType: "code",
  state: "v34cdsjkcjsdnkjncsd",
  code_challenge: "challenge",
  code_challenge_method: "plain"
};
  

export const linkedinConfig = {
  clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
  redirectUri: import.meta.env.VITE_LINKEDIN_REDIRECT_URI,
  authorizationUrl: "https://www.linkedin.com/oauth/v2/authorization",
  state: "v34cdsjkcjsdnkjncsd",
  scope: "email openid profile",
};

