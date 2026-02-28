package co.edu.uniquindio.proyecto.service;

import co.edu.uniquindio.proyecto.dto.ParDencarDto.*;

import java.util.List;

public interface ParDencarService {

    Integer crearDencar(CrearDencarDto dto) throws Exception;

    void editarDencar(EditarDencarDto dto) throws Exception;

    void actualizarEstDencar(ActualizarEstDencarDto dto) throws Exception;

    void eliminarDencar(Integer id) throws Exception;

    InformacionDencarDto obtenerDencar(Integer id) throws Exception;

    List<ListarDencarDto> listarDencar();
}
