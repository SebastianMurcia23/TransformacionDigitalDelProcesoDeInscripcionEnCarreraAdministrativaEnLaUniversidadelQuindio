package co.edu.uniquindio.proyecto.service;

import co.edu.uniquindio.proyecto.dto.ParGeneroDto.CrearGeneroDto;
import co.edu.uniquindio.proyecto.dto.ParGeneroDto.EditarGeneroDto;
import co.edu.uniquindio.proyecto.dto.ParGeneroDto.InformacionGeneroDto;
import co.edu.uniquindio.proyecto.dto.ParGeneroDto.ListarGeneroDto;

import java.util.List;

public interface ParGeneroService {

    Integer crearGenero(CrearGeneroDto dto) throws Exception;

    void editarGenero(EditarGeneroDto dto) throws Exception;

    void eliminarGenero(Integer id) throws Exception;

    InformacionGeneroDto obtenerGenero(Integer id) throws Exception;

    List<ListarGeneroDto> listarGeneros();
}
