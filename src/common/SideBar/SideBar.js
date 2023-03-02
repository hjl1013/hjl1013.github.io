import React from 'react'
import './SideBar.css'

import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function SideBar() {
    return (
        <div className='sideBar'>
            <div className='sideBar__contents'>
                <div className='sideBar__content sideBar__content--active'>
                    <p>Home</p>
                    <HomeIcon />
                </div>
                <div className='sideBar__content'>
                    <p>Projects</p>
                    <ArticleIcon />
                </div>
                <div className='sideBar__content'>
                    <p>Awards</p>
                    <EmojiEventsIcon />
                </div>
            </div>
        </div>
    )
}

export default SideBar