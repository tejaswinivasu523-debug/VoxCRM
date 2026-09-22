package backend.demo.dto;

public class AiDtos {
    public record AnalyzeRequest(String transcript) {}
    public record AnalyzeResponse(String summary, String sentiment, String intent, String followUp) {}
}
