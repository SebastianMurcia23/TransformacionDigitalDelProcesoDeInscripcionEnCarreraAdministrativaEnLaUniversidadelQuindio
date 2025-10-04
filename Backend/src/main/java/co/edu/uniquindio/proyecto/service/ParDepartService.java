package co.edu.uniquindio.proyecto.service;

import co.edu.uniquindio.proyecto.dto.ParDepartDto.CrearDepartDto;
import co.edu.uniquindio.proyecto.dto.ParDepartDto.EditarDepartDto;
import co.edu.uniquindio.proyecto.dto.ParDepartDto.InformacionDepartDto;
import co.edu.uniquindio.proyecto.dto.ParDepartDto.ListarDepartDto;

import java.util.List;

public interface ParDepartService {

    Integer crearDepartamento(CrearDepartDto dto) throws Exception;

    void editarDepartamento(EditarDepartDto dto) throws Exception;

    void eliminarDepartamento(Integer id) throws Exception;

    InformacionDepartDto obtenerDepartamento(Integer id) throws Exception;

    List<ListarDepartDto> listarDepartamentos();
    List<ListarDepartDto> listarDepartamentosPorPais(Integer idPais);

}
