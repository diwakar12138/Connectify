import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <div className='border p-3 bg-amber-700 text-white flex justify-between'>
            <h1>Social Media</h1>

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
