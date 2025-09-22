package co.edu.uniquindio.proyecto.service;

import co.edu.uniquindio.proyecto.dto.ParTipsolDto.CrearTipsolDto;
import co.edu.uniquindio.proyecto.dto.ParTipsolDto.EditarTipsolDto;
import co.edu.uniquindio.proyecto.dto.ParTipsolDto.InformacionTipsolDto;
import co.edu.uniquindio.proyecto.dto.ParTipsolDto.ListarTipsolDto;

import java.util.List;

public interface ParTipsolService {

    String crearTipsol(CrearTipsolDto dto) throws Exception;

    void editarTipsol(EditarTipsolDto dto) throws Exception;

    void eliminarTipsol(String id) throws Exception;

    InformacionTipsolDto obtenerTipsol(String id) throws Exception;

    List<ListarTipsolDto> listarTipsol();
}
