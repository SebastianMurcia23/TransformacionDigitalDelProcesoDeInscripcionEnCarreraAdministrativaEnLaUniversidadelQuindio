package co.edu.uniquindio.proyecto.dto.ParTipdocDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CrearTipdocDto(
        @NotBlank @Size(max = 100) String ds_tipdoc
) { }
