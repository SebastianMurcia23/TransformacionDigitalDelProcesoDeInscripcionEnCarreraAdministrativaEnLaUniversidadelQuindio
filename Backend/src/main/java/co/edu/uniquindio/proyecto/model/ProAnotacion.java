package co.edu.uniquindio.proyecto.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pro_anotacion")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ProAnotacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAnotacion;

    @ManyToOne
    @JoinColumn(name = "id_funcio", nullable = false)
    private ProFuncio funcio;

    @ManyToOne
    @JoinColumn(name = "id_tipsol", nullable = false)
    private ParTipsol tipsol;

    @ManyToOne
    @JoinColumn(name = "id_descar")
    private ParDescar descar;

    @Column(nullable = false, length = 200)
    private String actoAdministrativo;

    @Column(nullable = false)
    private LocalDate fechaAnotacion;

    // Solo para COM
    private LocalDate fechaIniComision;
    private LocalDate fechaFinComision;

    // ── NUEVO: Datos del Proceso de Selección (solo "Por Incorporación") ──
    @Column(length = 100)
    private String numeroConvocatoriaActoAdministrativo;
    private LocalDate fechaConvocatoriaActoAdministrativo;

    @Column(length = 100)
    private String numeroResolucionListaElegibles;
    private LocalDate fechaResolucion;

    @Column(length = 200)
    private String actoAdministrativoNombramiento;
    private LocalDate fechaActoAdministrativo;

    @Column(length = 100)
    private String numeroActaPosesion;
    private LocalDate fechaActaPosesion;

    private LocalDate fechaSuperoPeriodoPrueba;
    // ── FIN NUEVO ──

    @ManyToMany
    @JoinTable(
            name = "pro_anotacion_carsol",
            joinColumns = @JoinColumn(name = "id_anotacion"),
            inverseJoinColumns = @JoinColumn(name = "id_carsol")
    )
    @Builder.Default
    private List<ParCarsol> carsoles = new ArrayList<>();
}