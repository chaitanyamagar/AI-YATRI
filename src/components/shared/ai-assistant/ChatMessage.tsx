
import { Bot, User } from 'lucide-react';
import { Message } from './types';

interface ChatMessageProps {
  message: Message;
}

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={`flex ${
        message.sender === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[80%] p-3 rounded-2xl ${
          message.sender === 'user'
            ? 'bg-yatri-blue text-white rounded-tr-none'
            : 'bg-white border border-gray-200 rounded-tl-none'
        }`}
      >
        <div className="flex items-center mb-1 space-x-2">
          {message.sender === 'ai' ? (
            <Bot className="w-4 h-4" />
          ) : (
            <User className="w-4 h-4" />
          )}
          <span className="text-xs opacity-75">
            {message.sender === 'ai' ? 'AI Assistant' : 'You'} • {formatTime(message.timestamp)}
          </span>
        </div>
        <p className="text-sm whitespace-pre-line">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
