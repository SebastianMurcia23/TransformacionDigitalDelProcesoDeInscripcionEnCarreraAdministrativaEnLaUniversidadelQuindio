package co.edu.uniquindio.proyecto.service;

import co.edu.uniquindio.proyecto.dto.ParNivcarDto.CrearNivcarDto;
import co.edu.uniquindio.proyecto.dto.ParNivcarDto.EditarNivcarDto;
import co.edu.uniquindio.proyecto.dto.ParNivcarDto.InformacionNivcarDto;
import co.edu.uniquindio.proyecto.dto.ParNivcarDto.ListarNivcarDto;

import java.util.List;

public interface ParNivcarService {

    Integer crearNivcar(CrearNivcarDto dto) throws Exception;

    void editarNivcar(EditarNivcarDto dto) throws Exception;

    void eliminarNivcar(Integer id) throws Exception;

    InformacionNivcarDto obtenerNivcar(Integer id) throws Exception;

    List<ListarNivcarDto> listarNivcar();
}
