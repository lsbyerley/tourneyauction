import clsx from 'clsx';

const Button = ({ children, ...props }) => {
  return (
    <button
      className='inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-blue-700 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
