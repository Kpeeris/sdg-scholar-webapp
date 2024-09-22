import React, { useState,useEffect } from 'react'
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill' 

const EditableBlock = ({block}) => {
    const [textEditorShow, setTextEditorShow] = useState(false)

    let admin = true

    //second commit

    //text editor styling credit to https://medium.com/@aalam-info-solutions-llp/how-to-build-a-text-editor-in-react-js-d5c7fdb321ef
    var modules = {
        toolbar: [
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] }
          ],
          [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
        ]
    }

    var formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size",
    ];

    const handleProcedureContentChange = (content) => {
    console.log("content---->", content);
    }

    const [buttonState, setButtonState] = useState('Edit')
    const handleClick = () => {
        if(buttonState === 'Edit'){
            setTextEditorShow(true)
            //block.content
            setButtonState('Save')
        } else {
            setTextEditorShow(false)
            setButtonState('Edit')
        }
        //open up the text editor here
    }

    return(
        <div>
            {textEditorShow === false ? (
                <div>
                    {block.subheading ? <h3>{block.subheading}</h3> : null}
                    {block.body ? <p>{block.body}</p> : null}
                    {block.media ? <p>Image</p> : null}
                </div>
            ) : 
            <div>
                <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={ block.subheading }
                    onChange={handleProcedureContentChange}
                    style={{ height: "75px" }}
                >
                </ReactQuill>

                <br />
                <br />
                <br />

                <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={ block.body }
                    onChange={handleProcedureContentChange}
                    style={{ height: "220px" }}
                >
                </ReactQuill>
            </div>
            
            }
            <br />
            <br />
            {admin ? <button onClick={ handleClick }>{ buttonState }</button> : null}
            
            
            
            {/*<button onClick={ addBlock }>Add Block</button>*/}
        </div>
        
    )
}

export default EditableBlock
