package co.edu.uniquindio.proyecto.service;

import co.edu.uniquindio.proyecto.dto.ParNivcarDto.*;
import co.edu.uniquindio.proyecto.dto.ParTipdocDto.ActualizarEstTipdoc;
import jakarta.validation.Valid;

import java.util.List;

public interface ParNivcarService {

    Integer crearNivcar(CrearNivcarDto dto) throws Exception;

    void editarNivcar(EditarNivcarDto dto) throws Exception;

    void actualizarEstNivcar(ActualizarEstNivcar dto) throws Exception;

    void eliminarNivcar(Integer id) throws Exception;

    InformacionNivcarDto obtenerNivcar(Integer id) throws Exception;

    List<ListarNivcarDto> listarNivcar();
}
