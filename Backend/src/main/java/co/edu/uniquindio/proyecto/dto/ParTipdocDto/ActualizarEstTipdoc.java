package co.edu.uniquindio.proyecto.dto.ParTipdocDto;

import jakarta.validation.constraints.NotNull;

public record ActualizarEstTipdoc(
        @NotNull Integer id_tipdoc,
        @NotNull Boolean est_tipdoc
) { }
