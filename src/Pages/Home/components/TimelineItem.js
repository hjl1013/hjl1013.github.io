import React from 'react'
import './TimelineItem.css'

function TimelineItem({ type, icon, iconColor, text }) {
    return (
        <div className='timelineItem'>
            <div className='timelineItem__left'>
                {
                    type === 'left' &&
                    <>
                        <div className='timelineItem__line'></div>
                        <div className='timelineItem__text'>
                            <p>{text}</p>
                        </div>
                    </>
                }
            </div>
            <div className='timelineItem__icon' style={{backgroundColor: iconColor}}>
                {icon}
            </div>
            <div className='timelineItem__right'>
                {
                    type === 'right' &&
                    <>
                        <div className='timelineItem__line'></div>
                        <div className='timelineItem__text'>
                            <p>{text}</p>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default TimelineItem