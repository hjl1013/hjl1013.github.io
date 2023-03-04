import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Projects from '../Pages/Projects/Projects'

function AppRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/projects' element={<Projects />} />
            </Routes>
        </HashRouter>
    )
}

export default AppRouter