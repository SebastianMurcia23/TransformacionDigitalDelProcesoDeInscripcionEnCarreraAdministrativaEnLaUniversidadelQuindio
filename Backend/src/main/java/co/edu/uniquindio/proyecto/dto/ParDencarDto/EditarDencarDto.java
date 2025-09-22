package co.edu.uniquindio.proyecto.dto.ParDencarDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record EditarDencarDto(
        @NotNull Integer idDencar,
        @NotBlank @Length(max = 50) String dsDencar,
        @NotNull Boolean estDencar
) { }
