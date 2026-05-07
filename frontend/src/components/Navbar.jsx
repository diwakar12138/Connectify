import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {

  const[allusers,setallusers] = useState([]);
  async function handleInputChanger(e){
    let name = e.target.value;
    console.log(name)

    let res = await fetch(`https://socialmedia-yji8.onrender.com/users/searchFriends?name=${name}`)
    let data = await res.json();
    // console.log(data)

    console.log(data.users)
    setallusers(data.users)

  }


  return (
    <div>
        <div className='border p-3 bg-amber-700 text-white flex justify-between'>
            <h1>Social Media</h1>

            <div className='relative'>
              <form action="">
               <input onChange={handleInputChanger} type="text" className='px-2 py-1 rounded outline none border' placeholder='search friends here ...' />
            </form>
            

            <div className='absolute top-full z-50 text-white w-full rounded bg-amber-950'>
              {
                  allusers.map((ele,i)=>{
                    return <div key={ele._id} className='flex border-b-amber-200 items-center gap-4 p-2'>
                      <img className='h-10 w-10 rounded-full' src={ele.profilePic} alt="" />
                      <p>{ele.name}</p>
                    </div>
                  })
              }
            </div>
            </div>

            <ul className='flex gap-5'>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/login'}>Login</Link></li>
                <li><Link to={'/register'}>Signup</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
