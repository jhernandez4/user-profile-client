import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx'
import LogInPage from './pages/LogInPage/LogInPage.jsx'
import UserProfile from './pages/UserProfile/UserProfile.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/signup",
    element: <SignUpPage/>,
  },
  {
    path: "/login",
    element: <LogInPage/>,
  },
  {
    path: "/profile",
    element: <UserProfile/>,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
