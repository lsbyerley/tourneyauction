import NextLink from 'next/link';

const Header = ({ user }) => {
  console.log('LOG: header user', user);

  return (
    <div>
      <p>the navbar</p>
      {user && (
        <div>
          <p>user logged in</p>
          <NextLink href='/api/logout'>Logout</NextLink>
        </div>
      )}
      {!user && (
        <div>
          <p>user not logged in</p>
          <NextLink href='/api/login'>Login</NextLink>
        </div>
      )}
    </div>
  );
};

export default Header;
