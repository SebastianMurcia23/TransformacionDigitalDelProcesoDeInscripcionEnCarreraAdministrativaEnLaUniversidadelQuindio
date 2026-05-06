package co.edu.uniquindio.proyecto.repository;

import co.edu.uniquindio.proyecto.model.ParCarsol;
import co.edu.uniquindio.proyecto.model.ParDencar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ParCarsolRepository extends JpaRepository<ParCarsol, Integer> {

    @Query("SELECT p FROM ParCarsol p ORDER BY p.idCarsol ASC")
    List<ParCarsol> finAllOrderByCarsolAsc();
    @Query("SELECT COUNT(c) FROM ParCarsol c WHERE c.parTipsol.idTipsol = :idTipsol")
    long contarPorTipsol(@Param("idTipsol") String idTipsol);
}