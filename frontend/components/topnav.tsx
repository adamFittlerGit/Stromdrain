import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const TopNav = () => {
  return (
    <>  
    <div className='grid grid-cols-8 bg-gray-300 text-xl font-extrabold p-6'>
        <div className='flex justify-start col-span-3'>
           <Link className='px-4' href="./">STORMDRAIN</Link>
            <Link className='px-4 outline-dashed' href="./blogger">New Post</Link>
        </div>
        <div className="flex justify-end col-span-5">
            <Link className='px-4' href="">Search  </Link>
            <Link className='px-4' href="./about">About</Link>
            <Link className='px-4' href="./contact">Contact</Link>
        </div>
    </div>
    </>
  )
}

export default TopNav