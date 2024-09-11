import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./SideMenu.css"

function SideMenu({moduleTitle, moduleId}){

    const navigate = useNavigate();

    return(
        <div className='side-menu'>
            <h2>SDG 11</h2>
            <h3>{moduleTitle}</h3>
            <button onClick={() => navigate(`/module/${moduleId}/content`)}>Content</button>
            <button onClick={() => navigate(`/module/${moduleId}/quiz`)}>Quiz</button>
        </div>
    )
}

export default SideMenu;