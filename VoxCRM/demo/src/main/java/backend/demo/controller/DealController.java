package backend.demo.controller;

import backend.demo.entity.Deal;
import backend.demo.service.CrmService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/deals")
@CrossOrigin
public class DealController {
    private final CrmService crm;
    public DealController(CrmService crm) { this.crm = crm; }

    @GetMapping
    public List<Deal> all() { return crm.deals(); }

    @PostMapping
    public Deal create(@RequestBody Deal d) { return crm.save(d); }

    @PutMapping("/{id}")
    public Deal update(@PathVariable Long id, @RequestBody Deal d) {
        d.setId(id);
        return crm.save(d);
    }
}
