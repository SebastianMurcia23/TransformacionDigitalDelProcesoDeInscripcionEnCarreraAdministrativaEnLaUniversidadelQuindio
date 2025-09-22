package co.edu.uniquindio.proyecto.dto.ParDencarDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record CrearDencarDto(
        @NotBlank @Length(max = 50) String dsDencar,
        @NotNull Boolean estDencar
) { }
