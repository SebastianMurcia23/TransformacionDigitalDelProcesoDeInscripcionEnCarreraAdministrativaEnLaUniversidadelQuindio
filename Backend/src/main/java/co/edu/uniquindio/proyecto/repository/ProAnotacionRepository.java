package co.edu.uniquindio.proyecto.repository;

import co.edu.uniquindio.proyecto.model.ProAnotacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProAnotacionRepository extends JpaRepository<ProAnotacion, Integer> {

    @Query("SELECT a FROM ProAnotacion a WHERE a.funcio.id_funcio = :idFuncio")
    List<ProAnotacion> findByFuncioId(@Param("idFuncio") Integer idFuncio);
}