package backend.demo.controller;

import backend.demo.ai.AiService;
import backend.demo.dto.AiDtos;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/voice-agent")
@CrossOrigin
public class VoiceAgentController {
    private final AiService ai;
    public VoiceAgentController(AiService ai) { this.ai = ai; }

    @PostMapping("/analyze")
    public AiDtos.AnalyzeResponse analyze(@RequestBody AiDtos.AnalyzeRequest request) {
        return ai.analyze(request.transcript());
    }

    @PostMapping("/process-transcript")
    public AiDtos.AnalyzeResponse process(@RequestBody AiDtos.AnalyzeRequest request) {
        return ai.analyze(request.transcript());
    }
}
