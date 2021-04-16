const env = {
  DEV: 'development',
  PROD: 'production',
  TEST: 'test',
};

const findURL = (local, prod, branch) => {
  switch (process.env.NODE_ENV) {
    case env.DEV:
      return local;
    case env.PROD:
      return prod;
    case env.TEST:
      return branch;
    default:
      return local;
  }
};

let config = {};

if (typeof window === 'undefined') {
  const baseURLForEnv = findURL(
    'http://localhost:3000',
    'https://golf-tourney-auction.vercel.app',
    'https://golf-tourney-auction.vercel.app'
  );

  config = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH0_SCOPE: 'openid profile',
    BASE_URL: baseURLForEnv,
    CALLBACK_URI: `/api/callback`,
    SESSION_SECRET: process.env.SESSION_SECRET,
    POST_LOGOUT_REDIRECT_URI: `/`,
  };
} else {
  config = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH0_SCOPE: 'openid profile',
    BASE_URL: baseURLForEnv,
    CALLBACK_URI: `/api/callback`,
    SESSION_SECRET: process.env.SESSION_SECRET,
    POST_LOGOUT_REDIRECT_URI: window.location.origin,
  };
}

export default config;
