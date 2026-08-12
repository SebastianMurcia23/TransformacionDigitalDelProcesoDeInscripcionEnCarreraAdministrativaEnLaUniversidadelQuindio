package co.edu.uniquindio.proyecto.dto.ProAnotacionDto;

import java.time.LocalDate;
import java.util.List;

public record ListarAnotacionDto(
        Integer   idAnotacion,
        String    idTipsol,
        String    dsTipsol,
        String    actoAdministrativo,
        LocalDate fechaAnotacion,
        LocalDate fechaIniComision,
        LocalDate fechaFinComision,
        Integer   idDescar,
        String    dsDescar,
        Integer   cdDescar,
        Integer   grDescar,
        List<String> dsCarsoles,

        // ── NUEVO: Datos del Proceso de Selección (solo "Por Incorporación") ──
        String    numeroConvocatoriaActoAdministrativo,
        LocalDate fechaConvocatoriaActoAdministrativo,
        String    numeroResolucionListaElegibles,
        LocalDate fechaResolucion,
        String    actoAdministrativoNombramiento,
        LocalDate fechaActoAdministrativo,
        String    numeroActaPosesion,
        LocalDate fechaActaPosesion,
        LocalDate fechaSuperoPeriodoPrueba
) {}