import auth0 from '@/lib/auth0';

const callback = async (req, res) => {
  try {
    console.log('LOG: callback debug req', req.cookies);
    // console.log('LOG: callback res', res);

    await auth0.handleCallback(req, res, { redirectUri: '/' });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default callback;

/* 
export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, { redirectUri: '/' });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}

const afterCallback = (req, res, session, state) => {
  console.log('LOG: session', session);
  // can modify the session here if needed
  return session;
};

const callback = async (req, res) => {
  try {
    // await auth0.handleCallback(req, res, { afterCallback });
    await auth0.handleCallback(req, res, { redirectUri: '/' });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default callback; */
