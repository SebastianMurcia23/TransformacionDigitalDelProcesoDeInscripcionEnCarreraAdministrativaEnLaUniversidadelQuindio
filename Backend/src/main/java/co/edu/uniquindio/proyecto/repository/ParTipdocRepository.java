package co.edu.uniquindio.proyecto.repository;

import co.edu.uniquindio.proyecto.model.ParTipdoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ParTipdocRepository extends JpaRepository<ParTipdoc,Integer> {
    @Query("SELECT p FROM ParTipdoc p ORDER BY p.id_tipdoc ASC")
    List<ParTipdoc> findAllOrderByIdTipdocAsc();
}
