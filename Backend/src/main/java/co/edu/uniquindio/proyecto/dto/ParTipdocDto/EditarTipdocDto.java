package co.edu.uniquindio.proyecto.dto.ParTipdocDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EditarTipdocDto(
        @NotNull Integer id_tipdoc,
        @NotBlank @Size(max = 25) String ds_tipdoc,
        @NotNull Boolean est_tipdoc
) { }
