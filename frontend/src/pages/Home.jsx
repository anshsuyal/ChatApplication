import React from 'react'
import SideBar from '../component/SideBar.jsx'
import MessageArea from '../component/MessageArea.jsx'
import { useSelector } from 'react-redux'
import useGetMessages from '../customHooks/getMessages.jsx'

const Home = () => {
  let { selectedUser } =useSelector(state=>state.user)
  useGetMessages();
  return (
    <div className=' w-full h-[100vh] flex'>
      <SideBar/>
      <MessageArea/> 
    </div>
  )
}

export default Home
