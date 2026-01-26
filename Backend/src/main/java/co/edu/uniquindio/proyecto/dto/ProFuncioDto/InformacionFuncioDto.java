package co.edu.uniquindio.proyecto.dto.ProFuncioDto;
import java.math.BigInteger;
import java.time.LocalDate;

public record InformacionFuncioDto(
        Integer id_funcio,
        String id_tipdoc,
        String id_genero,
        String nm_func1,
        String nm_func2,
        String ap_func1,
        String ap_func2,
        Integer id_pais,
        Integer id_depart,
        Integer id_munici,
        BigInteger no_funcio,
        String ce_funcio,
        LocalDate fechaExpedicion
) { }

