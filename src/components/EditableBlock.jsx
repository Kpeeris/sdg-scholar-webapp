import { useState,useEffect } from 'react';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Button } from "@/components/ui/button";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import db from '../../firebaseFiles/firebaseConfig.js';
import ReactHtmlParser from 'html-react-parser';
import sanitizeHtml from 'sanitize-html';

const EditableBlock = ({moduleId}) => {
    const [textEditorShow, setTextEditorShow] = useState(false)

    let admin = true

    const [content, setContent] = useState("")
    //const [parsedContent, setParsedContent] = useState({})
    const [showCancel, setShowCancel] = useState(false)

    const getContent = async (moduleId) => {
        try {
            const docRef = doc(db, `quizzes/sdg11t${moduleId}`)
            const docSnap = await getDoc(docRef)
    
            if (docSnap.exists()) {
                console.log((docSnap.data()).content)
                setContent((docSnap.data()).content)
            } else {
                console.log('Document does not exist')
            }
        } catch (e) {
            console.error('Error retrieving document: ', e)
        }
        
    }

    useEffect(() => {
        getContent(moduleId)
        console.log(content)
    }, [])

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

    const handleProcedureContentChange = (newContent) => {
        setContent(newContent)
        console.log("content---->", newContent);
        
    }

    const [buttonState, setButtonState] = useState('Edit')

    const adminContentWrite = async (newContent) => {
        //const db = getDatabase();
        //setContent(newContent)
        const docRef = doc(db, `quizzes/sdg11t${moduleId}`)

        console.log("trying to update")
        console.log("module id is: ", moduleId)

        try{
            console.log("doc reference is :  ", docRef)
            await updateDoc(docRef, { content: newContent })
            console.log("update successful")
        } catch (error){
            console.error("update unsuccessful")
        }
        
    }

    const handleClick = (newContent) => {
        console.log("NEW CONTENT", newContent)
        if(buttonState === 'Edit'){
            setShowCancel(true)
            setTextEditorShow(true)
            //block.content
            setButtonState('Save')
        } else {
            setTextEditorShow(false)
            setButtonState('Edit')
            if(newContent){
                console.log("new content is --->", newContent)
                adminContentWrite(sanitizeHtml(newContent))
            } else {
                console.log("NO NEW CONTENT")
            }
        }
        //open up the text editor here
    }

    const handleCancelClick = () => {
        setTextEditorShow(false)
        setButtonState('Edit')
    }

    

    return(
        <div>
            {textEditorShow === false ? (
                <div>
                    {content ? ReactHtmlParser(content) : null}

                    {/*{block.subheading ? <h3>{block.subheading}</h3> : null}
                    {block.body ? <p>{block.body}</p> : null}
                    {block.media ? <p>Image</p> : null}*/} {/** */}

                    </div>
                ) : 
                <div>
                    <ReactQuill
                        theme="snow"
                        modules={ modules }
                        formats={ formats }
                        value={ content }
                        onChange={handleProcedureContentChange}
                        style={{ height: "300px" }}
                    >
                    </ReactQuill>
    
                </div>
                
                }
                <br />
                <br />
                <br />
                <div>
                    {admin ? <Button onClick={ () => {handleClick(content)} } style={{marginRight: '10px'}}>{ buttonState }</Button> : null}
                    {(admin && showCancel) ? <Button onClick={ () => {handleCancelClick()} }>Cancel</Button> : null}
                </div>
                
                
                
                
                {/*<button onClick={ addBlock }>Add Block</button>*/}
            </div>
            
            
        )
    }
    
    export default EditableBlock
        
