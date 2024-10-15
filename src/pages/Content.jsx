import { useEffect, useState } from "react"
import SideMenu from "../components/SideMenu";
import {useParams} from "react-router-dom";
import EditableBlock from '../components/EditableBlock';

//import storage from '../../firebaseFiles/firebaseConfig.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Content = () => {
    const { moduleId } = useParams(); // Capture the module ID from the URL
    const [image1Url, setImage1Url] = useState("")
    const [image2Url, setImage2Url] = useState("")

    const storage = getStorage()
    
    let dbModuleId = moduleId
    if(moduleId === 'a'){
        dbModuleId = '8'
    } else if(moduleId === 'b'){
        dbModuleId = '9'
    } else if(moduleId === 'c'){
        dbModuleId = '10'
    }

    const retrieveImages = async () => {
        //const dbString = `/sdg11/target${dbModuleId}/GOAL_11_TARGET_11.1.png`
        const testDbString= "New Ardoch Logo (1) 1.png"
        //console.log(`trying to hit: ${dbString}`)
        console.log(`${isNaN(Number(dbModuleId))}`)
        try{
            getDownloadURL(ref(storage, `/sdg11/target${dbModuleId}/GOAL_11_TARGET_11.${isNaN(Number(moduleId)) ? moduleId.toUpperCase() : dbModuleId}.png`)).then((url) => {
                
                setImage1Url(url)
            })
            getDownloadURL(ref(storage, `sdg11/target${dbModuleId}/MC_Target_11.${isNaN(Number(moduleId)) ? moduleId.toUpperCase() : dbModuleId}.png`)).then((url) => {
                console.log(url)
                setImage2Url(url)
            })

        } catch (error) {
            console.error("Error retrieving images:", error);
        
            // Handling different error types
            if (error.code === 'storage/object-not-found') {
                console.error('The file does not exist at the specified path.');
            } else if (error.code === 'storage/unauthorized') {
                console.error('User does not have permission to access the file.');
            } else {
                console.error('Unknown error occurred:', error.message);
            }
        }
        //const storageRef1 = ref(storage, `/sdg11/target${dbModuleId}/GOAL_11_TARGET_11.1.png`)
        //const storageRef2 = ref(storage, `/sdg11/target${dbModuleId}/MC_Target_11.1.png`)

        
    }

    useEffect(() => {
        retrieveImages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        console.log(`url of image 1 is ${image1Url}. url of mage 2 is ${image2Url}`)
    }, [])

    // You can replace this with logic to dynamically retrieve module info
    const moduleTitle = `Target 11.${moduleId}`; 

    return (
        <div className="flex">
        <SideMenu moduleTitle={moduleTitle} moduleId={moduleId}/>
            <div className="ml-[250px] flex-1">
            <h2 style={{ fontWeight: "bold" }}>Content Page</h2>
            <div className="relative h-96 flex flex-cols">
                <img src={ image1Url } alt="Image 1" />
                <img src={ image2Url } alt="Image 2" />
            </div>
            <br/>
            <div>
                <EditableBlock moduleId={ dbModuleId } />
            </div>
            </div>
        
        </div>
    )
}

export default Content