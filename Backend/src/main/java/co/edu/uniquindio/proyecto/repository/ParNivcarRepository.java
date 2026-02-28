package co.edu.uniquindio.proyecto.repository;

import co.edu.uniquindio.proyecto.model.ParNivcar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ParNivcarRepository extends JpaRepository<ParNivcar,Integer> {

    @Query("SELECT p FROM ParNivcar p ORDER BY p.estNivcar ASC")
    List<ParNivcar> findAllOrderByNivcarAsc();
}
