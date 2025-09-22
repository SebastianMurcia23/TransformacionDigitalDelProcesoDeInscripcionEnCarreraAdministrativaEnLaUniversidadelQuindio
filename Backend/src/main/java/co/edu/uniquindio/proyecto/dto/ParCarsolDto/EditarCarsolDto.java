package co.edu.uniquindio.proyecto.dto.ParCarsolDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record EditarCarsolDto(
        @NotNull Integer idCarsol,
        @NotBlank @Length(max = 300) String dsCarsol,
        @NotBlank @Length(max = 5) String sgCarsol,
        @NotNull Boolean estCarsol,
        @NotBlank String idTipsol
) { }
