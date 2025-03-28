import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/shared/Navbar"
import { Button } from "./components/ui/button"
import Home from "./components/Home"
import Login from "./components/auth/login"
import Signup from "./components/auth/signup"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"
import Profile from "./components/Profile"
import JobDescription from "./components/JobDescription"
import Companies from "./components/admin/Companies"
import AdminJobs from "./components/admin/AdminJobs"
import CompanyCreate from "./components/admin/CompanyCreate"
import CompanySetup from "./components/admin/CompanySetup"
import PostJobs from "./components/admin/PostJobs"
import Applicants from "./components/admin/Applicants"
import ProtectedRoute from "./components/admin/ProtectedRoute"




function App() {
 const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },  
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/jobs",
    element:<Jobs/>
  },
  {
    path:"/description/:id",
    element:<JobDescription/>
  },
  {
    path:"/browse",
    element:<Browse/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
    // admin ke liye yha se start hoga
    ,
    {
      path:"/admin/companies",
      element:<ProtectedRoute><Companies/></ProtectedRoute>
    }
    ,
    {
      path:"/admin/jobs",
      element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
    },
    {
      path:"/admin/jobs/create",
      element:<ProtectedRoute><PostJobs/></ProtectedRoute>
    },
    {
      path:"/admin/companies/create",
      element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
    }, 
    {
      path:"/admin/companies/:id",
      element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
    },
    {
      path:"/admin/jobs/:id/applicants",
      element:<ProtectedRoute><Applicants/></ProtectedRoute> 
    },
 
 ])

  return (
    <>
    <RouterProvider router={appRouter}></RouterProvider>
    </>
  )
}

export default App
