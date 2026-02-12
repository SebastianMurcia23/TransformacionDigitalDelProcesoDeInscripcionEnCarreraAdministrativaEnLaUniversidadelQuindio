package co.edu.uniquindio.proyecto.dto.ParNivcarDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record CrearNivcarDto(
        @NotBlank @Length(max = 100) String dsNivcar,
        @NotNull Boolean estNivcar
) { }
