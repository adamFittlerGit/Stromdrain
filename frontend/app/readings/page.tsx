import React from 'react'

const page = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-3/4">
          <h1 className="text-5xl font-bold pt-6 pb-12 text-center text-white">Reading List</h1>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='text-black bg-white border-black border-2 my-4 w-3/4 sm:w-128 rounded px-10'>
          Example Reading
        </div>
      </div>
  </>
  )
}

export default page