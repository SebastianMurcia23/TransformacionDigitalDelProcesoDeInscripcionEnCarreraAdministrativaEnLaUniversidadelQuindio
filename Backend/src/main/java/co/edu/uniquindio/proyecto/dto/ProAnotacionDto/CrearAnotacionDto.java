package co.edu.uniquindio.proyecto.dto.ProAnotacionDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record CrearAnotacionDto(
        @NotNull  Integer   idFuncio,
        @NotBlank String    idTipsol,
        @NotNull  LocalDate fechaAnotacion,
        @NotBlank String    actoAdministrativo,
        Integer   idDescar,
        List<Integer> idCarsoles,
        LocalDate fechaIniComision,
        LocalDate fechaFinComision,

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