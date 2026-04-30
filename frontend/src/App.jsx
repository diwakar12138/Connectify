import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import {ToastContainer} from 'react-toastify'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ForgetPassword from './pages/ForgetPassword'
import URL from './Url'
function App() {
  
  console.log(URL)
  return (
    
    <div>
      <BrowserRouter>
      <Navbar/>
       <Routes>
           <Route path='/'  element={<Home/>}/>
           <Route path='/login'  element={<Login/>}/>
           <Route path='/register'  element={<Signup/>}/>
           <Route path='/forgetPassword'  element={<ForgetPassword/>}/>
       </Routes>
       <ToastContainer/>
      </BrowserRouter>
    </div>
  )
}

export default App
