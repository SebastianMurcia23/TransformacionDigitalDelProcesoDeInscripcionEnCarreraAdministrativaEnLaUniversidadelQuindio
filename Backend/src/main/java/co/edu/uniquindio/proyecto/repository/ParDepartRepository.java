package co.edu.uniquindio.proyecto.repository;

import co.edu.uniquindio.proyecto.model.ParDepart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ParDepartRepository extends JpaRepository<ParDepart,Integer> {
    @Query("SELECT d FROM ParDepart d WHERE d.pais.id_paises = :idPais")
    List<ParDepart> findByPaisId(@Param("idPais") Integer idPais);
}
