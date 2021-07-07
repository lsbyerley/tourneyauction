import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useRouter } from 'next/router';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// example NavItem
// https://github.com/tailwindlabs/tailwindcss.com/blob/7617a606ee89065144bcfe3e6b35d2938e707c0a/src/layouts/SidebarLayout.js

const Header = ({ user }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isActive = (href) => {
    return router.pathname === href;
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link href="/">
                  <a className="relative flex items-center flex-shrink-0 w-40 h-8">
                    <Image src="/gta-logo.png" alt="tourney-auction" layout="fill" objectFit="contain" />
                  </a>
                </Link>

                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <Link href="/">
                    <a
                      className={clsx('inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2', {
                        'border-indigo-500 text-gray-900': isActive('/'),
                        'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': !isActive('/'),
                      })}
                    >
                      Dashboard
                    </a>
                  </Link>
                  {/*<Link href='/auctions'>
                    <a
                      className={clsx(
                        'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2',
                        {
                          'border-indigo-500 text-gray-900':
                            isActive('/auctions'),
                          'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                            !isActive('/auctions'),
                        }
                      )}
                    >
                      Auctions
                    </a>
                  </Link>
                  <Link href='/about'>
                    <a
                      className={clsx(
                        'inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2',
                        {
                          'border-indigo-500 text-gray-900':
                            isActive('/about'),
                          'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                            !isActive('/about'),
                        }
                      )}
                    >
                      About
                    </a>
                      </Link>*/}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/*<button className='p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='w-6 h-6' aria-hidden='true' />
                </button>*/}

                {!user && (
                  <Link href="/api/auth/login">
                    <a className="inline-flex items-center px-3 py-2 mt-2 text-sm font-medium leading-4 text-blue-700 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Login
                    </a>
                  </Link>
                )}

                {/* Profile dropdown */}
                {user && (
                  <Menu as="div" className="relative ml-3">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button
                            className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => setOpen(true)}
                          >
                            <span className="sr-only">Open user menu</span>
                            <Image className="w-8 h-8 rounded-full" src={user.picture} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <a href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                  Your Profile
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link href="/api/auth/logout">
                                  <a className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>Sign out</a>
                                </Link>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                )}
              </div>
              <div className="flex items-center -mr-2 sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" onClick={() => setOpen(false)} />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" onClick={() => setOpen(true)} />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Link href="/">
                <a className="block py-2 pl-3 pr-4 text-base font-medium text-indigo-700 border-l-4 border-indigo-500 bg-indigo-50">Dashboard</a>
              </Link>
              {/*<a
                href='#'
                className='block py-2 pl-3 pr-4 text-base font-medium text-gray-500 border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              >
                Team
              </a>*/}
            </div>
            {user && (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Image className="w-10 h-10 rounded-full" src={user.picture} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                  <button className="flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  <Link href="/api/auth/logout">
                    <a className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Sign out</a>
                  </Link>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
