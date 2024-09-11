import React, { useState,useEffect } from 'react'
import { images, imagesLocked } from './buildingImages'
//import QuizStartPopup from './QuizStartPopup'
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';

function ImageComponent({ imageName, top, left, width, height, target}) {
    const sourceLocked = imagesLocked[imageName]
    const sourceUnlocked = images[imageName]

    const [source, setSource] = useState(sourceLocked)

    const navigate = useNavigate();

    const [show, setShow] = useState(false)
    //outsource this logic to a different component and delete this line; 
    //module done should decided on the actual quiz page not this one boys
    let moduleDone = false 

    const handleClose = () => {
        setShow(false)
    }
    const handleShow =() => {
        setShow(true)
    }

    const decideSource = (source, moduleDone, sourceLocked, sourceUnlocked) => {
        //moduleDone flag will be set when the module has been finished
        if(source === sourceLocked){
            if(show === true){
                return sourceUnlocked
            } else {
                if(moduleDone){
                    return sourceUnlocked
                }
                return sourceLocked
            }
        }
        return sourceUnlocked
    }

    const handleClick = () => {
        
        setSource(decideSource(source, moduleDone, sourceLocked, sourceUnlocked))
        handleShow()
        
    }

    //
    useEffect(() => {
        //we're gonna do an API call to the database here boys
        //and define taskNum and the task description. For now,
        //shall add it to the component params though\

    }, [show])

    return(
        <>
        <div className="container">
            <button className="buttonStartSmall">Start</button>
            <img 
            src={source} 
            alt={imageName} 
            style={{position: 'absolute', top: top, left: left, width:width, height:"auto"}} 
            onClick={handleClick}
            />
        </div>
        
        <Modal 
            show={show}
            onHide={handleClose}
            centered
            //scrollable
            size='lm'
        >
            <Modal.Title>
                <h3 className="p-5 text-center fw-bold">Target 11.{target} </h3>
            </Modal.Title>

            <Modal.Body className="custom-modal-body">
                <p className="font-bold">
                    Click below when you're ready to {moduleDone ? "redo" : "start"} the quiz
                </p>
                    <button className="buttonStart" 
                    style={{"color": "white"}}
                    onClick={() => navigate(`/module/${target}/content`)}>Start</button>
                {/* kp - added onClick to redirect to quiz content */}
            </Modal.Body>

        </Modal>

        </>
    )

}

export default ImageComponent