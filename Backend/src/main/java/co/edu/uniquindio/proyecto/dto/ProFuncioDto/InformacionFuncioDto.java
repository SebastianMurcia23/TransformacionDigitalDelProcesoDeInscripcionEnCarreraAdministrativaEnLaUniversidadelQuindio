package co.edu.uniquindio.proyecto.dto.ProFuncioDto;

public record InformacionFuncioDto(
        Integer id_funcio,
        String tipdoc,
        String genero,
        String nm_func1,
        String nm_func2,
        String ap_func1,
        String ap_func2,
        Integer id_pais,
        Integer id_depart,
        Integer id_munici,
        Integer no_funcio,
        String ce_funcio
) { }

