package co.edu.uniquindio.proyecto.service;

import co.edu.uniquindio.proyecto.dto.ParTipdocDto.*;

import java.util.List;

public interface ParTipdocService {

    Integer crearTipdoc(CrearTipdocDto dto) throws Exception;

    void editarTipdoc(EditarTipdocDto dto) throws Exception;

    void actualizarEstTipdoc(ActualizarEstTipdoc dto) throws Exception;

    void eliminarTipdoc(Integer id) throws Exception;

    InformacionTipdocDto obtenerTipdoc(Integer id) throws Exception;

    List<ListarTipdocDto> listarTipdoc();
}
