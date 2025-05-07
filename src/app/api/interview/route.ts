import { NextResponse } from 'next/server';

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

export async function GET() {
  const data: InterviewData = {
    questions: [
      'Tell us about yourself?',
      'Why do you think you are good at sales?',
      'What is the biggest deal you have closed?',
      'Why the company chose this position for you?',
      'What the expectation in next 5 years?'
    ],
    scores: {
      overall: 85,
      professionalism: 80,
      businessAcumen: 90,
      opportunistic: 65,
      closingTechnique: 85,
    },
    messages: [
      { sender: 'Olivia', text: 'Good afternoon, Olivia! How are you feeling today?', time: '10:20' },
      { sender: 'You', text: "Good afternoon, Dr. Lopez! I'm good, looking forward for the opportunity!", time: '10:25' },
    ],
  };

  return NextResponse.json(data, { status: 200 });
}