package co.edu.uniquindio.proyecto.dto.ParGeneroDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EditarGeneroDto(
        @NotNull Integer id_genero,
        @NotBlank @Size(max = 15) String ds_genero,
        @NotBlank @Size(max = 1) String sg_genero
) { }
