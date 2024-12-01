package com.anhduc.backend.controller;

import com.anhduc.backend.dto.request.ChatRequest;
import com.anhduc.backend.service.OpenAIService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatController {
    OpenAIService openAIService;

    @PostMapping
    public String chatWithOpenAI(@RequestBody ChatRequest chatRequest) {
        return openAIService.generateResponse(chatRequest.getMessage());
    }

}