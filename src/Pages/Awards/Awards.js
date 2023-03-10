import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import SideBar from '../../common/SideBar/SideBar'
import { dbService } from '../../fbase';
import './Awards.css'

function Awards() {
    const [ awardList, setAwardList ] = useState([]);

    const getAwards = async () => {
        const querySnapshot = await getDocs(query(collection(dbService, "awards"), orderBy("date")));
        const awardsTemp = {};

        querySnapshot.forEach(doc => {
            const { sectionTitle, title } = doc.data();
            const date = new Date(doc.data().date.seconds * 1000)

            if (sectionTitle in awardsTemp) {
                awardsTemp[sectionTitle].push({
                    id: doc.id,
                    year: date.getFullYear(),
                    title
                });
            } else {
                awardsTemp[sectionTitle] = [{
                    id: doc.id,
                    year: date.getFullYear(),
                    title
                }];
            }

            setAwardList(awardsTemp);
        })
    }

    useEffect(() => {
        getAwards()
    }, [])

    return (
        <div className='awards'>
            <div className='awards__sideBar'>
                <SideBar page='awards'/>
            </div>

            <div className='awards__body'>
                <div className='awards__title'>
                    <h1>Awards</h1>
                </div>

                {
                    Object.keys(awardList).map(section => {
                        const list = awardList[section];

                        return (
                            <div key={section}>
                                <div className='awards__awardTitle'>
                                    <h3>{section}</h3>
                                </div>

                                {
                                    list.map(award => {
                                        return (
                                            <div className='awards__award' key={award.id}>
                                                <p>{award.year} {award.title}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Awards