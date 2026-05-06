package co.edu.uniquindio.proyecto.dto.ParTipsolDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.Length;

public record CrearTipsolDto(
        @NotBlank @Size(max = 3) String idTipsol,
        @NotBlank @Size(max = 250) String dsTipsol,
        @NotBlank @Size(max = 3) String sgTipsol,
        @NotNull Boolean estTipsol
) { }
