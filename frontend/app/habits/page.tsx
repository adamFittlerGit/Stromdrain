import React from 'react'

const Habits = () => {
  return (
    <div className='flex justify-center'>
      <div className='text-black bg-white border-black border-2 my-4 w-3/4 sm:w-128 rounded px-10'>
        <h1 className='my-4 text-center font-bold text-lg'>Daily Habits</h1>
        <div className='flex my-4 justify-center'>
          <form>
            <input type="checkbox" id="" name="" value=""/>
            <label htmlFor=""> Left-handed Recap</label><br/>
            <input type="checkbox" id="" name="" value=""/>
            <label htmlFor=""> Algorithm Question</label><br/>
            <input type="checkbox" id="" name="" value=""/>
            <label htmlFor=""> Commit on Projects</label><br/>
            <input type="checkbox" id="" name="" value=""/>
            <label htmlFor=""> 2500 Calories</label><br/>
            <input type="checkbox" id="" name="" value=""/>
            <label htmlFor=""> 200g Protein</label><br/>
            <input type="checkbox" id="" name="" value=""/>
            <label htmlFor=""> 10,000 Steps</label><br/>
            <input type="checkbox" id="" name="" value=""/>
            <label htmlFor=""> Training Session</label><br/>
            <input type="checkbox" id="" name="" value=""/>
            <label htmlFor=""> Read Daily.dev</label><br/>
            <input type="checkbox" id="" name="" value=""/>
            <label htmlFor=""> Read Paper/Book</label><br/>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Habits