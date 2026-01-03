import React from 'react'
import SideBar from '../component/SideBar'
import MessageArea from '../component/MessageArea'

const Home = () => {
  return (
    <div className=' w-full h-[100vh] flex'>
      <SideBar/>
      <MessageArea/> 
    </div>
  )
}

export default Home
