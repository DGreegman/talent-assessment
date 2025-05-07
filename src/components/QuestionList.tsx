import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  completed?: boolean;
}

interface QuestionListProps {
  questions: Question[];
  currentQuestionId: number;
  onQuestionChange: (questionId: number) => void;
  onInfoClick?: () => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  currentQuestionId,
  onQuestionChange,
  onInfoClick
}) => {
  return (
    <div className="relative p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-800">Question List</h2>
        <div className="flex items-center gap-2">
          {onInfoClick && (
            <button 
              onClick={onInfoClick}
              className="text-teal-500 hover:text-teal-600"
            >
              <Info size={20} />
            </button>
          )}
        </div>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-3 top-0 w-0.5 h-full bg-gray-200"></div>
        
        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, index) => {
            const isActive = question.id === currentQuestionId;
            const isPast = question.id < currentQuestionId;
            const isFuture = question.id > currentQuestionId;
            
            return (
              <div 
                key={question.id}
                className={`relative flex items-start cursor-pointer ${
                  isFuture ? 'opacity-50' : ''
                }`}
                onClick={() => onQuestionChange(question.id)}
              >
                {/* Circle number */}
                <div 
                  className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 z-10 ${
                    isActive 
                      ? 'bg-teal-500 text-white' 
                      : isPast 
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  <span className="text-xs font-medium">{question.id}</span>
                </div>
                
                {/* Question text */}
                <span className={`text-sm ${
                  isActive ? 'font-medium text-gray-900' : 
                  isPast ? 'text-gray-700' : 'text-gray-400'
                }`}>
                  {question.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const questions = [
  { id: 1, text: 'Tell us about yourself?' },
  { id: 2, text: 'Why do you think you are good at sales?' },
  { id: 3, text: 'What is the biggest deal you have closed?' },
  { id: 4, text: 'Why you choose this company?' },
  { id: 5, text: 'What your expectation in this job?' },
];

export default function QuestionListDemo() {
  const [currentQuestionId, setCurrentQuestionId] = useState(3);

  const handleQuestionChange = (questionId: number) => {
    setCurrentQuestionId(questionId);
  };

  const handleInfoClick = () => {
    alert('Additional information about this questionnaire');
  };

  return (
    <div className="max-w-md mx-auto">
      <QuestionList
        questions={questions}
        currentQuestionId={currentQuestionId}
        onQuestionChange={handleQuestionChange}
        onInfoClick={handleInfoClick}
      />
    </div>
  );
}