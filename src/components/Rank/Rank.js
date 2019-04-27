import React from 'react';

const Rank = ({name, entries}) => {
  return(
    <div>
      <p className='f2 white'> {name},your rank is {entries}</p>
    </div>
  );
}


export default Rank;
