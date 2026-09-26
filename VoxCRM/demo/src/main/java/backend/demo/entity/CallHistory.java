package backend.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "call_history")
public class CallHistory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long customerId;
    private String phoneNumber;

    @Lob
    private String transcript;

    private String sentiment;
    private String intent;

    @Lob
    private String summary;

    @Lob
    private String followUp;

    private LocalDateTime callDate;

    public CallHistory() {}

    public Long getId() { return id; }
    public Long getCustomerId() { return customerId; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getTranscript() { return transcript; }
    public String getSentiment() { return sentiment; }
    public String getIntent() { return intent; }
    public String getSummary() { return summary; }
    public String getFollowUp() { return followUp; }
    public LocalDateTime getCallDate() { return callDate; }

    public void setId(Long v) { id = v; }
    public void setCustomerId(Long v) { customerId = v; }
    public void setPhoneNumber(String v) { phoneNumber = v; }
    public void setTranscript(String v) { transcript = v; }
    public void setSentiment(String v) { sentiment = v; }
    public void setIntent(String v) { intent = v; }
    public void setSummary(String v) { summary = v; }
    public void setFollowUp(String v) { followUp = v; }
    public void setCallDate(LocalDateTime v) { callDate = v; }
}
