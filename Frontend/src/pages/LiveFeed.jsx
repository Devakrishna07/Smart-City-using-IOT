import React from 'react'
import SideBar from '../components/SideBar'
import dash from '../assets/icons/dashboard.png'
import user from '../assets/icons/user.png'
import setting from '../assets/icons/setting.png'

function LiveFeed() {
  {/* array for sidebar */}
  const items = [
    {name:"Dashboard", path:'/', icon:dash},
    {name:"Users", path:'/',icon:user },
    {name:"Settings", path:'/', icon:setting}
  ]
  return (
    <div className='w-screen min-h-screen bg-gradient-to-bl from-[#EEEEEE] to-[#91ADC8] flex flex-col items-start  justify-center '>
      {/* sidebar */}
      <SideBar items={items} />
    </div>
  )
}

export default LiveFeed
