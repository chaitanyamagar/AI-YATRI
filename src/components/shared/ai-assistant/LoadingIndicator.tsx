
import { Bot } from 'lucide-react';
import { formatTime } from './ChatMessage';

const LoadingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] p-3 rounded-2xl bg-white border border-gray-200 rounded-tl-none">
        <div className="flex items-center mb-1 space-x-2">
          <Bot className="w-4 h-4" />
          <span className="text-xs opacity-75">
            AI Assistant • {formatTime(new Date())}
          </span>
        </div>
        <div className="flex space-x-2 py-2">
          <div className="w-2 h-2 bg-yatri-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-yatri-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          <div className="w-2 h-2 bg-yatri-blue rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
