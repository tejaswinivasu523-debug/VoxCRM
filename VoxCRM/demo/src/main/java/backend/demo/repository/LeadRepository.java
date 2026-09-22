package backend.demo.repository;
import backend.demo.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
public interface LeadRepository extends JpaRepository<Lead, Long> {}
