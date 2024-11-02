'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@mui/material'
import { useState, useEffect} from 'react'

const TopNav = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const toggleMenu = () => {
    if (mobileMenu) {
      setMobileMenu(false)
    } else {
      setMobileMenu(true)
    }
  }

  return (
    <>
    <div className='flex justify-center w-full bg-gray-500'>
      <div className=' w-3/4 hidden lg:flex text-xl font-extrabold p-6'>
          <div className='flex items-center'>
            <Link className='' href="/">
                <Image
                      className=""
                      src="/storm-drain.png"
                      width={40}
                      height={20}
                      alt="Post Image"
                />
            </Link>
            <Link className='px-4' href="/">
                <h1 className='text-3xl'>STORM-DRAIN</h1>
            </Link>
          </div>
          <div className="flex ml-auto items-center">
              <Link className='mx-4 p-1 bg-blue-400 rounded' href="/blogger">
                  <Image
                        className=""
                        src="/write.png"
                        width={40}
                        height={20}
                        alt="Post Image"
                  />
              </Link>
              <Link className='mx-4 p-1 bg-blue-400 rounded' href="/diary">
                <Image
                      className=""
                      src="/my-diary.png"
                      width={40}
                      height={20}
                      alt="Diary Image"
                  />
              </Link>
              <Link className='mx-4 p-1 bg-blue-400 rounded' href="/habits">
                <Image
                      className=""
                      src="/habits.png"
                      width={40}
                      height={20}
                      alt="Habit Image"
                  />
              </Link>
              <Link className='mx-4 p-1 bg-blue-400 rounded' href="/history">
                <Image
                      className=""
                      src="/roadmap.png"
                      width={40}
                      height={20}
                      alt="History Image"
                  />
              </Link>
              <Link className='mx-4 p-1 bg-blue-400 rounded' href="/projects">
                <Image
                      className=""
                      src="/briefcase.png"
                      width={40}
                      height={20}
                      alt="Projects Image"
                  />
              </Link>
              <Link className='mx-4 p-1 bg-blue-400 rounded' href="/readings">
                <Image
                      className=""
                      src="/reading-list.png"
                      width={40}
                      height={20}
                      alt="Reading Image"
                  />
              </Link>
              <Link className='mx-4 p-1 bg-blue-400 rounded' href="/about">
                <Image
                      className=""
                      src="/me.png"
                      width={40}
                      height={20}
                      alt="About Image"
                />
              </Link>
              <Link className='mx-4 p-1 bg-blue-400 rounded' href="/contact">
                <Image
                      className=""
                      src="/contact.png"
                      width={40}
                      height={20}
                      alt="Contact Image"
                />
              </Link>
          </div>
      </div>
      </div>
      <div className='flex w-full lg:hidden bg-gray-500 text-xl font-extrabold p-6 justify-center'>
        <div className='flex w-3/4 items-center'>
          <Link className='block' href="/">
            <Image
              className=""
              src="/storm-drain.png"
              width={40}
              height={20}
              alt="Post Image"
            />
          </Link>
          <Link className='px-4' href="/">
            <h1 className="hidden sm:block text-3xl">STORM-DRAIN</h1>
          </Link>
          <button className="px-4 ml-auto" onClick={toggleMenu}>
            <Image
              className=""
              src="/menu.png"
              width={40}
              height={20}
              alt="Menu Image"
            />
          </button>
        </div>
      </div>
      {mobileMenu && (
        <div className='flex justify-center'>
          <div className='w-3/4 bg-gray-400 text-center font-bold text-lg rounded-b-lg z-50'>
            <div className='hover:bg-gray-100'>
              <Link href="/blogger" onClick={toggleMenu}>
                <p>NEW POST</p>
              </Link>
            </div>
            <div className='hover:bg-gray-100'>
              <Link href="/diary" onClick={toggleMenu}>
                <p>STORM'S DIARY</p>
              </Link>
            </div>
            <div className='hover:bg-gray-100'>
              <Link href="/habits" onClick={toggleMenu}>
                <p>HABIT TRACKER</p>
              </Link>
            </div>
            <div className='hover:bg-gray-100'>
              <Link href="/history" onClick={toggleMenu}>
                <p>WORK HISTORY</p>
              </Link>
            </div>
            <div className='hover:bg-gray-100'>
              <Link href="/projects" onClick={toggleMenu}>
                <p>MY PROJECTS</p>
              </Link>
            </div>
            <div className='hover:bg-gray-100'>
              <Link href="/about" onClick={toggleMenu}>
                <p>ABOUT ME</p>
              </Link>
            </div>
            <div className='hover:bg-gray-100 rounded-b-lg'>
              <Link href="/contact" onClick={toggleMenu}>
                <p>CONTACT INFO</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TopNav