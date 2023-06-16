import React, { useState, useEffect } from 'react';


function GenericLoading({loadingSTST} : {loadingSTST :boolean}) {
    const [loadingscreen , setLoadingScreen] = useState(false)
  
  

  
    return loadingSTST ? (
      <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
    ) : (
      <></>
    );
  }

  export default GenericLoading;