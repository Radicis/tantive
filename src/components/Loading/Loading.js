import React from 'react';
import loading from '../../assets/images/loading.gif';

function Loading() {
  return (
    <div className="text-mid text-xl font-semi-bol opacity-50 w-full h-full flex justify-center items-center flex flex-col pointer-events-none">
      <img width="50%" src={loading} />
    </div>
  );
}

export default Loading;
