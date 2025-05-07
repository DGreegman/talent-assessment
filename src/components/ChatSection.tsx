import React, { useState } from 'react';
import { FaPaperclip, FaSmile } from 'react-icons/fa';

interface Message {
  sender: string;
  text: string;
  time: string;
}

interface ChatSectionProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatSection: React.FC<ChatSectionProps> = ({ messages, setMessages }) => {
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      sender: 'You',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
    setInput('');

    // Call the Next.js API route to interact with Gemini
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate response');
      }

      const botMessage: Message = {
        sender: 'Olivia',
        text: data.response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error with Gemini API:', error);
      const errorMessage: Message = {
        sender: 'Olivia',
        text: 'Sorry, I encountered an error. Please try again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-[15px]">
      <div className="p-4 border-b border-gray-200 flex items-center mt-5">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
        <div>
          <p className="font-semibold text-black">Olivia Wild</p>
          <p className="text-sm text-gray-500">Female • 81 y.o.</p>
        </div>

      </div>
      <div className="flex justify-evenly mt-5 space-x-2">
          <button className="text-gray-600">Record</button>
          <button className="text-gray-600">Chat</button>
          <button className="text-gray-600">Notes</button>
          <button className="text-gray-600">Docs</button>
        </div>
      <div className="flex-1 mt-5 p-4 overflow-y-auto">
        <p className="text-sm text-gray-500 mb-2">June 1</p>
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.sender === 'You' ? 'text-right' : ''}`}>
            <div
              className={`inline-block py-5 px-3 rounded-lg ${
                msg.sender === 'You' ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              {
                msg ? <p className="text-sm text-black">{msg.text}</p>: 'Loading....'
              }
            </div>
            <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
          </div>
        ))}
        {/* <p className="text-sm text-gray-500 mb-2">Today</p>
        <div className="mb-4">
          <div className="inline-block py-5 px-3  rounded-lg bg-gray-100">
            <p className="text-sm text-black">Hey, Olivia! Are you ready for a call?</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">12:59</p>
        </div>
        <div className="mb-4 text-right">
          <div className="inline-block py-5 px-3  rounded-lg bg-blue-100">
            <p className="text-sm text-black">Hello, Dr. Lopez, I’m 5 minutes late, sorry!</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">13:02</p>
        </div>
        <div className="mb-4">
          <div className="inline-block py-5 px-3  rounded-lg bg-gray-100">
            <p className="text-sm text-black">No worries, take your time 😊</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">13:03</p>
        </div>
        <div className="text-right text-blue-500 text-sm">Video call started</div> */}

        <div className="p-4 border-t border-gray-200 flex items-center mt-10">
        <FaPaperclip className="text-gray-500 mr-2" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Your prompt, Enter to send..."
          
          className="flex-1 p-2 border rounded-lg focus:outline-none text-black"
        />
        <FaSmile className="text-gray-500 ml-2" />
      </div>
      </div>
      
    </div>
  );
};

export default ChatSection;