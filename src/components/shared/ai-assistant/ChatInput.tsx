
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
}

const ChatInput = ({ 
  inputMessage, 
  setInputMessage, 
  handleSendMessage, 
  handleKeyPress,
  isLoading 
}: ChatInputProps) => {
  return (
    <div className="p-3 border-t bg-white">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about Maharashtra travel..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-yatri-blue focus:border-transparent"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={inputMessage.trim() === '' || isLoading}
          className={`p-2 rounded-full ${
            inputMessage.trim() === '' || isLoading
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-yatri-blue text-white hover:bg-yatri-blue-dark'
          } transition-colors`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-2 text-xs text-center text-gray-500">
        <span>Powered by AI Yatri's intelligent assistant</span>
      </div>
    </div>
  );
};

export default ChatInput;
