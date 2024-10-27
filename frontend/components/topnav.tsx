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
    <div className='w-full bg-gray-500'>
      <div className=' w-3/4 hidden lg:flex text-xl font-extrabold p-6 justify-self-center'>
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
                <h1 className='text-3xl'>STORMDRAIN</h1>
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
              <Link className='mx-4 p-1 bg-blue-400 rounded' href="/blog">
                <Image
                      className=""
                      src="/myblog.png"
                      width={40}
                      height={20}
                      alt="Blog Image"
                  />
              </Link>
              <Link className='mx-4 p-1 bg-blue-400 rounded' href="/history">
                <Image
                      className=""
                      src="/milestones.png"
                      width={40}
                      height={20}
                      alt="History Image"
                  />
              </Link>
              <Link className='mx-4 p-1 bg-blue-400 rounded' href="/projects">
                <Image
                      className=""
                      src="/portfolio.png"
                      width={40}
                      height={20}
                      alt="Projects Image"
                  />
              </Link>
              <Link className=' hidden mx-4 p-1 bg-white rounded' href="/habits">
                <Image
                      className=""
                      src="/checklist.png"
                      width={40}
                      height={20}
                      alt="Habit Image"
                  />
              </Link>
              <Link className='mx-4 p-1 bg-blue-400 rounded' href="/about">
                <Image
                      className=""
                      src="/hacker.png"
                      width={40}
                      height={20}
                      alt="About Image"
                />
              </Link>
              <Link className='mx-4 p-1 bg-blue-400 rounded' href="/contact">
                <Image
                      className=""
                      src="/telephone-call.png"
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
            <h1 className="hidden sm:block text-3xl">STORMDRAIN</h1>
            <h1 className="block sm:hidden text-3xl">STORMED</h1>

          </Link>
          <Button className="px-4 ml-auto" onClick={toggleMenu}>
            <Image
              className=""
              src="/menu.png"
              width={40}
              height={20}
              alt="Menu Image"
            />
          </Button>
        </div>
      </div>
      {mobileMenu && (
        <div className='w-3/4 justify-self-center bg-gray-400 text-center font-bold text-lg rounded-b-lg'>
          <div className='hover:bg-gray-100'>
            <Link href="/blogger" onClick={toggleMenu}>
              <p>NEW POST</p>
            </Link>
          </div>
          <div className='hover:bg-gray-100'>
            <Link href="/blog" onClick={toggleMenu}>
              <p>MY BLOG</p>
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
          <div className='hidden hover:bg-gray-100'>
            <Link href="/habits" onClick={toggleMenu}>
              <p>HABIT TRACKER</p>
            </Link>
          </div>
          <div className='hover:bg-gray-100'>
            <Link href="/about" onClick={toggleMenu}>
              <p>ABOUT ME</p>
            </Link>
          </div>
          <div className='hover:bg-gray-100 rounded-b-lg'>
            <Link href="/contact">
              <p>CONTACT INFO</p>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default TopNav