import React from 'react';
import loadVideo from '../assets/loading.mp4';

const Loading = () => {
  return (
    <div className='flex justify-center align-center'>
      <video src={loadVideo} autoPlay loop muted className='w-60'></video>
    </div>
  );
};

export default Loading;
