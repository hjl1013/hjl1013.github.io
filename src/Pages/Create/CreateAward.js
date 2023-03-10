import { Button } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import SideBar from '../../common/SideBar/SideBar'
import { dbService } from '../../fbase';
import './CreateAward.css'

function CreateAward() {
    const [ sectionTitle, setSectionTitle ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ date, setDate ] = useState('');

    const onClickCreate = async () => {
        console.log('creating...')
        const docRef = await addDoc(collection(dbService, "awards"), {
            sectionTitle,
            title,
            date: new Date(date),
        });
        setSectionTitle('');
        setTitle('');
        setDate('');
        console.log("Document written with ID: ", docRef.id);
    }
    
    return (
        <div className='createAward'>
            <div className='createAward__sideBar'>
                <SideBar />
            </div>

            <div className='createAward__body'>
                <div className='createAward__nameInput'>
                    <input type='text' placeholder='award section title' value={sectionTitle} onChange={e => setSectionTitle(e.target.value)} />
                </div>
                <div className='createAward__titleInput'>
                    <input type='text' placeholder='award title' value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className='createAward__dateInput'>
                    <input type='date' value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div className='createAward__createButton'>
                    <Button onClick={onClickCreate}>Create</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateAward