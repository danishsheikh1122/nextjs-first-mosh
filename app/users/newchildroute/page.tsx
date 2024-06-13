'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
const page = () => {
  const router=useRouter()
  return (
    <div>
      new user page ,child of page
      <button className='btn block bg-slate-400' onClick={()=>{router.push("/users")}}>Create user</button>
    </div>
  )
}

export default page
