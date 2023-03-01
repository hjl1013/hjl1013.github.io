import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'

function AppRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </HashRouter>
    )
}

export default AppRouter