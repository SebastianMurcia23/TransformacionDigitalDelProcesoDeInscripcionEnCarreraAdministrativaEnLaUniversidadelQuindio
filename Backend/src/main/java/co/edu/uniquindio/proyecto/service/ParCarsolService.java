package co.edu.uniquindio.proyecto.service;

import co.edu.uniquindio.proyecto.dto.ParCarsolDto.CrearCarsolDto;
import co.edu.uniquindio.proyecto.dto.ParCarsolDto.EditarCarsolDto;
import co.edu.uniquindio.proyecto.dto.ParCarsolDto.InformacionCarsolDto;
import co.edu.uniquindio.proyecto.dto.ParCarsolDto.ListarCarsolDto;

import java.util.List;

public interface ParCarsolService {

    Integer crearCarsol(CrearCarsolDto dto) throws Exception;

    void editarCarsol(EditarCarsolDto dto) throws Exception;

    void eliminarCarsol(Integer id) throws Exception;

    InformacionCarsolDto obtenerCarsol(Integer id) throws Exception;

    List<ListarCarsolDto> listarCarsol();
}
