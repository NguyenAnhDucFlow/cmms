import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChatbot = create(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      clearMessages: () =>
        set({
          messages: [],
        }),
    }),
    {
      name: "chatbot-storage",
    }
  )
);
