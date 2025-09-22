package co.edu.uniquindio.proyecto.service;

import co.edu.uniquindio.proyecto.dto.ParDencarDto.CrearDencarDto;
import co.edu.uniquindio.proyecto.dto.ParDencarDto.EditarDencarDto;
import co.edu.uniquindio.proyecto.dto.ParDencarDto.InformacionDencarDto;
import co.edu.uniquindio.proyecto.dto.ParDencarDto.ListarDencarDto;

import java.util.List;

public interface ParDencarService {

    Integer crearDencar(CrearDencarDto dto) throws Exception;

    void editarDencar(EditarDencarDto dto) throws Exception;

    void eliminarDencar(Integer id) throws Exception;

    InformacionDencarDto obtenerDencar(Integer id) throws Exception;

    List<ListarDencarDto> listarDencar();
}
