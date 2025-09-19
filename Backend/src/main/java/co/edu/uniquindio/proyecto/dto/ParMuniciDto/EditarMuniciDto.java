package co.edu.uniquindio.proyecto.dto.ParMuniciDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record EditarMuniciDto(
        @NotNull Integer id_munici,
        @NotBlank @Length(max = 25) String nm_munici,
        @NotNull Integer id_depart
) {}
