import { Button } from '@mui/material'
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import SideBar from '../../common/SideBar/SideBar';
import { dbService } from '../../fbase';
import './CreateAchievement.css'

function CreateAchievement() {
    const [ title, setTitle ] = useState('');
    const [ date, setDate ] = useState('');
    const [ tag, setTag ] = useState('');

    const onClickCreate = async () => {
        console.log('creating...')
        const docRef = await addDoc(collection(dbService, "achievements"), {
            title,
            date: new Date(date),
            tag
        });
        setTitle('');
        setDate('');
        setTag('');
        console.log("Document written with ID: ", docRef.id);
    }

    return (
        <div className='createAchievement'>
            <div className='createAchievement__sideBar'>
                <SideBar />
            </div>

            <div className='createAchievement__body'>
                <div className='createAchievement__titleInput'>
                    <input type='text' placeholder='enter title' value={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div className='createAchievement__dateInput'>
                    <input type='date' placeholder='enter date' value={date} onChange={e => setDate(e.target.value)}/>
                </div>
                <div className='createAchievement__tagInput'>
                    <input type='text' placeholder='math or cs or other' value={tag} onChange={e => setTag(e.target.value)}/>
                </div>
                <div className='createAchievement__submitButton'>
                    <Button onClick={onClickCreate}>create</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateAchievement