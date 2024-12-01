package com.anhduc.backend.repository.httpclient;

import com.anhduc.backend.dto.request.OpenAIRequest;
import com.anhduc.backend.dto.response.OpenAIResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "openAIClient", url = "https://api.openai.com/v1/chat/completions")
public interface OpenAIClient {

    @PostMapping
    OpenAIResponse callOpenAI(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,
            @RequestBody OpenAIRequest request
    );
}
