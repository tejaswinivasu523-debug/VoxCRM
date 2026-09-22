package backend.demo.controller;

import backend.demo.entity.Customer;
import backend.demo.service.CrmService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class CustomerController {
    private final CrmService crm;
    public CustomerController(CrmService crm) { this.crm = crm; }

    @GetMapping("/customers")
    public List<Customer> all() { return crm.customers(); }

    @GetMapping("/customers/{id}")
    public Customer one(@PathVariable Long id) { return crm.customer(id); }

    @PostMapping("/customers")
    public Customer create(@RequestBody Customer c) { return crm.save(c); }

    @PutMapping("/customers/{id}")
    public Customer update(@PathVariable Long id, @RequestBody Customer c) {
        Customer old = crm.customer(id);
        c.setId(old.getId());
        return crm.save(c);
    }
}
