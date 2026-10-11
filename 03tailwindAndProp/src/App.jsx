import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Card from './component/Card'


function App() {
  const obj = {
    profileImage : "https://images.unsplash.com/photo-1538983062322-cdd7fc2208a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D",
    userName : "Rahul", 
    id: "@rahul",
    about : "a professional webdeveloper"
  }

  const Nishchal = {
    profileImage : "https://scontent.fbho1-3.fna.fbcdn.net/v/t39.30808-6/473414367_1418830265745188_5509498636226198675_n.jpg?stp=c0.169.1536.1536a_dst-jpg_tt6&cstp=mx1536x1536&ctp=s565x565&_nc_cat=106&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=bmolFzRbfxAQ7kNvwHm66Gy&_nc_oc=Adphe9xUubJugN7x9zyEuAX-WmVYv-FrZpUzoELRP62aJBk4rZTq-qF0x1FIO0NXKAGD-LvmamSGg61afWXOoebh&_nc_zt=23&_nc_ht=scontent.fbho1-3.fna&_nc_gid=nB_buDdty2KF5xC8MtrGYg&_nc_ss=7b2a8&oh=00_AQLYd_Gru5-IHebTk9WPAQ3iim9NcQcE9LD6LVlsPX--sQ&oe=6ABC26D7",
    userName : "Nishchal", 
    id: "@nthakur",
    about : "a professional coder"
  }

  return (
    <>
      <div className="bg-blue-500 text-white p-5 text-2xl">
        Hello React + Tailwind
      </div>
      <div id='users'>
      <Card image={obj.profileImage} username={obj.userName} id={obj.id} about={obj.about}/>
      <Card image={Nishchal.profileImage} username={Nishchal.userName} id={Nishchal.id} about={Nishchal.about}/>
      </div>
    </>
  )
}

export default App
