import { Button } from '@mui/material';
import React, { useState } from 'react'
import SideBar from '../../common/SideBar/SideBar'
import './CreateProject.css'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { dbService, storageService } from '../../fbase';
import { v4 } from "uuid";
import { addDoc, collection } from 'firebase/firestore';
import ProjectBody from '../../common/ProjectBody/ProjectBody';
import { useNavigate } from 'react-router-dom';

function CreateProject() {
    const [ title, setTitle ] = useState('');
    const [ titleImage, setTitleImage ] = useState('');
    const [ body, setBody ] = useState('');
    const [ bodySave, setBodySave ] = useState([]);
    const [ bodyImageAttachment, setBodyImageAttachment ] = useState('');

    const navigate = useNavigate();

    const onChangeBody = (event) => {
        const bodyTemp = event.target.value;

        const bodySaveTemp = [];
        bodyTemp.split('\n').forEach(line => {
            const type = line.split(' ')[0];
            if (type === 'text') {
                bodySaveTemp.push({
                    type: 'text',
                    content: line.substring(5)
                })
            } else if (type === 'image') {
                bodySaveTemp.push({
                    type: 'image',
                    content: line.substring(6)
                })
            }
        })

        console.log(bodyTemp);

        setBody(bodyTemp);
        setBodySave(bodySaveTemp);
    }

    const onChangeImage = (event) => {
        const {target : {files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        if (theFile && theFile.type.match('image.*')) {
            reader.readAsDataURL(theFile);
        }
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent;
            setBodyImageAttachment(result);
        }
    }

    const onClickMakeUrl = async () => {
        const fileRef = ref(storageService, `${v4()}`);
        const response = await uploadString(fileRef, bodyImageAttachment, "data_url");
        const attachmentUrl = await getDownloadURL(response.ref);

        console.log(attachmentUrl);
    }

    const onClickCreate = async () => {
        console.log('creating...')
        const docRef = await addDoc(collection(dbService, "projects"), {
            title,
            titleImage,
            body: bodySave,
        });
        console.log("Document written with ID: ", docRef.id);
        navigate(`/edit-project/${docRef.id}`);
    }

    return (
        <div className='createProject'>
            <div className='createProject__sideBar'>
                <SideBar />
            </div>

            <div className='createProject__body'>
                <div className='createProject__title'>
                    <h1>Create Content</h1>
                </div>

                <div className='createProject__contentTitle'>
                    <input type='text' placeholder='Enter Title' value={title} onChange={e => setTitle(e.target.value)}/>
                </div>

                <div className='createProject__contentTitleImage'>
                    { titleImage && <img src={titleImage} alt='' />}
                    <input type='text' placeholder='title image url' value={titleImage} onChange={e => setTitleImage(e.target.value)}/>
                </div>

                <div className='createProject__contextBody'>
                    <textarea placeholder='Content' value={body} onChange={onChangeBody}/>
                </div>

                <div className='createProject__imageLink'>
                    <div className='createProject__imagePreview'>
                        { bodyImageAttachment && <img src={bodyImageAttachment} alt=''/> }
                    </div>
                    <input type="file" accept="image/*" onChange={onChangeImage}/>
                    <Button onClick={onClickMakeUrl}>create url</Button>
                </div>

                <div className='createProject__contextPreview'>
                    <ProjectBody title={title} body={bodySave} />
                </div>

                <div className='createProject__submitButton'>
                    <Button onClick={onClickCreate}>Create</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateProject