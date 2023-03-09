import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ProjectBody from '../../common/ProjectBody/ProjectBody'
import SideBar from '../../common/SideBar/SideBar'
import { dbService } from '../../fbase';
import './Project.css'

function Project() {
    const { projectId } = useParams();

    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState([]);

    const getProjectInfo = async () => {
        
        const docRef = await getDoc(doc(dbService, "projects", projectId));
        const docData = docRef.data();

        setTitle(docData.title);
        setBody(docData.body);
    }

    useEffect(() => {
        getProjectInfo()
    }, [])

    return (
        <div className='project'>
            <div className='project__sideBar'>
                <SideBar page='projects'/>
            </div>

            <div className='project__body'>
                <ProjectBody title={title} body={body}/>
            </div>
        </div>
    )
}

export default Project