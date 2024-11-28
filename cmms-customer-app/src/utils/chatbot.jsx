import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const SYSTEM_PROMPT = `You are a friendly and helpful customer service representative for a construction materials e-commerce website.
Your role is to assist customers with:
- Product recommendations and technical specifications
- Order status and delivery information
- Installation advice and best practices
- Store locations and product availability
- Pricing and promotional offers

Guidelines:
1. Be warm and professional in your tone
2. Keep responses concise and easy to understand
3. Use simple language, avoiding technical jargon unless necessary
4. Show empathy and understanding
5. Offer relevant follow-up suggestions
6. Always end with an invitation for more questions

If you're unsure about specific details:
1. Acknowledge the limitation
2. Provide general guidance
3. Suggest contacting the store directly for precise information

Respond in the same language as the user's message (Vietnamese or English).`;

export const generateResponse = async (message) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 150,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate response");
  }
};
