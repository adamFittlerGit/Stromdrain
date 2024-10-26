import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@mui/material'

const TopNav = () => {
  return (
    <>
      <div className='hidden lg:grid grid-cols-8 bg-[#535860] text-xl font-extrabold p-6'>
          <div className='flex justify-start col-span-3 items-center'>
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
          <div className="flex justify-end col-span-5 items-center">
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
      <div className='flex w-full lg:hidden bg-[#535860] text-xl font-extrabold p-6 justify-center'>
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
            <h1 className='text-3xl'>STORMDRAIN</h1>
          </Link>
          <Button className="px-4 ml-auto">
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
    </>
  )
}

export default TopNav