package backend.demo.controller;

import backend.demo.service.CrmService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class DashboardController {
    private final CrmService crm;
    public DashboardController(CrmService crm) { this.crm = crm; }

    @GetMapping("/dashboard/summary")
    public Map<String,Object> summary() {
        double revenue = crm.deals().stream()
                .filter(d -> d.getValue() != null)
                .mapToDouble(d -> d.getValue()).sum();

        return Map.of(
            "totalCustomers", crm.customers().size(),
            "totalLeads", crm.leads().size(),
            "totalDeals", crm.deals().size(),
            "totalCalls", crm.calls().size(),
            "pipelineValue", revenue
        );
    }

    @GetMapping("/analytics/dashboard")
    public Map<String,Object> analytics() {
        double revenue = crm.deals().stream()
                .filter(d -> d.getValue() != null)
                .mapToDouble(d -> d.getValue()).sum();

        return Map.of(
            "totalRevenue", revenue,
            "conversionRate", crm.leads().isEmpty() ? 0 :
                    (double) crm.deals().size() / crm.leads().size() * 100,
            "customers", crm.customers().size(),
            "leads", crm.leads().size(),
            "deals", crm.deals().size()
        );
    }
}
