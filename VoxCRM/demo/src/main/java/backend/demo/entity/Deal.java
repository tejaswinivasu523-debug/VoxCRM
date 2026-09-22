package backend.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "deals")
public class Deal {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(name = "deal_value")  
    private Double value;    
    private String stage;
    private Long leadId;
    private String expectedCloseDate;

    public Deal() {}

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public Double getValue() { return value; }
    public String getStage() { return stage; }
    public Long getLeadId() { return leadId; }
    public String getExpectedCloseDate() { return expectedCloseDate; }

    public void setId(Long v) { id = v; }
    public void setTitle(String v) { title = v; }
    public void setValue(Double v) { value = v; }
    public void setStage(String v) { stage = v; }
    public void setLeadId(Long v) { leadId = v; }
    public void setExpectedCloseDate(String v) { expectedCloseDate = v; }
}
