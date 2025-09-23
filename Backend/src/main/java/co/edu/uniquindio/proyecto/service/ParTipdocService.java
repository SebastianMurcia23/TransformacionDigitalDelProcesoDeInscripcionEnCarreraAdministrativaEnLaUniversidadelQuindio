package co.edu.uniquindio.proyecto.service;

import co.edu.uniquindio.proyecto.dto.ParTipdocDto.CrearTipdocDto;
import co.edu.uniquindio.proyecto.dto.ParTipdocDto.EditarTipdocDto;
import co.edu.uniquindio.proyecto.dto.ParTipdocDto.InformacionTipdocDto;
import co.edu.uniquindio.proyecto.dto.ParTipdocDto.ListarTipdocDto;

import java.util.List;

public interface ParTipdocService {

    Integer crearTipdoc(CrearTipdocDto dto) throws Exception;

    void editarTipdoc(EditarTipdocDto dto) throws Exception;

    void eliminarTipdoc(Integer id) throws Exception;

    InformacionTipdocDto obtenerTipdoc(Integer id) throws Exception;

    List<ListarTipdocDto> listarTipdoc();
}
