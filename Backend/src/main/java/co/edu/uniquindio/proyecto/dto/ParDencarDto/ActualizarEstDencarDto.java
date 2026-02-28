package co.edu.uniquindio.proyecto.dto.ParDencarDto;

import jakarta.validation.constraints.NotNull;

public record ActualizarEstDencarDto(

        @NotNull Integer idDencar,
        @NotNull Boolean estDencar
) {}
