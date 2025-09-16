package co.edu.uniquindio.proyecto.repository;

import co.edu.uniquindio.proyecto.model.ParPaises;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ParPaisesRepository extends JpaRepository<ParPaises, Integer> {
}
