package co.edu.uniquindio.proyecto.dto.ParNivcarDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record EditarNivcarDto(
        @NotNull Integer idNivcar,
        @NotBlank @Length(max = 20) String dsNivcar,
        @NotNull Boolean estNivcar
) { }
