package backend.demo.service;

import backend.demo.entity.*;
import backend.demo.repository.*;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CrmService {
    private final CustomerRepository customers;
    private final LeadRepository leads;
    private final DealRepository deals;
    private final CallHistoryRepository calls;

    public CrmService(CustomerRepository customers, LeadRepository leads,
                      DealRepository deals, CallHistoryRepository calls) {
        this.customers = customers; this.leads = leads;
        this.deals = deals; this.calls = calls;
    }

    public List<Customer> customers() { return customers.findAll(); }
    public Customer customer(Long id) { return customers.findById(id).orElseThrow(); }
    public Customer save(Customer c) { return customers.save(c); }

    public List<Lead> leads() { return leads.findAll(); }
    public Lead save(Lead l) { return leads.save(l); }

    public List<Deal> deals() { return deals.findAll(); }
    public Deal save(Deal d) { return deals.save(d); }

    public List<CallHistory> calls() { return calls.findAll(); }

    public CallHistory saveCall(CallHistory c) {
        if (c.getCallDate() == null) c.setCallDate(LocalDateTime.now());
        return calls.save(c);
    }
}
