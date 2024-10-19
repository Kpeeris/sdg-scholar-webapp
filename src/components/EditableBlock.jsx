import { useState,useEffect } from 'react';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Button } from "@/components/ui/button";

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import db from '../../firebaseFiles/firebaseConfig.js';

import parse from 'html-react-parser';
//import sanitizeHtml from 'sanitize-html';

const EditableBlock = ({moduleId}) => {
    const [textEditorShow, setTextEditorShow] = useState(false)

    let admin = true

    const [content, setContent] = useState("")

    const [showCancel, setShowCancel] = useState(false)

    const transform = (node) => {
        if (node.attribs && node.attribs.class) {
            if (node.attribs.class.includes('ql-align-center')) {
                node.attribs.style = {
                    ...node.attribs.style, 
                    textAlign: 'center' };
            }
            if (node.attribs.class.includes('ql-align-right')) {
                node.attribs.style = {
                    ...node.attribs.style, 
                    textAlign: 'right' };
            }
            if (node.attribs.class.includes('ql-size-small')){
                node.attribs.style = {
                    ...node.attribs.style,
                    fontSize: '0.75em'
                }
            }
            if (node.attribs.class.includes('ql-size-large')){
                node.attribs.style = {
                    ...node.attribs.style,
                    fontSize: '2em'
                }
            }
            if (node.attribs.class.includes('ql-size-huge')){
                node.attribs.style = {
                    ...node.attribs.style,
                    fontSize: '3em'
                }
            }
            if (node.attribs.class.includes('ql-indent-1')){
                node.attribs.style = {
                    ...node.attribs.style,
                    marginLeft: '3em'
                }
            }
            if (node.name === 'a' && node.attribs.href){
                //node.attribs.className = 'quill-link';
                node.attribs.style = {
                    ...node.attribs.style,
                    textDecoration: 'underline',
                    color: 'blue'
                }
            }
          node.attribs.className = node.attribs.class; // Convert class to className
          delete node.attribs.class; // Remove the old class attribute
        }
    }

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
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //text editor styling credit to https://medium.com/@aalam-info-solutions-llp/how-to-build-a-text-editor-in-react-js-d5c7fdb321ef
    var modules = {
        toolbar: [
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          //[ { list: "bullet" }],
          ["link", "image"],
          [
            
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
        const docRef = doc(db, `quizzes/sdg11t${moduleId}`)

        console.log("trying to update")
        console.log("module id is: ", moduleId)

        try{
            console.log("doc reference is :  ", docRef)
            await updateDoc(docRef, { content: newContent })
            console.log("update successful")
        } catch (e){
            console.error('Error retrieving document: ', e)
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
                adminContentWrite(newContent)
            } else {
                console.log("NO NEW CONTENT")
            }
        }
    }

    const handleCancelClick = () => {
        setTextEditorShow(false)
        setButtonState('Edit')
    }

    return(

        <div>
            {textEditorShow === false ? (
                <div>
                    {content ? parse(content, {
                        replace: (domNode) => {
                            transform(domNode); // Apply the transformation
                            return domNode; // Return the transformed node
                        }}) : null}
                </div>
                
                ) : 
                <div>
                    <ReactQuill
                        theme="snow"
                        modules={ modules }
                        formats={ formats }
                        value={ content }
                        onChange={handleProcedureContentChange}
                        style={{ height: "300px", maxWidth: "100%", overflowWrap: "break-word", wordWrap: "break-word" }}
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
            </div> 
        )
    }
    
export default EditableBlock
        
