package co.edu.uniquindio.proyecto.dto.ParPaisesDto;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

public record EditarPaisesDto(
        Integer id,
        @NotBlank @Length(max = 25) String nombre
) { }
