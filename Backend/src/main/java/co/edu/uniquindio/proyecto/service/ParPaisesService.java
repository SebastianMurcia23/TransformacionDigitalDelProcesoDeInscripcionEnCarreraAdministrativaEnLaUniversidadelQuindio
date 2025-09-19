package co.edu.uniquindio.proyecto.service;

import co.edu.uniquindio.proyecto.dto.ParPaisesDto.CrearPaisesDto;
import co.edu.uniquindio.proyecto.dto.ParPaisesDto.EditarPaisesDto;
import co.edu.uniquindio.proyecto.dto.ParPaisesDto.InformacionPaisesDto;
import co.edu.uniquindio.proyecto.dto.ParPaisesDto.ListarPaisesDto;

import java.util.List;

public interface ParPaisesService {

    Integer crearPais(CrearPaisesDto pais) throws Exception;

    void editarPais(EditarPaisesDto pais) throws Exception;

    void eliminarPais(Integer id) throws Exception;

    InformacionPaisesDto obtenerPais(Integer id) throws Exception;

    List<ListarPaisesDto> listarPaises();
}
