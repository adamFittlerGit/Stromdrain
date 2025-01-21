'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect} from 'react'

const TopNav = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const toggleMenu = () => {
    setMobileMenu(prev => !prev) // optimised and cleaner code to do the same thing!
  }

  const closeMenu = () => {
    setMobileMenu(false)
  }

  return (
    <>
      <div className='flex w-full bg-gray-500 text-xl font-extrabold p-6 justify-center'>
        <div className='flex w-3/4 items-center' >
          <Link className='block' href="/" onClick={closeMenu}>
            <Image
              className=""
              src="/storm-drain.png"
              width={40}
              height={20}
              alt="Post Image"
            />
          </Link>
          <Link className='px-4' href="/" onClick={closeMenu}>
            <h1 className="hidden sm:block text-3xl text-white">STORMDRAIN</h1>
            <h1 className="block sm:hidden text-3xl text-white">STORMED</h1>
          </Link>
          <button className="px-4 ml-auto" onClick={toggleMenu}>
            <Image
              className=""
              src= {mobileMenu ? "/closed.png" : "/menu.png"}
              width={40}
              height={20}
              alt="Menu Image"
            />
          </button>
        </div>
      </div>
      {mobileMenu && (
        <div className='flex justify-center'>
          <div className='flex w-3/4 justify-end'>
            <div className='absolute z-50 bg-gray-500 text-center font-bold text-lg rounded-b-lg opacity-90' >
              <div className='hover:bg-gray-100 p-1 hover:text-black text-white'>
                <Link className="flex items-center m-1" href="/about" onClick={toggleMenu}>
                  <Image
                          className="pr-1 mr-2"
                          src="/me.png"
                          width={40}
                          height={30}
                          alt="About Image"
                  />
                  <p>ABOUT ME</p>
                </Link>
              </div>
              <div className='hover:bg-gray-100 p-1 hover:text-black text-white'>
                <Link className="flex items-center m-1" href="/blog" onClick={toggleMenu}>
                  <Image
                        className="pr-1 mr-2"
                        src="/my-diary.png"
                        width={40}
                        height={20}
                        alt="Diary Image"
                    />
                  <p className=''>BLOG</p>
                </Link>
              </div>
              <div className='hover:bg-gray-100 p-1 hover:text-black text-white'>
                <Link className="flex items-center m-1" href="/history" onClick={toggleMenu}>
                  <Image
                          className="pr-1 mr-2"
                          src="/roadmap.png"
                          width={40}
                          height={20}
                          alt="History Image"
                      />
                  <p>HISTORY</p>
                </Link>
              </div>
              <div className='hover:bg-gray-100 p-1 hover:text-black text-white'>
                <Link className="flex items-center m-1" href="/projects" onClick={toggleMenu}>
                <Image
                        className="pr-1 mr-2"
                        src="/briefcase.png"
                        width={40}
                        height={20}
                        alt="Projects Image"
                  />
                  <p>PROJECTS</p>
                </Link>
              </div>
              <div className='hover:bg-gray-100 rounded-b-lg p-1 hover:text-black text-white' >
                <Link className="flex items-center m-1 mt-0" href="/contact" onClick={toggleMenu}>
                <Image
                        className="pr-1 mr-2"
                        src="/contact.png"
                        width={40}
                        height={30}
                        alt="Contact Image"
                  />
                  <p>CONTACT</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TopNav
