import { X, Bot, ChevronUp } from 'lucide-react';
import { useChatAssistant } from './useChatAssistant';
import ChatMessage from './ChatMessage';
import LoadingIndicator from './LoadingIndicator';
import ChatInput from './ChatInput';

const AIAssistantWrapper = () => {
  const {
    isOpen,
    isMinimized,
    inputMessage,
    messages,
    isLoading,
    messagesEndRef,
    toggleOpen,
    toggleMinimize,
    handleSendMessage,
    handleKeyPress,
    setInputMessage
  } = useChatAssistant();

  // If completely closed, just show the button
  if (!isOpen) {
    return (
      <button
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-yatri-blue shadow-lg hover:bg-yatri-blue-dark transition-all duration-300 animate-bounce"
        style={{ animationDuration: '3s', animationIterationCount: 3 }}
      >
        <Bot className="w-7 h-7 text-white" />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col ${
        isMinimized 
          ? 'w-auto h-auto' 
          : 'w-[90%] sm:w-[400px] h-[500px]'
      } rounded-2xl bg-white shadow-xl transition-all duration-300 overflow-hidden border border-gray-200`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-yatri-blue to-yatri-blue-dark text-white">
        <div className="flex items-center">
          <Bot className="w-5 h-5 mr-2" />
          <h3 className="font-medium">AI Travel Assistant</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMinimize}
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            {isMinimized ? <ChevronUp className="w-5 h-5" /> : <ChevronUp className="w-5 h-5 transform rotate-180" />}
          </button>
          <button
            onClick={toggleOpen}
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-4">
              {messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && <LoadingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <ChatInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};

export default AIAssistantWrapper;
