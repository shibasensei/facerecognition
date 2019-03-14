import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onChangeInput, onSubmiteDetect}) => {
  return (
    <div>
      <p className='f3'> Upload picture to detect face(s). </p>
      <div className='center'>
        <div className='center form pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type='text' onChange={onChangeInput}/>
          <button className='w-30 grow f4 ph3 pv2 dib white bg-light-red' onClick={onSubmiteDetect}>Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
