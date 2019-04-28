import React from 'react';
import './FaceRecognition.css';
const FaceRecognition = ({imageUrl, box,faceStatus}) => {
  return(
    <div className='center ma'>
      <div className='absolute mt2'>
         <small id="status" className="f6 black-100 db  mt2">{faceStatus}</small>
        <img id='inputimage' src={imageUrl} alt='' width='300px' height='auto'/>
        <div className='bounding-box'style={{
          top:box.topRow,
          bottom:box.bottomRow,
          left:box.leftCol,
          right:box.rightCol
        }}></div>
      </div>
    </div>
  );
}


export default FaceRecognition;
