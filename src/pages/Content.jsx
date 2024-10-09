import { React } from 'react';
import SideMenu from "../components/SideMenu";
//import "../components/SideMenu.css";
import {useParams} from "react-router-dom";
import EditableBlock from '../components/EditableBlock';

const Content = () => {
    const { moduleId } = useParams(); // Capture the module ID from the URL
    
    let dbModuleId = moduleId
    if(moduleId === 'a'){
        dbModuleId = '8'
    } else if(moduleId === 'b'){
        dbModuleId = '9'
    } else if(moduleId === 'c'){
        dbModuleId = '10'
    }

    // You can replace this with logic to dynamically retrieve module info
    const moduleTitle = `Target 11.${moduleId}`; 

    return (
        <div className="main-content">
        <h2>Content Page</h2>
        <SideMenu moduleTitle={moduleTitle} moduleId={moduleId}/>

        <div>
            <EditableBlock moduleId={ dbModuleId } />
        </div>
        
    </div>
    )
}

export default Content