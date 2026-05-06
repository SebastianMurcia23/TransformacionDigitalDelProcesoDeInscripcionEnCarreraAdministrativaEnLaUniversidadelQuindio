package co.edu.uniquindio.proyecto.dto.ParCarsolDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CrearCarsolDto(
        @NotBlank @Size(max = 300) String dsCarsol,
        @NotNull Boolean estCarsol,
        @NotBlank String idTipsol
) { }