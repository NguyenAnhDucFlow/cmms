import { useState } from "react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import ChatWindow from "./ChatWindow";

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        aria-label="Open chat"
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6" />
      </button>

      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
