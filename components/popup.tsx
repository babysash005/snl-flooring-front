import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default function Popup({ message }: { message: string }) {
  const [popupmessage, setMessage] = useState('');
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    if (message !== "" && message !== null && message !== '') {
      setMessage(message);
      setPopup(true);
    } else {
      setPopup(false);
    }
  }, [message]);

  const toggleModal = () => {
    setMessage("");
    setPopup(!popup);
  };

  return (
    <>
      {/* Your other JSX */}
      {popup === true && (
    <div className="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-900 opacity-75" />
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
      <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div
  className="mb-4 rounded-lg bg-success-100 px-6 py-5 text-base text-success-700"
  role="alert">
 {popupmessage}
</div>
        
        </div>
        <div className="bg-gray-200 px-4 py-3 text-right">
          <button type="button" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2" onClick={toggleModal}><i className="fas fa-times"></i> Close</button>
        </div>
      </div>
    </div>
  </div>
  
      )}
    </>
  );
}
