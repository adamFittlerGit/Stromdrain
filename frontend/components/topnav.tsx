import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const TopNav = () => {
  return (
    <>
      <div className='grid grid-cols-8 bg-[#535860] text-xl font-extrabold p-6'>
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
            <Link className='px-4 mx-4' href="/blogger">
                <Image
                      className=""
                      src="/write.png"
                      width={40}
                      height={20}
                      alt="Post Image"
                />
              </Link>
              <Link className='px-4' href="/blog">Blog</Link>
              <Link className='px-4' href="/projects">Projects</Link>
              <Link className='px-4' href="/about">
                <Image
                      className=""
                      src="/about.png"
                      width={40}
                      height={20}
                      alt="About Image"
                />
              </Link>
              <Link className='px-4' href="/contact">
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
    </>
  )
}

export default TopNav