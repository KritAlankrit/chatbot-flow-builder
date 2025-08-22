import React from 'react';

const Notification = ({ message, type, onClose }) => {
  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
  const textColor = 'text-white';
  const borderColor = isSuccess ? 'border-green-700' : 'border-red-700';

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg flex items-center justify-between ${bgColor} ${textColor} border ${borderColor}`}
      style={{ minWidth: '250px' }}
    >
      <span className="font-semibold">{message}</span>
      <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-all">
        &times;
      </button>
    </div>
  );
};

export default Notification;