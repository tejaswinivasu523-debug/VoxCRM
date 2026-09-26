package backend.demo.controller;

import backend.demo.ai.AiService;
import backend.demo.dto.AiDtos;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;
import java.util.Map;

@Component
public class VoiceWebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final AiService aiService = new AiService();

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        JsonNode request = objectMapper.readTree(message.getPayload());

        String text = request.has("text")
                ? request.get("text").asText()
                : "";

        AiDtos.AnalyzeResponse analysis = aiService.analyze(text);

        Map<String, Object> response = new HashMap<>();

        response.put("speaker", "customer");
        response.put("text", text);
        response.put("time", System.currentTimeMillis());
        response.put("summary", analysis.summary());
        response.put("sentiment", analysis.sentiment());
        response.put("intent", analysis.intent());
        response.put("followUp", analysis.followUp());

        String jsonResponse = objectMapper.writeValueAsString(response);

        session.sendMessage(new TextMessage(jsonResponse));
    }
}