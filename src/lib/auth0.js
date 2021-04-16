import { initAuth0 } from '@auth0/nextjs-auth0';
import config from './config';

// console.log('LOG: config', config, process.env.NODE_ENV);

const authinstanceconfig = {
  baseURL: config.BASE_URL,
  clientID: config.AUTH0_CLIENT_ID,
  clientSecret: config.AUTH0_CLIENT_SECRET,
  secret: config.SESSION_SECRET,
  issuerBaseURL: config.AUTH0_ISSUER_BASE_URL,
  authorizationParams: {
    scope: config.AUTH0_SCOPE,
    // audience: config.AUTH0_AUDIENCE,
  },
  routes: {
    callback: config.CALLBACK_URI,
    postLogoutRedirectUri: config.POST_LOGOUT_REDIRECT_URI,
  },
  session: {
    // rollingDuration: config.ROLLING_DURATION,
  },
};

console.log('LOG: authoinstanceconfigtest', authinstanceconfig);

const auth0Instance = initAuth0(authinstanceconfig);

export default auth0Instance;
