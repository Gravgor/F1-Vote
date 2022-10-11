import React from 'react'
import { MainPage } from './components/main-page/mainPage'
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
        <Route path="/F1-Vote/" element={<MainPage/>} />
        <Route path="/F1-Vote/admin" element={<AdminPanelLogin  />} />
      </Routes>
    </Router>
    </>
  )
}

export default App