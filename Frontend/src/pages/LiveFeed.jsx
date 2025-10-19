import React from 'react'
import SideBar from '../components/SideBar'
import dash from '../assets/icons/dashboard.png'
import user from '../assets/icons/user.png'
import setting from '../assets/icons/setting.png'
import demo from '../assets/videos/demo_video.mp4'

function LiveFeed() {
  {/* array for sidebar */ }
  const items = [
    { name: "Dashboard", path: '/', icon: dash },
    { name: "Users", path: '/', icon: user },
    { name: "Settings", path: '/', icon: setting }
  ]
  return (
    <div className='w-screen min-h-screen bg-gradient-to-bl from-[#EEEEEE] to-[#91ADC8] flex flex-col items-start  justify-center '>
      {/* sidebar */}
      <SideBar items={items} />

      <div className='w-full min-h-screen flex flex-col items-center justify-center'>
          {/* video screen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:pl-10">
  <div className='md:w-full md:h-[50vh] bg-white shadow-lg rounded-xl overflow-hidden'>
    <video 
      src={demo} 
      controls 
      autoPlay 
      loop 
      className="w-full h-full object-cover"
    />
  </div>

  <div className='md:w-full md:h-[50vh] bg-white shadow-lg rounded-xl overflow-hidden'>
    <video 
      src={demo} 
      controls 
      autoPlay 
      loop 
      className="w-full h-full object-cover"
    />
  </div>
</div>


          <div className='flex flex-row items-center justify-center pt-4'>
            <button className='bg-white hover:bg-blue-100 rounded-xl p-1 shadow-lg font-azonix'>record</button>
          </div>
      </div>
    </div>
  )
}

export default LiveFeed
