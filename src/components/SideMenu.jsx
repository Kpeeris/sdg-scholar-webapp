import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./SideMenu.css"
import { Button } from "@/components/ui/button"

function SideMenu({moduleTitle, moduleId}){

    const navigate = useNavigate();
    const contentPath = `/module/${moduleId}/content`;
    const quizPath = `/module/${moduleId}/quiz`;

    const isActive = (path) => location.pathname === path;

    return(
        <div className='side-menu'>
            <h2>SDG 11</h2>
            <h4>{moduleTitle}</h4>
            <button 
            className={isActive(contentPath) ? 'active' : ''}
            onClick={() => navigate(`/module/${moduleId}/content`)}>Content</button>
            <button 
            className={isActive(quizPath) ? 'active' : ''}
            onClick={() => navigate(`/module/${moduleId}/quiz`)}>Quiz</button>
        </div>
    )
}

export default SideMenu;