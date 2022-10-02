import React from 'react'
import { MainPage } from './components/mainPage'
import { AdminPanelLogin } from './components/admin-panel/adminLogin';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/admin" element={<AdminPanelLogin  />} />
      </Routes>
    </Router>
    </>
  )
}

export default App