import { useState } from 'react'
import '../App.css'


function Home() {

  return (
    <div className="home-container">
        <h1>Welcome to Create Your Crew!</h1>
        <p>Here you can create and manage your own crew of characters.</p>
        <p>Use the navigation to create a new crew or view existing ones.</p>
        <p>Enjoy your adventure!</p>
        <img className='banner'src='https://www.toei-animation.com/wp-content/uploads/2019/02/collage-1920x595.png' alt='banner'></img>
    </div>
  )
}

export default Home
