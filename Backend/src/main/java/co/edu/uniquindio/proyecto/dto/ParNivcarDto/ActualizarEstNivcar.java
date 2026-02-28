package co.edu.uniquindio.proyecto.dto.ParNivcarDto;

import jakarta.validation.constraints.NotNull;

public record ActualizarEstNivcar(
        @NotNull Integer idNivcar,
        @NotNull Boolean estNivcar
) { }
