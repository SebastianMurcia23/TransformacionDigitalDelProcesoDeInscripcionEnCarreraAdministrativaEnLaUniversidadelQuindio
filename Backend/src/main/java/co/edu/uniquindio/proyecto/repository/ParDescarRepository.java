package co.edu.uniquindio.proyecto.repository;

import co.edu.uniquindio.proyecto.model.ParDescar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ParDescarRepository extends JpaRepository<ParDescar,Integer> {
    @Query("SELECT P FROM ParDescar P ORDER BY P.idDescar ASC ")
    List<ParDescar>finAllOrderByDescarAsc();
}
