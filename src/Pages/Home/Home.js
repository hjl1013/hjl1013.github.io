import React, { useMemo, useState } from 'react'
import './Home.css'

import GitHubIcon from '@mui/icons-material/GitHub';
import SchoolIcon from '@mui/icons-material/School';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Button } from '@mui/material';
import TimelineItem from './components/TimelineItem';

import publications from '../../data/publications.json';
import awardsData from '../../data/awards.json';
import educationData from '../../data/education.json';

const AUTHOR_NAME = 'Hyunjun Lee';
const TIMELINE_ICON_COLOR = '#16a34a';

// One icon per timeline tag, reused for the matching section titles.
const timelineThemeIcons = {
    Publication: <ArticleIcon />,
    Education: <SchoolIcon />,
    Award: <EmojiEventsIcon />
};

// The timeline is derived from the other data files, so each item only has to be
// edited in one place. An item appears on the timeline only if it has a date, and
// shows its "timelineText" when set (otherwise it falls back to its section title).
const timelineSources = [
    ...publications
        .filter(pub => pub.date)
        .map(pub => ({ date: pub.date, title: pub.timelineText || pub.title, tag: 'Publication' })),
    ...educationData
        .filter(edu => edu.date)
        .map(edu => ({ date: edu.date, title: edu.timelineText || edu.school, tag: 'Education' })),
    ...awardsData.flatMap(section =>
        section.awards
            .filter(award => award.date)
            .map(award => ({ date: award.date, title: award.timelineText || award.title, tag: 'Award' }))
    )
];

// Render an author list string, bolding the site owner's name.
const renderAuthors = (authors) =>
    authors.split(AUTHOR_NAME).map((part, index, parts) => (
        <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && <b>{AUTHOR_NAME}</b>}
        </React.Fragment>
    ));

function Home() {
    const [ tag, setTag ] = useState('');

    // Newest first, optionally filtered by the selected category, with a year marker
    // inserted whenever the year changes and items alternating left/right.
    const timeline = useMemo(() => {
        const items = timelineSources
            .filter(item => !tag || item.tag === tag)
            .slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        const result = [];
        let year = null;
        let type = 'right';
        let key = 0;
        items.forEach(item => {
            const itemYear = new Date(item.date).getFullYear();

            if (itemYear !== year) {
                year = itemYear;
                result.push({ key, title: '', icon: <h3>{year}</h3>, color: 'lightgray' });
                key += 1;
            }

            result.push({
                key,
                type,
                title: item.title,
                icon: timelineThemeIcons[item.tag],
                color: TIMELINE_ICON_COLOR
            });
            key += 1;
            type = (type === 'right') ? 'left' : 'right';
        });

        return result;
    }, [tag]);

    return (
        <div className='home'>
            <div className='home__body'>
                <div className='home__profileInfo'>
                    <div className='home__profileImageInfo'>
                        <img src='/profilePic.jpg' alt='' />
                    </div>
                    <div className='home__profileTextInfo'>
                        <h2>Hyunjun Lee</h2>
                        <p>Seoul National University ECE</p>
                        <div className='home__profileAccounts'>
                            <a href='https://scholar.google.com/citations?hl=ko&user=SVFe8ZYAAAAJ' target='_blank' rel='noopener noreferrer'>
                                <div className='home__profileAccount'>
                                    <SchoolIcon />
                                </div>
                            </a>
                            <a href='https://github.com/hjl1013' target='_blank' rel='noopener noreferrer'>
                                <div className='home__profileAccount'>
                                    <GitHubIcon />
                                </div>
                            </a>
                            <a href='https://drive.google.com/file/d/1_ypnzFOpc_w_1RqQCMKHCRJegtgeUs2q/view?usp=sharing' target='_blank' rel='noopener noreferrer'>
                                <div className='home__profileAccount'>
                                    <ArticleIcon />
                                </div>
                            </a>
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
                        My main research interest lies in self-improvement and automation in learning. I want to AI to autonomously learn and acquire skills. Building on this, I am also interested in multi-agent learning that enables complex collaboration among robots. Ultimately, I believe individual robots should become cheaper and the number of robots should scale.
                    </p>
                    <p>
                        Eventually, I want to make my own research lab that enables curiosity-driven exploration across diverse fields. I want to replicate the spirit of Bell Lab while ensuring long-term sustainability.
                    </p>
                </div>

                <div className='home__sectionTitle'>
                    <h2>News</h2>
                </div>

                <div className='home__news'>
                    <p>
                        <b>[Mar 2026]</b> Our Paper "N2M: Bridging Navigation and Manipulation by Learning Pose Preference from Rollout" is accepted to ICML 2026! Thanks to all my co-authors.
                    </p>
                    <p>
                        <b>[Feb 2025]</b> Our Paper "SyncSDE: A Probabilistic Framework for Diffusion Synchronization" is accepted to CVPR 2025! Congrats to my co-authors Hyunsoo Lee and Sookwan Han.
                    </p>
                </div>

                <div className='home__sectionTitle'>
                    <span className='home__sectionTitleIcon'>{timelineThemeIcons.Publication}</span>
                    <h2>Publication</h2>
                </div>

                <div className='home__publications'>
                    {
                        publications.map(pub => {
                            return (
                                <a className='home__publication' key={pub.title} href={pub.link} target='_blank' rel='noopener noreferrer'>
                                    <div className='home__publicationMedia'>
                                        {
                                            pub.image
                                                ? <img src={pub.image} alt={pub.title} />
                                                : (
                                                    <div className='home__publicationPlaceholder'>
                                                        <ImageIcon />
                                                        <span>Media coming soon</span>
                                                    </div>
                                                )
                                        }
                                    </div>
                                    <div className='home__publicationText'>
                                        <p className='home__publicationTitle'>{pub.title}</p>
                                        <p className='home__publicationAuthor'>{renderAuthors(pub.authors)}</p>
                                        <span className='home__publicationConference'>{pub.venue}</span>
                                    </div>
                                </a>
                            )
                        })
                    }
                </div>

                <div className='home__sectionTitle'>
                    <span className='home__sectionTitleIcon'>{timelineThemeIcons.Education}</span>
                    <h2>Education</h2>
                </div>

                <div className='home__education'>
                    {
                        educationData.map(edu => {
                            return (
                                <div className='home__educationItem' key={edu.school}>
                                    <div className='home__educationHeader'>
                                        <h3 className='home__educationSchool'>{edu.school}</h3>
                                        <span className='home__educationPeriod'>{edu.period}</span>
                                    </div>
                                    <p className='home__educationDegree'>{edu.degree}</p>
                                    {
                                        edu.details.length > 0 &&
                                        <ul className='home__educationDetails'>
                                            {edu.details.map(detail => <li key={detail}>{detail}</li>)}
                                        </ul>
                                    }
                                </div>
                            )
                        })
                    }
                </div>

                <div className='home__sectionTitle'>
                    <span className='home__sectionTitleIcon'>{timelineThemeIcons.Award}</span>
                    <h2>Award</h2>
                </div>

                <div className='home__awards'>
                    {
                        awardsData.map(section => {
                            return (
                                <div className='home__awardSection' key={section.theme}>
                                    <h3 className='home__awardSectionTitle'>{section.theme}</h3>
                                    {
                                        section.awards.map((award, index) => {
                                            return (
                                                <div className='home__award' key={index}>
                                                    <span className='home__awardYear'>{award.date.slice(0, 4)}</span>
                                                    <p>{award.title}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
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
                            Object.keys(timelineThemeIcons).map(key => {
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
