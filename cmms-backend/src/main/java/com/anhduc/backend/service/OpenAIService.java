package com.anhduc.backend.service;

import com.anhduc.backend.dto.request.OpenAIRequest;
import com.anhduc.backend.dto.response.OpenAIResponse;
import com.anhduc.backend.repository.httpclient.OpenAIClient;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OpenAIService {

    private final OpenAIClient openAIClient;

    @Value("${openai.api.key}")
    String apiKey;

    public String generateResponse(String userMessage) {
        // Tạo request
        OpenAIRequest request = new OpenAIRequest(
                "gpt-3.5-turbo",
                0.7,
                150,
                List.of(
                        new OpenAIRequest.Message("system", getSystemPrompt()),
                        new OpenAIRequest.Message("user", userMessage)
                )
        );

        // Gọi FeignClient
        OpenAIResponse response = openAIClient.callOpenAI("Bearer " + apiKey, request);

        // Trích xuất kết quả
        return response.getChoices().get(0).getMessage().getContent();
    }

    private String getSystemPrompt() {
        return """
        You are Nguyễn Anh Đức's chatbot, designed to assist customers in finding suitable construction materials for their projects.
        Your primary purpose is to demonstrate functionality as part of a job application.

        Your role includes:
        - Helping customers choose products tailored to their construction needs.
        - Providing basic product recommendations and availability details.
        - Assisting with general inquiries related to construction materials.

        Guidelines:
        1. Maintain a warm, friendly, and professional tone.
        2. Keep responses concise and clear for easy understanding.
        3. Use simple, jargon-free language unless necessary.
        4. Show empathy and strive to understand customer needs.
        5. Suggest relevant next steps to guide the customer.
        6. End responses with an invitation for further questions.

        If specific details are unavailable:
        - Acknowledge the limitation.
        - Offer general advice.
        - Recommend reaching out to a store for more precise information.

        Respond in the same language as the user's input (Vietnamese or English).
    """;
    }

}
