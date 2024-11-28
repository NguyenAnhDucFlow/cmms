import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <ReactMarkdown className="prose prose-sm">
          {message.content}
        </ReactMarkdown>
        <div
          className={`text-xs mt-1 ${
            isUser ? "text-blue-200" : "text-gray-500"
          }`}
        >
          {format(new Date(message.timestamp), "HH:mm")}
        </div>
      </div>
    </div>
  );
}
