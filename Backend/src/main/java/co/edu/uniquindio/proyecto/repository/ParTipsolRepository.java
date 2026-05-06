package co.edu.uniquindio.proyecto.repository;

import co.edu.uniquindio.proyecto.model.ParTipsol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ParTipsolRepository extends JpaRepository<ParTipsol,String>{
    @Query("SELECT p FROM ParTipsol p ORDER BY p.idTipsol ASC")
    List<ParTipsol>finAllOrderByTipsolsolAsc();
}
