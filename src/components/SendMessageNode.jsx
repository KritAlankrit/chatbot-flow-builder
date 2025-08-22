import React from 'react';
import { Handle, Position } from 'reactflow';
import { BsChatTextFill } from "react-icons/bs";

const SendMessageNode = ({ data, selected }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden border ${
        selected ? 'border-2 border-indigo-600' : 'border-gray-200'
      }`}
    >
      <div className="bg-gray-100 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BsChatTextFill className="text-gray-500 text-sm" />
          <span className="text-xs font-semibold text-gray-700">Send Message</span>
        </div>
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-500 break-words line-clamp-3">
          {data.label}
        </p>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="w-2.5 h-2.5 bg-gray-500 rounded-full"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-2.5 h-2.5 bg-gray-500 rounded-full"
      />
    </div>
  );
};

export default SendMessageNode;