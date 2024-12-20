
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Footer from './components/Footer.jsx'

function App() {
  

  return (
    <>
    <Routes>
     <Route path="/" element={<HomePage/>}/>
     <Route path="/login" element={<LoginPage/>}/>
     <Route path="/signup" element={<SignUpPage/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
