import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Awards from '../Pages/Awards/Awards'
import CreateAchievement from '../Pages/Create/CreateAchievement'
import CreateAward from '../Pages/Create/CreateAward'
import CreateProject from '../Pages/Create/CreateProject'
import EditProject from '../Pages/Edit/EditProject'
import Home from '../Pages/Home/Home'
import Project from '../Pages/Projects/Project'
import Projects from '../Pages/Projects/Projects'

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* main routes */}
                <Route path='/' element={<Home />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/project/:projectId' element={<Project />} />
                <Route path='/awards' element={<Awards />} />

                {/* for creating, editing */}
                <Route path='/create-project' element={<CreateProject />} />
                <Route path='/create-achievement' element={<CreateAchievement />} />
                <Route path='/create-award' element={<CreateAward />} />
                <Route path='/edit-project/:projectId' element={<EditProject />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter