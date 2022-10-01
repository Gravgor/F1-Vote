import React from 'react'
import { MainPage } from './components/mainPage'
import { NoRace } from './components/noRacePage';

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
        <Route path="/noraceday" element={<NoRace/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App