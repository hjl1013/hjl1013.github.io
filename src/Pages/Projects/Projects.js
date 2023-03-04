import React from 'react'
import SideBar from '../../common/SideBar/SideBar'
import './Projects.css'

function Projects() {
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
                    <div className='projects__item'>
                        <img src='http://fastmri.snu.ac.kr/2022maingr.png' alt='' />
                        <p>SNU FastMRI</p>
                    </div>
                    <div className='projects__item'>
                        <img src='http://fastmri.snu.ac.kr/2022maingr.png' alt='' />
                        <p>SNU FastMRI</p>
                    </div>
                    <div className='projects__item'>
                        <img src='http://fastmri.snu.ac.kr/2022maingr.png' alt='' />
                        <p>SNU FastMRI</p>
                    </div>
                    <div className='projects__item'>
                        <img src='http://fastmri.snu.ac.kr/2022maingr.png' alt='' />
                        <p>SNU FastMRI</p>
                    </div>
                    <div className='projects__item'>
                        <img src='http://fastmri.snu.ac.kr/2022maingr.png' alt='' />
                        <p>SNU FastMRI</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects