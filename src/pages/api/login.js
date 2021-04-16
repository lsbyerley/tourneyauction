import auth0 from '@/lib/auth0';

const login = async (req, res) => {
  try {
    await auth0.handleLogin(req, res, {
      returnTo: req.headers.referer + 'api/callback',
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default login;
