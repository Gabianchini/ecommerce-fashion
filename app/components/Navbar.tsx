'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { CiShoppingCart } from 'react-icons/ci';
import { BsChevronCompactUp } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import SearchBar from './SearchBar';
import { signOut, signIn, useSession } from 'next-auth/react';

type Props = {};

const Navbar = (props: Props) => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);
  const { data: session } = useSession();
 


  function capitalizeUsername(input: string | null | undefined): string {
    if (!input) {
        return ''; 
    }
    return input.charAt(0).toUpperCase() + input.slice(1);
}

  const userName: string  = session?.user?.name || '';
  const capitalizedUsername: string  = capitalizeUsername(userName);

  const SignOut = () => {
    if (session && session.user) {
      return (
        <ul className="py-5 px-1 text-neutral-900">
          <li
            onClick={() => signOut()}
            className="whitespace-nowrap hover:text-red-600 px-5 py-2 cursor-pointer"
          >
            SignOut
          </li>
          <li className="whitespace-nowrap hover:bg-gray-100 hover:text-neutral-900 px-5 py-2 cursor-pointer">
            <a href="/addproduct">Add Product</a>
          </li>
        </ul>
      );
    }
    return (
      <ul>
        <li
          onClick={() => signIn()}
          className="whitespace-nowrap hover:bg-gray-100 hover:text-neutral-900 px-5 py-2 cursor-pointer"
        >
          Sign in
        </li>
      </ul>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between py-4 relative">
        <div className="flex items-center md:space-x-10 lg:space-x-20">
          <div className="font-semibold text-2xl">
            <a href="/">Trend</a>{' '}
          </div>
          <nav className="max-md:hidden">
            <ul className="flex items-center lg:space-x-10 space-x-7  text-[15px]">
              <li>
                <a href="/" className="py-3 inline-block w-full">
                  Shop
                </a>
              </li>
              {session?.user && (
                <li>
                  <a href="myproducts" className="py-3 inline-block w-full">
                    My products
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
   
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="relative cursor-pointer"
          >
            {session?.user?(
              <div className='flex'>
              <img
                src={session.user.profileImage || 'profile-user.png'}
                className="w-[40px] h-[40px] rounded-full object-cover mx-2"
                alt=""
              />
              <li className="hover:bg-gray-100 inline-block hover:text-neutral-900 rounded px-2 py-2 cursor-pointer list-none">
              <span>{capitalizedUsername}</span>
            </li>
            </div>
            ) : (
              <Link href="/signin">
              <span>Sign in</span>
              </Link>
            )}
            <div
              className={`absolute bg-white z-[2] rounded-lg shadow-lg ${
                showProfile ? '' : 'hidden'
              }`}
            >
              {session?.user && <SignOut />}
            </div>
          </div>
          <Link href="/cart">
            <div className="p-2 bg-gray-100 rounded-full">
              <CiShoppingCart size={20} />
            </div>
          </Link>
          <span
            onClick={() => setShowNav(!showNav)}
            className="p-[9px] bg-gray-100 rounded-full md:hidden"
          >
            <BsChevronCompactUp
              className={`transition ease-in duration-150 ${
                showNav ? 'rotate-180' : '0'
              }`}
            />
          </span>
        </div>
      </div>
      <div
        className={`md:hidden ${
          showNav ? 'pb-4 px-5' : 'h-0 invisible opacity-0'
        }`}
      >
        <ul className="flex flex-col text-[15px] px-2">
          <li>
            <a href="/shop" className="py-3 inline-block w-full">
              Shop
            </a>
          </li>
          <li>
            <a href="/filters" className="py-3 inline-block w-full">
              Filters
            </a>
          </li>
          <li>
            <a href="/myproducts" className="py-3 inline-block w-full">
              Shop
            </a>
          </li>
        </ul>
        <div className="flex items-center bg-gray-100 p-2 rounded-lg my-4 py-3">
          <input
            type="text"
            className="outline-none w-full bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[15px]"
            placeholder="Search"
            autoComplete="false"
          />
          <button>
            <BiSearch size={20} className="flex" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;