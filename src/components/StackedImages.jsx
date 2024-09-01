import React from 'react'
import { images, imagesLocked } from './images'
import ImageComponent from './ImageComponent'

function StackedImages(){
    const Empty_city = images['Empty_city']

    return (
        <div style={{position:'relative', width: '100%', height: '100vh', overflow: 'hidden', margin: '0', padding: '0'}}>
            
            {/*Empty city scape/outer image*/}
            <img 
                src={Empty_city}
                alt={'Empty_city'}
                style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', paddingTop: '36px'}}
            />

            {/*buildings within the city*/}
            <ImageComponent imageName="Bank" top='35.5%' left='-2.5%' width='27%' height='28%' target='0'/>
            <ImageComponent imageName="Bridge" top='52%' left='60.5%' width='32%' height='32%' target='0'/>
            <ImageComponent imageName="Park" top='5%' left='59.7%' width='48%' height='48%' target='0'/>
            <ImageComponent imageName="Hospital" top='2%' left='34%' width='35%' height='38%' target='0'/>
            <ImageComponent imageName="Fire_station_" top='50%' left='11.7%' width='34%' height='36%' target='0'/>
            <ImageComponent imageName="Houses" top='67.7%' left='39%' width='35%' height='37%' target='0'/>
            <ImageComponent imageName="Museum" top='24%' left='55%' width='31%' height='33%' target='0'/>
            
            <ImageComponent imageName="Recycle_Plant" top='67.5%' left='-3%' width='32%' height='32%' target='0'/>
            <ImageComponent imageName="Town_Hall" top='15.5%' left='16%' width='32%' height='34%' target='0'/>
            <ImageComponent imageName="Train_station_" top='-2%' left='0%' width='31%' height='42%' target='1'/>
            
        </div>
    )
}

export default StackedImages