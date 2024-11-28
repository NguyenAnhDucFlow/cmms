import { Fragment, useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useChatbot } from "../../stores/useChatbot";
import { generateResponse } from "../../utils/chatbot";

const GREETING_MESSAGE = {
  role: "assistant",
  content:
    "👋 Hi there! I'm here to help with any questions about our products, orders, or services. How can I assist you today?",
  timestamp: new Date(),
};

export default function ChatWindow({ isOpen, onClose }) {
  const { messages, addMessage } = useChatbot();
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage(GREETING_MESSAGE);
    }
  }, [isOpen, messages.length, addMessage]);

  const handleSendMessage = async (content) => {
    if (isTyping) return;

    // Add user message
    addMessage({
      role: "user",
      content,
      timestamp: new Date(),
    });

    setIsTyping(true);

    try {
      const response = await generateResponse(content);

      // Add bot response
      addMessage({
        role: "assistant",
        content: response,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Chat error:", error);
      addMessage({
        role: "assistant",
        content:
          "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or contact our support team for immediate assistance.",
        timestamp: new Date(),
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white">
                  {/* Header */}
                  <div className="border-b border-gray-200 px-4 py-3 sm:px-6">
                    <div className="flex items-center justify-between">
                      <Dialog.Title className="text-lg font-semibold text-gray-900">
                        Customer Support
                      </Dialog.Title>
                      <button
                        onClick={onClose}
                        className="rounded-md text-gray-400 hover:text-gray-500"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="h-96 overflow-y-auto px-4 py-6 sm:px-6">
                    {messages.map((message, index) => (
                      <ChatMessage key={index} message={message} />
                    ))}
                    {isTyping && (
                      <div className="flex items-center space-x-2 text-gray-500">
                        <span className="animate-bounce">•</span>
                        <span className="animate-bounce delay-100">•</span>
                        <span className="animate-bounce delay-200">•</span>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input area */}
                  <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
                    <ChatInput onSend={handleSendMessage} isTyping={isTyping} />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
