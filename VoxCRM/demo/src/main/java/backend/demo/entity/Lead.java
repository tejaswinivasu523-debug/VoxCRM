package backend.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "leads")
public class Lead {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String source;
    private String status;
    private Integer score = 0;

    public Lead() {}

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getSource() { return source; }
    public String getStatus() { return status; }
    public Integer getScore() { return score; }

    public void setId(Long v) { id = v; }
    public void setName(String v) { name = v; }
    public void setEmail(String v) { email = v; }
    public void setPhone(String v) { phone = v; }
    public void setSource(String v) { source = v; }
    public void setStatus(String v) { status = v; }
    public void setScore(Integer v) { score = v; }
}
