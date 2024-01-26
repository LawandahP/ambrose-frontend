export const googleConfig = {
  clientId: "YOUR_GOOGLE_CLIENT_ID",
  redirectUri: "YOUR_REDIRECT_URI",
  authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  scope: "openid profile email",
};
  
export const facebookConfig = {
  clientId: "YOUR_FACEBOOK_CLIENT_ID",
  redirectUri: "YOUR_REDIRECT_URI",
  authorizationUrl: "https://www.facebook.com/v9.0/dialog/oauth",
  scope: "email",
};
  
export const githubConfig = {
  clientId: import.meta.env.VITE_GITHUB_CLIENT_ID,
  redirectUri: import.meta.env.VITE_GITHUB_REDIRECT_URI,
  authorizationUrl: "https://github.com/login/oauth/authorize",
  scope: "user",
};
  
  // Add more configurations as needed
  