package co.edu.uniquindio.proyecto.service;

import co.edu.uniquindio.proyecto.dto.ProAnotacionDto.CrearAnotacionDto;
import co.edu.uniquindio.proyecto.dto.ProAnotacionDto.ListarAnotacionDto;

import java.util.List;

public interface ProAnotacionService {
    Integer crearAnotacion(CrearAnotacionDto dto) throws Exception;
    void    eliminarAnotacion(Integer id) throws Exception;
    List<ListarAnotacionDto> listarPorFuncionario(Integer idFuncio);
}