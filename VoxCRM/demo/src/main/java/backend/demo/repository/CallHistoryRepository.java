package backend.demo.repository;
import backend.demo.entity.CallHistory;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CallHistoryRepository extends JpaRepository<CallHistory, Long> {}
