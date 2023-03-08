import React, { useEffect, useState } from 'react'
import SideBar from '../../common/SideBar/SideBar'
import './Home.css'

import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import CalculateIcon from '@mui/icons-material/Calculate';
import ComputerIcon from '@mui/icons-material/Computer';
import { Button } from '@mui/material';
import TimelineItem from './components/TimelineItem';

function Home() {
    const [ achievements, setAchievements ] = useState([]);

    // useEffect

    return (
        <div className='home'>
            <div className='home__sideBar'>
                <SideBar page='home'/>
            </div>

            <div className='home__body'>
                <div className='home__profileInfo'>
                    <div className='home__profileImageInfo'>
                        <img src='/profilePic.jpg' alt='' />
                    </div>
                    <div className='home__profileTextInfo'>
                        <h2>Hyunjun Lee</h2>
                        <p>Seoul National University ECE</p>
                        <div className='home__profileAccounts'>
                            <GitHubIcon />
                            <InstagramIcon />
                        </div>
                    </div>
                </div>

                <div className='home__sectionTitle'>
                    <h2>Short introduction of myself</h2>
                </div>

                <div className='home__shortIntroduction'>
                    <p>
                        Hi, my name is Hyunjun Lee and I am a junior at Seoul National University.
                    </p>
                    <p>
                        I love studying math, computer science, and electronics. I spend most of my time these days studying computer science, especially AI and Web/App developments.
                    </p>
                </div>

                <div className='home__sectionTitle'>
                    <h2>Achievements Timeline</h2>
                </div>

                <div className='home__achievements'>
                    <div className='home__achievementsFilters'>
                        <div className='home__achievementsFilter home__achievementsFilter--active'>
                            <Button>All</Button>
                        </div>
                        <div className='home__achievementsFilter'>
                            <Button>Math</Button>
                        </div>
                        <div className='home__achievementsFilter'>
                            <Button>CS</Button>
                        </div>
                    </div>
                    <div className='home__achievementsTimelineContainer'>
                        <div className='home__achievementsTimeline'>
                            <div className='home__achievementsTimelineCenterLine'></div>
                            <div className='home__timelineItem'>
                                <TimelineItem type='' icon={<h3>2019</h3>} iconColor='lightgray' text='Enter Seoul Science HighSchool'/>
                            </div>
                            <div className='home__timelineItem'>
                                <TimelineItem type='right' icon={<CalculateIcon />} iconColor='lightblue' text='Enter Seoul Science HighSchool'/>
                            </div>
                            <div className='home__timelineItem'>
                                <TimelineItem type='left' icon={<ComputerIcon />} iconColor='lightgreen' text='Enter Seoul Science HighSchool'/>
                            </div>
                            <div className='home__timelineItem'>
                                <TimelineItem type='right' icon={<CalculateIcon />} iconColor='lightblue' text='Enter Seoul Science HighSchool'/>
                            </div>
                            <div className='home__timelineItem'>
                                <TimelineItem type='left' icon={<ComputerIcon />} iconColor='lightgreen' text='Enter Seoul Science HighSchool'/>
                            </div>
                            <div className='home__timelineItem'>
                                <TimelineItem type='right' icon={<CalculateIcon />} iconColor='lightblue' text='Enter Seoul Science HighSchool'/>
                            </div>
                            <div className='home__timelineItem'>
                                <TimelineItem type='left' icon={<ComputerIcon />} iconColor='lightgreen' text='Enter Seoul Science HighSchool'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home