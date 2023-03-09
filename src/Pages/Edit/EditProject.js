import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SideBar from '../../common/SideBar/SideBar'
import './EditProject.css'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { dbService, storageService } from '../../fbase';
import { v4 } from "uuid";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import ProjectBody from '../../common/ProjectBody/ProjectBody';

function EditProject() {
    const { projectId } = useParams();

    const [ title, setTitle ] = useState('');
    const [ titleImage, setTitleImage ] = useState('');
    const [ body, setBody ] = useState('');
    const [ bodySave, setBodySave ] = useState([]);
    const [ bodyImageAttachment, setBodyImageAttachment ] = useState('');

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

    const onClickEdit = async () => {
        console.log('editing...')
        await setDoc(doc(dbService, "projects", projectId), {
            title,
            titleImage,
            body: bodySave,
        });
        console.log('editing complete');
    }

    const getProjectInfo = async () => {
        const docRef = await getDoc(doc(dbService, "projects", projectId));
        const docData = docRef.data();

        let bodyTemp = '';
        docData.body.forEach(content => {
            bodyTemp += content.type + ' ' + content.content + '\n';
        })

        setTitle(docData.title);
        setTitleImage(docData.titleImage);
        setBodySave(docData.body);
        setBody(bodyTemp);
    }

    useEffect(() => {
        getProjectInfo()
    }, [])

    return (
        <div className='editProject'>
            <div className='editProject__sideBar'>
                <SideBar />
            </div>

            <div className='editProject__body'>
                <div className='editProject__title'>
                    <h1>Edit Content</h1>
                </div>

                <div className='editProject__contentTitle'>
                    <input type='text' placeholder='Enter Title' value={title} onChange={e => setTitle(e.target.value)}/>
                </div>

                <div className='editProject__contentTitleImage'>
                    { titleImage && <img src={titleImage} alt='' />}
                    <input type='text' placeholder='title image url' value={titleImage} onChange={e => setTitleImage(e.target.value)}/>
                </div>

                <div className='editProject__contextBody'>
                    <textarea placeholder='Content' value={body} onChange={onChangeBody}/>
                </div>

                <div className='editProject__imageLink'>
                    <div className='editProject__imagePreview'>
                        { bodyImageAttachment && <img src={bodyImageAttachment} alt=''/> }
                    </div>
                    <input type="file" accept="image/*" onChange={onChangeImage}/>
                    <Button onClick={onClickMakeUrl}>create url</Button>
                </div>

                <div className='editProject__contextPreview'>
                    <ProjectBody title={title} body={bodySave} />
                </div>

                <div className='editProject__submitButton'>
                    <Button onClick={onClickEdit}>Edit</Button>
                </div>
            </div>
        </div>
    )
}

export default EditProject