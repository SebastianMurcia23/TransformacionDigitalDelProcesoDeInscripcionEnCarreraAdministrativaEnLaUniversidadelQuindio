    package co.edu.uniquindio.proyecto.dto.ProFuncioDto;

    import jakarta.validation.constraints.*;

    import java.math.BigInteger;

    public record CrearFuncioDto(
            @NotNull Integer id_funcio,
            @NotNull Integer id_tipdoc,
            @NotNull Integer id_genero,
            @NotBlank @Size(max = 25) String nm_func1,
            @NotBlank @Size(max = 25) String nm_func2,
            @NotBlank @Size(max = 25) String ap_func1,
            @NotBlank @Size(max = 25) String ap_func2,
            @NotNull Integer id_pais,
            @NotNull Integer id_depart,
            @NotNull Integer id_munici,
            @NotNull BigInteger no_funcio,
            @NotBlank @Size(max = 100) String ce_funcio
    ) { }

