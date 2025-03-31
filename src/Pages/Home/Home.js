import React, { useEffect, useState } from 'react'
import SideBar from '../../common/SideBar/SideBar'
import './Home.css'

import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import CalculateIcon from '@mui/icons-material/Calculate';
import ComputerIcon from '@mui/icons-material/Computer';
import StarIcon from '@mui/icons-material/Star';
import SchoolIcon from '@mui/icons-material/School';
import ScienceIcon from '@mui/icons-material/Science';
import ArticleIcon from '@mui/icons-material/Article';
import { Button } from '@mui/material';
import TimelineItem from './components/TimelineItem';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { dbService } from '../../fbase';
import { Link } from 'react-router-dom';

const tagList = {
    math: {
        icon: <CalculateIcon />,
        color: 'lightblue'
    },
    science: {
        icon: <ScienceIcon />,
        color: '#8458B3'
    },
    cs: {
        icon: <ComputerIcon />,
        color: 'lightgreen'
    },
    degree: {
        icon: <SchoolIcon />,
        color: 'orange'
    },
    other: {
        icon: <StarIcon />,
        color: '#FF6F61'
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
    }, [tag])

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
                            <Link to='https://scholar.google.com/citations?hl=ko&user=SVFe8ZYAAAAJ'>
                                <div className='home__profileAccount'>
                                    <SchoolIcon />
                                </div>
                            </Link>
                            <Link to='https://github.com/hjl1013'>
                                <div className='home__profileAccount'>
                                    <GitHubIcon />
                                </div>
                            </Link>
                            <Link to='https://www.instagram.com/lhyj_eun2/'>
                                <div className='home__profileAccount'>
                                    <InstagramIcon />
                                </div>
                            </Link>
                            <Link to='https://drive.google.com/file/d/1_ypnzFOpc_w_1RqQCMKHCRJegtgeUs2q/view?usp=sharing'>
                                <div className='home__profileAccount'>
                                    <ArticleIcon />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='home__sectionTitle'>
                    <h2>Short introduction of myself</h2>
                </div>

                <div className='home__shortIntroduction'>
                    <p>
                        Hi, my name is Hyunjun Lee and I am a junior at Seoul National University. I am currently an Undergraduate intern in Cognitive Learning for Vision and Robotics Lab at KAIST under professor Joseph Lim.
                    </p>
                    <p>
                        I aim to explore ways in which AI can more accurately replicate complex aspects of human behavior and develop a product that efficiently utilzes technology.
                    </p>
                </div>

                <div className='home__sectionTitle'>
                    <h2>News</h2>
                </div>

                <div className='home__news'>
                    <p>
                        [Feb 2025] Our Paper "SyncSDE: A Probabilistic Framework for Diffusion Synchronization" is accepted in CVPR 2025! Congrats to my co-authors Hyunsoo Lee and Sookwan Han.
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
                        {
                            Object.keys(tagList).map(key => {
                                return (
                                    <div key={key} className={`home__achievementsFilter ${ tag === key && 'home__achievementsFilter--active'}`}>
                                        <Button id={key} onClick={e => setTag(e.target.id)}>{key}</Button>
                                    </div>
                                )
                            })
                        }
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