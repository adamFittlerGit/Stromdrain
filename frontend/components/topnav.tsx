'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@mui/material'
import { useState } from 'react'

const TopNav = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  return (
    <>
    <div className='w-full bg-[#535860]'>
      <div className=' w-3/4 hidden xl:flex bg-[#535860] text-xl font-extrabold p-6 justify-self-center'>
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
              <Link className='mx-4 p-1 bg-white rounded' href="/blogger">
                  <Image
                        className=""
                        src="/write.png"
                        width={40}
                        height={20}
                        alt="Post Image"
                  />
              </Link>
              <Link className='mx-4 p-1 bg-white rounded' href="/blog">
                <Image
                      className=""
                      src="/blog.png"
                      width={40}
                      height={20}
                      alt="Blog Image"
                  />
              </Link>
              <Link className='mx-4 p-1 bg-white rounded' href="/history">
                <Image
                      className=""
                      src="/timeline.png"
                      width={40}
                      height={20}
                      alt="History Image"
                  />
              </Link>
              <Link className='mx-4 p-1 bg-white rounded' href="/projects">
                <Image
                      className=""
                      src="/project.png"
                      width={40}
                      height={20}
                      alt="Projects Image"
                  />
              </Link>
              <Link className='mx-4 p-1 bg-white rounded' href="/habits">
                <Image
                      className=""
                      src="/checklist.png"
                      width={40}
                      height={20}
                      alt="Habit Image"
                  />
              </Link>
              <Link className='mx-4 p-1 bg-white rounded' href="/about">
                <Image
                      className=""
                      src="/about.png"
                      width={40}
                      height={20}
                      alt="About Image"
                />
              </Link>
              <Link className='mx-4 p-1 bg-white rounded' href="/contact">
                <Image
                      className=""
                      src="/telephone.png"
                      width={40}
                      height={20}
                      alt="Contact Image"
                />
              </Link>
          </div>
      </div>
      </div>
      <div className='flex w-full xl:hidden bg-[#535860] text-xl font-extrabold p-6 justify-center'>
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
          <Button className="px-4 ml-auto" onClick={() => {
            if (mobileMenu) {
              setMobileMenu(false)
            } else {
              setMobileMenu(true)
            }
          }}>
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
        <div className='w-3/4 justify-self-center bg-white p-6'>
          <p>New Post</p>
          <p>Blog</p>
          <p>Projects</p>
        </div>
      )}
    </>
  )
}

export default TopNav