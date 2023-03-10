import React from 'react'
import './SideBar.css'

import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useNavigate } from 'react-router-dom';

function SideBar({ page }) {
    const navigate = useNavigate();

    return (
        <div className='sideBar'>
            <div className='sideBar__contents'>
                <div className={`sideBar__content ${page === 'home' && 'sideBar__content--active'}`} onClick={() => navigate('/')}>
                    <p>Home</p>
                    <HomeIcon />
                </div>
                <div className={`sideBar__content ${page === 'projects' && 'sideBar__content--active'}`} onClick={() => navigate('/projects')}>
                    <p>Projects</p>
                    <ArticleIcon />
                </div>
                <div className={`sideBar__content ${page === 'awards' && 'sideBar__content--active'}`} onClick={() => navigate('/awards')}>
                    <p>Awards</p>
                    <EmojiEventsIcon />
                </div>
            </div>
        </div>
    )
}

export default SideBar