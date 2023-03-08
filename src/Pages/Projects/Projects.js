import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SideBar from '../../common/SideBar/SideBar'
import { dbService } from '../../fbase';
import './Projects.css'

function Projects() {
    const [ projects, setProjects ] = useState([]);

    const navigate = useNavigate();

    const getProjects = async () => {
        const querySnapshot = await getDocs(collection(dbService, "projects"));
        const projectsTemp = [];

        querySnapshot.forEach(doc => {
            projectsTemp.push({
                id: doc.id,
                title: doc.data().title,
                image: doc.data().titleImage
            })
        })

        setProjects(projectsTemp);
    }

    useEffect(() => {
        getProjects();
    }, [])

    return (
        <div className='projects'>
            <div className='projects__sideBar'>
                <SideBar page='projects'/>
            </div>

            <div className='projects__body'>
                <div className='projects__title'>
                    <h1>Projects</h1>
                </div>

                <div className='projects__list'>
                    {
                        projects.map(project => {
                            return (
                                <div id={project.id} key={project.id} className='projects__item' onClick={e => navigate(`/projects/${e.target.id}`)}>
                                    <img id={project.id} src={project.image} alt='' />
                                    <p id={project.id}>{project.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Projects