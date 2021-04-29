function Button({ children, ...props }) {
  return (
    <button
      className='px-4 py-3 text-sm font-bold tracking-widest text-white uppercase bg-indigo-600 rounded-lg hover:bg-gray-700 focus:outline-none'
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
