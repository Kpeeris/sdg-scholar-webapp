import React, { useState,useEffect } from 'react'
import { images, imagesLocked } from './images'
//import QuizStartPopup from './QuizStartPopup'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css'

function ImageComponent({ imageName, top, left, width, height, target}) {
    const sourceLocked = imagesLocked[imageName]
    const sourceUnlocked = images[imageName]
    const [source, setSource] = useState(sourceLocked)
    //const [popUpOpen, setPopUpOpen] = useState(false)
    const [show, setShow] = useState(false)
    //let taskNum = 'x'
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

    useEffect(() => {
        //we're gonna do an API call to the database here boys
        //and define taskNum and the task description. For now,
        //shall add it to the component params though
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
                <img 
                    src={source} 
                    alt={imageName} 
                    style={{position: 'absolute', width:width, height:"auto"}}
                />
                
                <p className="font-bold">
                    Click below when you're ready to {moduleDone ? "redo" : "start"} the quiz
                </p>
                <button className="buttonStart" style={{"color": "white"}}>Start</button>
            </Modal.Body>

        </Modal>

        </>
    )

}

export default ImageComponent