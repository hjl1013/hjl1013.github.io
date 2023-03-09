import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import CreateAchievement from '../Pages/Create/CreateAchievement'
import CreateProject from '../Pages/Create/CreateProject'
import EditProject from '../Pages/Edit/EditProject'
import Home from '../Pages/Home/Home'
import Project from '../Pages/Projects/Project'
import Projects from '../Pages/Projects/Projects'

function AppRouter() {
    return (
        <HashRouter>
            <Routes>
                {/* main routes */}
                <Route path='/' element={<Home />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/project/:projectId' element={<Project />} />

                {/* for creating, editing */}
                <Route path='/create-project' element={<CreateProject />} />
                <Route path='/create-achievement' element={<CreateAchievement />} />
                <Route path='/edit-project/:projectId' element={<EditProject />} />
            </Routes>
        </HashRouter>
    )
}

export default AppRouter