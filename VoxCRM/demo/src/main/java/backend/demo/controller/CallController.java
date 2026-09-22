package backend.demo.controller;

import backend.demo.ai.AiService;
import backend.demo.dto.AiDtos;
import backend.demo.entity.CallHistory;
import backend.demo.service.CrmService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class CallController {
    private final CrmService crm;
    private final AiService ai;

    public CallController(CrmService crm, AiService ai) {
        this.crm = crm; this.ai = ai;
    }

    @GetMapping("/calls")
    public List<CallHistory> all() { return crm.calls(); }

    @PostMapping("/calls")
    public CallHistory save(@RequestBody CallHistory call) {
        if (call.getTranscript() != null) {
            AiDtos.AnalyzeResponse r = ai.analyze(call.getTranscript());
            call.setSummary(r.summary());
            call.setSentiment(r.sentiment());
            call.setIntent(r.intent());
            call.setFollowUp(r.followUp());
        }
        return crm.saveCall(call);
    }

    @PostMapping("/ai/analyze")
    public AiDtos.AnalyzeResponse analyze(@RequestBody AiDtos.AnalyzeRequest request) {
        return ai.analyze(request.transcript());
    }

    @PostMapping("/ai/followup")
    public String followup(@RequestBody AiDtos.AnalyzeRequest request) {
        return ai.analyze(request.transcript()).followUp();
    }
}
