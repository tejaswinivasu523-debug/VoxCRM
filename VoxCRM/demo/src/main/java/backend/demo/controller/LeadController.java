package backend.demo.controller;

import backend.demo.entity.Lead;
import backend.demo.service.CrmService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin
public class LeadController {
    private final CrmService crm;
    public LeadController(CrmService crm) { this.crm = crm; }

    @GetMapping
    public List<Lead> all() { return crm.leads(); }

    @PostMapping
    public Lead create(@RequestBody Lead l) { return crm.save(l); }

    @GetMapping("/stats")
    public Map<String,Object> stats() {
        List<Lead> list = crm.leads();
        long hot = list.stream().filter(l -> l.getScore() != null && l.getScore() >= 70).count();
        return Map.of("total", list.size(), "hot", hot, "qualified", list.stream()
                .filter(l -> "QUALIFIED".equalsIgnoreCase(l.getStatus())).count());
    }
}
