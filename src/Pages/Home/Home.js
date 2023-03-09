import React, { useEffect, useState } from 'react'
import SideBar from '../../common/SideBar/SideBar'
import './Home.css'

import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import CalculateIcon from '@mui/icons-material/Calculate';
import ComputerIcon from '@mui/icons-material/Computer';
import StarIcon from '@mui/icons-material/Star';
import { Button } from '@mui/material';
import TimelineItem from './components/TimelineItem';
import { collection, doc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { dbService } from '../../fbase';

const tagList = {
    math: {
        icon: <CalculateIcon />,
        color: 'lightblue'
    },
    cs: {
        icon: <ComputerIcon />,
        color: 'lightgreen'
    },
    other: {
        icon: <StarIcon />,
        color: 'orange'
    }
};

function Home() {
    const [ tag, setTag ] = useState('');
    const [ timeline, setTimeline ] = useState([]);

    const getAchievements = async () => {
        let querySnapshot;
        if (!tag) {
            querySnapshot = await getDocs(query(collection(dbService, "achievements"), orderBy("date")));
        }
        else {
            querySnapshot = await getDocs(query(collection(dbService, "achievements"), where("tag", "==", tag), orderBy("date", "asc")));
        }

        const timelineTemp = [];
        let year = 0;
        let type = 'right';
        let key = 0;
        querySnapshot.forEach(doc => {
            const date = new Date(doc.data().date.seconds * 1000)
            const data = doc.data();

            if (date.getFullYear() > year) {
                year = date.getFullYear()
                timelineTemp.push({
                    key,
                    tag: 'year',
                    title: '',
                    icon: <h3>{year}</h3>,
                    color: 'lightgray'
                })
                key += 1;
            }

            timelineTemp.push({
                key,
                type: type,
                title: data.title,
                icon: tagList[data.tag].icon,
                color: tagList[data.tag].color
            })
            key += 1;

            type = (type === 'right') ? 'left': 'right';
        })

        setTimeline(timelineTemp);
    }

    useEffect(() => {
        getAchievements()
    }, [])

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
                    <h2>Timeline</h2>
                </div>

                <div className='home__achievements'>
                    <div className='home__achievementsFilters'>
                        <div className={`home__achievementsFilter ${ !tag && 'home__achievementsFilter--active'}`}>
                            <Button onClick={() => setTag('')}>All</Button>
                        </div>
                        <div className={`home__achievementsFilter ${ tag === 'math' && 'home__achievementsFilter--active'}`}>
                            <Button onClick={() => setTag('math')}>Math</Button>
                        </div>
                        <div className={`home__achievementsFilter ${ tag === 'cs' && 'home__achievementsFilter--active'}`}>
                            <Button onClick={() => setTag('cs')}>CS</Button>
                        </div>
                        <div className={`home__achievementsFilter ${ tag === 'other' && 'home__achievementsFilter--active'}`}>
                            <Button onClick={() => setTag('other')}>other</Button>
                        </div>
                    </div>
                    <div className='home__achievementsTimelineContainer'>
                        <div className='home__achievementsTimeline'>
                            <div className='home__achievementsTimelineCenterLine'></div>
                            {
                                timeline.map(({ key, type, icon, color, title }) => {
                                    return (
                                        <div key={key} className='home__timelineItem'>
                                            <TimelineItem type={type} icon={icon} iconColor={color} text={title} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home