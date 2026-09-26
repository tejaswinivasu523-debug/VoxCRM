package backend.demo.ai;

import backend.demo.dto.AiDtos;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    public AiDtos.AnalyzeResponse analyze(String transcript) {
        String text = transcript == null ? "" : transcript.trim();
        String lower = text.toLowerCase();

        String sentiment =
            containsAny(lower, "great", "excellent", "happy", "good", "satisfied")
            ? "POSITIVE"
            : containsAny(lower, "bad", "angry", "disappointed", "problem", "issue", "complaint")
            ? "NEGATIVE" : "NEUTRAL";

        String intent =
            containsAny(lower, "price", "cost", "pricing")
            ? "PRICING_INQUIRY"
            : containsAny(lower, "demo", "demonstration")
            ? "DEMO_REQUEST"
            : containsAny(lower, "buy", "purchase")
            ? "PURCHASE_INTENT"
            : containsAny(lower, "meeting", "appointment")
            ? "MEETING_REQUEST"
            : containsAny(lower, "complaint", "issue", "problem")
            ? "CUSTOMER_COMPLAINT" : "GENERAL_INQUIRY";

        String summary = text.isEmpty() ? "No transcript available"
                : text.length() <= 300 ? text : text.substring(0, 300) + "...";

        String followUp = switch (intent) {
            case "PRICING_INQUIRY" -> "Send pricing details to the customer.";
            case "DEMO_REQUEST" -> "Schedule a product demonstration.";
            case "PURCHASE_INTENT" -> "Contact the customer and proceed with the purchase discussion.";
            case "MEETING_REQUEST" -> "Schedule a meeting with the customer.";
            case "CUSTOMER_COMPLAINT" -> "Contact the customer and resolve the reported issue.";
            default -> "Follow up with the customer within 24 hours.";
        };

        return new AiDtos.AnalyzeResponse(summary, sentiment, intent, followUp);
    }

    private boolean containsAny(String text, String... words) {
        for (String w : words) if (text.contains(w)) return true;
        return false;
    }
}
