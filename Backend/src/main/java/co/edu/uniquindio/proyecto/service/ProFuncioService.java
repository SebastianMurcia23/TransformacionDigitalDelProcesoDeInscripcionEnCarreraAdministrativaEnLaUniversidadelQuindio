package co.edu.uniquindio.proyecto.service;

import co.edu.uniquindio.proyecto.dto.ProFuncioDto.CrearFuncioDto;
import co.edu.uniquindio.proyecto.dto.ProFuncioDto.EditarFuncioDto;
import co.edu.uniquindio.proyecto.dto.ProFuncioDto.InformacionFuncioDto;
import co.edu.uniquindio.proyecto.dto.ProFuncioDto.ListarFuncioDto;

import java.util.List;

public interface ProFuncioService {

    Integer crearFuncio(CrearFuncioDto dto) throws Exception;

    void editarFuncio(EditarFuncioDto dto) throws Exception;

    void eliminarFuncio(Integer id) throws Exception;

    InformacionFuncioDto obtenerFuncio(Integer id) throws Exception;

    List<ListarFuncioDto> listarFuncio();
}
