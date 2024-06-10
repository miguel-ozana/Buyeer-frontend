// NavBar.tsx
"use client"
import React, { useState } from 'react';
import CreateItemIframe from './createItemIframe';
import Image from 'next/image';
import Link from 'next/link';
import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/16/solid';

const NavBar: React.FC = () => {
  const [createItemOpen, setCreateItemOpen] = useState(false);
  
  return (
    <>
      <nav className='fixed top-0 left-0 right-0 z-10'>
        <div className="flex items-center justify-between mx-auto px-4 py-2">
          <Link href="/" className="">
            <Image
              className="object-cover w-full h-full"
              src="/assets/logo.png"
              width={120}
              height={120}
              alt="About me"
            />
          </Link>
          <div className="flex items-center">
            <button onClick={() => setCreateItemOpen(true)}
              className='block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white'
            >
              <PlusCircleIcon className='h-5 w-5' />
            </button>
          </div>
        </div>
        {/* <div className="mobile-menu block md:hidden">
        </div> */}
      </nav>

      {createItemOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-[#0C0C0D] rounded-lg shadow-lg w-11/12 max-w-3xl p-8">
            <button onClick={() => setCreateItemOpen(false)}
              className='absolute top-2 right-2 rounded-full p-2 hover:text-gray-300'
            >
              <XMarkIcon className='h-5 w-5' />
            </button>
            <CreateItemIframe />
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;

