import React from 'react'
import './ProjectBody.css'

function ProjectBody({ title, body }) {
    return (
        <div className='projectBody'>
            <div className='projectBody__contentPreviewTitle'>
                <h1>{title}</h1>
            </div>

            {
                body.map(content => {
                    const type = content.type;

                    return (
                        <div className='projectBody__contentParagraph' key={content.content}>
                            {type === 'text' && <p>{content.content}</p>}
                            {type === 'image' && <img key={content.content} src={content.content} alt=''/>}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProjectBody