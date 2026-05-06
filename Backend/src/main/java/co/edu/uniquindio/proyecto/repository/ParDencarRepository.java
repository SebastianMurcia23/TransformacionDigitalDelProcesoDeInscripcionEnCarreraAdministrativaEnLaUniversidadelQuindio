package co.edu.uniquindio.proyecto.repository;

import co.edu.uniquindio.proyecto.model.ParDencar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ParDencarRepository extends JpaRepository<ParDencar,Integer>{

    @Query("SELECT p FROM ParDencar p ORDER BY p.idDencar ASC")
    List<ParDencar> finAllOrderByDencarAsc();
}
