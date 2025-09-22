package co.edu.uniquindio.proyecto.service;

import co.edu.uniquindio.proyecto.dto.ParDescarDto.CrearDescarDto;
import co.edu.uniquindio.proyecto.dto.ParDescarDto.EditarDescarDto;
import co.edu.uniquindio.proyecto.dto.ParDescarDto.InformacionDescarDto;
import co.edu.uniquindio.proyecto.dto.ParDescarDto.ListarDescarDto;

import java.util.List;

public interface ParDescarService {

    Integer crearDescar(CrearDescarDto dto) throws Exception;

    void editarDescar(EditarDescarDto dto) throws Exception;

    void eliminarDescar(Integer id) throws Exception;

    InformacionDescarDto obtenerDescar(Integer id) throws Exception;

    List<ListarDescarDto> listarDescar();
}
