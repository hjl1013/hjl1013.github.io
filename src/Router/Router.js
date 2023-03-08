import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import CreateProject from '../Pages/Create/CreateProject'
import Edit from '../Pages/Edit/EditProject'
import Home from '../Pages/Home/Home'
import Project from '../Pages/Projects/Project'
import Projects from '../Pages/Projects/Projects'

function AppRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/projects/:projectId' element={<Project />} />
                <Route path='/create-project' element={<CreateProject />} />
                <Route path='/edit-project/:projectId' element={<Edit />} />
            </Routes>
        </HashRouter>
    )
}

export default AppRouter