import React from 'react'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home" 
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Explorer from "./pages/Explorer"
import CarDetails from "./pages/CarDetails"
import Compare from "./pages/Compare"
import AIRecommendation from "./pages/AIRecommendation"
import Showrooms from "./pages/Showrooms"

const router = createBrowserRouter([{
  path:'/',
  element: <><Navbar/><Home/> </>
},
{
  path:'/signup',
  element: <> <Signup/> </>
},
{
  path:'/login',
  element: <> <Login/> </>
},
{
  path:'/profile',
  element: <> <Navbar /> <Profile/> </>
},
{
  path:'/explorer',
  element: <> <Navbar /> <Explorer/> </>
},
{
  path:'/car/:carId',
  element: <> <Navbar /> <CarDetails/> </>
},
{
  path:'/compare',
  element: <> <Navbar /> <Compare/> </>
},
{
  path:'/ai-recommend',
  element: <> <Navbar /> <AIRecommendation/> </>
},
{
  path:'/showrooms',
  element: <> <Navbar /> <Showrooms/> </>
}
])
const App = () => {
  return (
    <>
      <RouterProvider router ={router} />
    </>
  )
}

export default App