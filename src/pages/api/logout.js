import auth0 from '@/lib/auth0';

const logout = async (req, res) => {
  try {
    await auth0.handleLogout(req, res, {
      returnTo: '/',
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
};

export default logout;
