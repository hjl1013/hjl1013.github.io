import React from 'react'
import SideBar from '../../common/SideBar/SideBar'
import './Awards.css'

function Awards() {
    return (
        <div className='awards'>
            <div className='awards__sideBar'>
                <SideBar page='awards'/>
            </div>

            <div className='awards__body'>
                <div className='awards__title'>
                    <h1>Awards</h1>
                </div>

                <div className='awards__awardTitle'>
                    <h3>Olympiad</h3>
                </div>

                <div className='awards__awardList'>
                    <p>2015 Middle School Level KMO gold prize</p>
                    <p>2015 Middle School Level KMO gold prize</p>
                    <p>2015 Middle School Level KMO gold prize</p>
                </div>

                <div className='awards__awardTitle'>
                    <h3>Olympiad</h3>
                </div>

                <div className='awards__awardList'>
                    <p>2015 Middle School Level KMO gold prize</p>
                    <p>2015 Middle School Level KMO gold prize</p>
                    <p>2015 Middle School Level KMO gold prize</p>
                </div>

                <div className='awards__awardTitle'>
                    <h3>Olympiad</h3>
                </div>

                <div className='awards__awardList'>
                    <p>2015 Middle School Level KMO gold prize</p>
                    <p>2015 Middle School Level KMO gold prize</p>
                    <p>2015 Middle School Level KMO gold prize</p>
                </div>
            </div>
        </div>
    )
}

export default Awards