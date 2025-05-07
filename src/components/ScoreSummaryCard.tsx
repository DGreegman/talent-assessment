'use client';
import React, {useState} from 'react';
import { Info, Check, X } from 'lucide-react';

interface ScoreSummaryCardProps {
  score: number; // percentage
  title: string;
  description: string;
  onShortlist: () => void;
  onReject: () => void;
  onHire: () => void;
  onInfoClick?: () => void;
}

const ScoreSummaryCard: React.FC<ScoreSummaryCardProps> = ({
  score,
  title,
  description,
  onShortlist,
  onReject,
  onHire,
  onInfoClick
}) => {
  return (
    <div className="relative p-4 bg-white rounded-lg shadow-sm max-w-sm h-full">
      {/* Info icon */}
      <div className="flex justify-end items-start mb-2">
        <button 
          onClick={onInfoClick}
          className="text-teal-500 hover:text-teal-600"
        >
          <Info size={20} />
        </button>
      </div>
      
      {/* Score percentage */}
      <div className="mb-1">
        <span className="text-4xl font-bold text-gray-800">{score}%</span>
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
      
      {/* Description */}
      <p className="text-gray-500 text-sm mb-5">{description}</p>
      
      {/* Action buttons */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onShortlist}
            className="py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <Check size={16} className="text-green-500" />
            <span className="text-gray-700">Shortlist</span>
          </button>
          
          <button
            onClick={onReject}
            className="py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <X size={16} className="text-red-500" />
            <span className="text-gray-700">Reject</span>
          </button>
        </div>
        
        <button
          onClick={onHire}
          className="w-full py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600"
        >
          Hire Talent
        </button>
      </div>
    </div>
  );
};



export default function ScoreSummaryDemo() {
  const [action, setAction] = useState<string | null>(null);

  const handleShortlist = () => {
    setAction('');
  };

  const handleReject = () => {
    setAction('');
  };

  const handleHire = () => {
    setAction('');
  };

  const handleInfoClick = () => {
    alert('AI Score Information: This score is based on analysis of the candidate\'s video interview responses, communication skills, and relevance to job requirements.');
  };

  return (
    <div className="max-w-md mx-auto  p-4">
      <ScoreSummaryCard
        score={85}
        title="AI Video Score Summary"
        description="The presentation of talent is good. Check the breakdown summary of AI Video Score."
        onShortlist={handleShortlist}
        onReject={handleReject}
        onHire={handleHire}
        onInfoClick={handleInfoClick}
      />
      
      {action && (
        <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-md">
          {action}
        </div>
      )}
      
      {/* <div className="mt-8">
        <h3 className="font-medium text-lg mb-2">How to use this component:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Import the ScoreSummaryCard component</li>
          <li>Pass the required props (score, scoreNumber, title, description)</li>
          <li>Implement the handler functions for actions</li>
          <li>The component is fully responsive and adapts to container width</li>
        </ul>
      </div> */}
    </div>
  );
}

