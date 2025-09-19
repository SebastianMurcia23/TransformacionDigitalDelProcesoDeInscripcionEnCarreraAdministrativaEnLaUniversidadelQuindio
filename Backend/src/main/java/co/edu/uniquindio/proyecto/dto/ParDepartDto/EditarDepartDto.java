package co.edu.uniquindio.proyecto.dto.ParDepartDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record EditarDepartDto(
        @NotNull Integer id_depart,
        @NotBlank @Length(max = 25) String nm_depart,
        @NotNull Integer id_paises
) { }
