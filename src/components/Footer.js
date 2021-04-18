const social = [];

const Footer = () => {
  return (
    <footer className='bg-white' aria-labelledby='footerHeading'>
      <h2 id='footerHeading' className='sr-only'>
        Footer
      </h2>
      <div className='px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8'>
        <div className='pt-8 border-t border-gray-200 lg:flex lg:items-center lg:justify-between xl:mt-0'>
          <div>
            <h3 className='text-sm font-semibold tracking-wider text-gray-400 uppercase'>
              Subscribe to our newsletter
            </h3>
            <p className='mt-2 text-base text-gray-500'>
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
          </div>
          <form className='mt-4 sm:flex sm:max-w-md lg:mt-0'>
            <label htmlFor='emailAddress' className='sr-only'>
              Email address
            </label>
            <input
              type='email'
              name='emailAddress'
              id='emailAddress'
              autoComplete='email'
              required
              className='w-full min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400 sm:max-w-xs'
              placeholder='Enter your email'
            />
            <div className='mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0'>
              <button
                type='submit'
                className='flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
        <div className='pt-8 mt-8 border-t border-gray-200 md:flex md:items-center md:justify-between'>
          <div className='flex space-x-6 md:order-2'>
            {social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='text-gray-400 hover:text-gray-500'
              >
                <span className='sr-only'>{item.name}</span>
                <item.icon className='w-6 h-6' aria-hidden='true' />
              </a>
            ))}
          </div>
          <p className='mt-8 text-base text-gray-400 md:mt-0 md:order-1'>
            &copy; 2020 Workflow, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
