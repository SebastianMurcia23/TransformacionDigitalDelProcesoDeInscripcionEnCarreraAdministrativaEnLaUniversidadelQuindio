package co.edu.uniquindio.proyecto.dto.ParGeneroDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CrearGeneroDto(
        @NotBlank @Size(max = 15) String ds_genero,
        @NotBlank @Size(max = 1) String sg_genero
) { }
