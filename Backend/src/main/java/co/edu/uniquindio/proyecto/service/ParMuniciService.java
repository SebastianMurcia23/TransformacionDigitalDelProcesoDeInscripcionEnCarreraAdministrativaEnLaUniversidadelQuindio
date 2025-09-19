package co.edu.uniquindio.proyecto.service;

import co.edu.uniquindio.proyecto.dto.ParMuniciDto.CrearMuniciDto;
import co.edu.uniquindio.proyecto.dto.ParMuniciDto.EditarMuniciDto;
import co.edu.uniquindio.proyecto.dto.ParMuniciDto.InformacionMuniciDto;
import co.edu.uniquindio.proyecto.dto.ParMuniciDto.ListarMuniciDto;

import java.util.List;

public interface ParMuniciService {

    Integer crearMunicipio(CrearMuniciDto municipio) throws Exception;

    void editarMunicipio(EditarMuniciDto municipio) throws Exception;

    void eliminarMunicipio(Integer id) throws Exception;

    InformacionMuniciDto obtenerMunicipio(Integer id) throws Exception;

    List<ListarMuniciDto> listarMunicipios();
}
