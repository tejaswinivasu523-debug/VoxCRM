package backend.demo.repository;
import backend.demo.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
public interface DealRepository extends JpaRepository<Deal, Long> {}
