import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import { Dashboard, Article, User, Login } from '../containers';
import { Sidebar, Navbar } from '../components';
import Cookies from 'universal-cookie';
import PrivateRoute from './PrivateRoute';

const Mainroute = () => {
  const location = useLocation();
  const cookies = new Cookies();
  let user = cookies.get("user");

  return (
    <div className='w-screen h-screen flex flex-row'>
      {!user || user.role === 'user' || ["/register", "/login"].includes(location.pathname) ? null : <Sidebar />}
      <div className='w-full flex flex-col ' >
        {["/register", "/login"].includes(location.pathname) ? null : <Navbar data={"LOGO"} />}
        <Routes>
          <Route index element={
            <PrivateRoute permissons={["responsable", "admin"]}  >
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="login" element={
            <Login />
          } />
          <Route path="articles" element={
            <PrivateRoute permissons={["responsable", "admin"]}  >
              <Article />
            </PrivateRoute>
          } />
          <Route path="users" element={
            <PrivateRoute permissons={["responsable", "admin"]}  >
              <User />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </div>
  )
}

export default Mainroute

