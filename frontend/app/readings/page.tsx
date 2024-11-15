import React from 'react'

const Readings = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-3/4">
          <h1 className="text-5xl font-bold pt-6 pb-12 text-center text-white">My Reading List</h1>
        </div>
      </div>
      <div className='flex justify-center bg-white rounded-lg text-black text-center m-10'>
        <ul>
            <li>Attention is all you need</li>
            <li>YOLO</li>
            <li>LLama</li>
            <li>Stable Diffusion</li>
            <li>LLava</li>
            <li>LORA</li>
        </ul>
      </div>
    </>
  )
}

export default Readings