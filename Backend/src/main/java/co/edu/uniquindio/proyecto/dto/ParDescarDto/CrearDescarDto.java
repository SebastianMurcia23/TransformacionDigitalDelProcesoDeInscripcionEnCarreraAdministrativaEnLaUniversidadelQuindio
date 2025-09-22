package co.edu.uniquindio.proyecto.dto.ParDescarDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record CrearDescarDto(
        @NotNull Integer cdDescar,
        @NotNull Integer grDescar,
        @NotBlank @Length(max = 50) String dsDescar,
        @NotNull Boolean estDescar,
        @NotNull Integer id_nivcar,
        @NotNull Integer id_dencar
) { }
