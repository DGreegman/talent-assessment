import React from 'react';

const VideoSection: React.FC = () => {
  return (
    <div className="flex-1 p-4 bg-gray-200 relative border-2  h-fit">
      <div className="w-full  bg-gray-300 h-[80%] rounded-lg flex items-center justify-center">
        <p className="text-gray-500">[Candidate Video Placeholder]</p>
      </div>
      <div className="absolute top-6 right-6 w-24 h-24 bg-gray-300 rounded-lg flex items-center justify-center">
        <p className="text-gray-500 text-xs">[Interviewer Video]</p>
      </div>
      {/* <div className="absolute bottom-6 left-6 bg-white p-2 rounded-lg shadow">
        <p className="text-sm">I’m extremely ambitious person who motivates me in my professional life.</p>
      </div> */}
      {/* <div className="absolute bottom-6 right-6 flex items-center space-x-2">
        <p className="text-sm">01:00/05:00</p>
        <button className="p-2 bg-gray-300 rounded-full">
          <span className="text-gray-600">🔊</span>
        </button>
      </div> */}
    </div>
  );
};

export default VideoSection;