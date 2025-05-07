'use client'
import React, { useState, useEffect } from 'react';
import AIScore from '@/components/AIScore';
import ChatSection from '@/components/ChatSection';
import Image from 'next/image';
import QuestionListDemo from '@/components/QuestionList';
import ScoreSummaryDemo from '@/components/ScoreSummaryCard';

interface InterviewData {
  questions: string[];
  scores: {
    overall: number;
    professionalism: number;
    businessAcumen: number;
    opportunistic: number;
    closingTechnique: number;
  };
  messages: { sender: string; text: string; time: string }[];
}

export default function Home() {
  const [data, setData] = useState<InterviewData | null>(null);
  const [messages, setMessages] = useState<{ sender: string; text: string; time: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/interview');
        const result: InterviewData = await response.json();
        setData(result);
        setMessages(result.messages);
      } catch (error) {
        console.error('Error fetching interview data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div className="flex h-screen  bg-gray-100 items-center justify-center">Loading...</div>;
  }

  return (

    <div className='flex h-full bg-gray-100'>
        <div className='flex mt-3 w-full px-2 gap-[2%]  '>
                  <div className='w-[80%] flex flex-col gap-[26%] bg-gray-200 py-3 rounded-[20px] px-4 mx-auto h-full'> 
                       <div className='relative h-[45%] w-full'>
                         <Image src={'/call.jpg'} width={1400} height={10} alt='on a call' className='rounded-lg  '/>
                         <Image src={'/call.jpg'} width={150} height={10} alt='on a call' className='rounded-lg absolute top-10 right-40 '/>
                       </div>

                    <div className='flex justify-between gap-[7%] px-3 items-center h-full  '>
                        <div className='w-[30%]'>
                          <QuestionListDemo  />
                        </div>
                        <div className='flex w-2/3  items-center'>
                          <div className=''>
                            <ScoreSummaryDemo />
                          </div>
                          <div className='w-[50%] '>
                            <AIScore scores={data.scores} />
                          </div>
                        </div>
                    </div>
                  </div>
              <div className="w-[25%] flex flex-col  h-fit bg-gray-100 overflow-y-auto">
                  <ChatSection messages={messages} setMessages={setMessages} />
              </div>
        </div>
    </div>
  );
}