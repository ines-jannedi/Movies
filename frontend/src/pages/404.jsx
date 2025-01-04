import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center
    text-white' style={{backgroundImage: `url('/404.png')`}}>
   
   <header className='absolute top-0 left-0 p-4 bg-black w-full'>
    <Link to={"/"}>
    <img src="/netflix-logo.png" alt="Netflix" className='h-8' />
    </Link>
   </header>

   <main
  className=" absolute before:absolute before:inset-1 z-1 before:bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.5)_0%,_rgba(0,0,0,0.2)_45%,_rgba(0,0,0,0.1)_55%,_transparent_70%)] text-center flex flex-col justify-center items-center 
  "
>
  <h1 className="text-7xl font-semibold text-white mb-3">Lost your way?</h1>

  <p className="text-lg text-gray-90 mb-5 max-w-lg">
    Sorry, we can't find that page. You'll find lots to explore on the home page.
  </p>

  <button className="bg-white text-black py-2 px-6 rounded font-semibold hover:bg-gray-200 transition mb-4">
    Netflix Home
  </button>

  <span className="text-gray-300 text-xl">
    Error Code: <strong className="text-white text-xl">NSES-404</strong>
  </span>
</main>



    </div>
  )
}

export default NotFoundPage
