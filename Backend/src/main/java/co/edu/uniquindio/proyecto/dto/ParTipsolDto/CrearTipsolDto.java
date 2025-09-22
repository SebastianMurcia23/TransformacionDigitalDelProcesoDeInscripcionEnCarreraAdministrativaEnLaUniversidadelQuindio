package co.edu.uniquindio.proyecto.dto.ParTipsolDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record CrearTipsolDto(
        @NotBlank @Length(max = 3) String idTipsol,
        @NotBlank @Length(max = 250) String dsTipsol,
        @NotBlank @Length(max = 3) String sgTipsol,
        @NotNull Boolean estTipsol
) { }
