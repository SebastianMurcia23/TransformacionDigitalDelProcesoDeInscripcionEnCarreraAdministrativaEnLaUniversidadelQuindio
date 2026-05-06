package co.edu.uniquindio.proyecto.dto.ParCarsolDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record EditarCarsolDto(
        @NotNull Integer idCarsol,
        @NotBlank @Size(max = 300) String dsCarsol,
        @NotBlank @Size(max = 5) String sgCarsol,
        @NotNull Boolean estCarsol,
        @NotBlank String idTipsol
) { }