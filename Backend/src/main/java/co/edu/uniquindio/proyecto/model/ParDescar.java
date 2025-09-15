package co.edu.uniquindio.proyecto.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "par_descar")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParDescar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDescar;

    @Column(nullable = false)
    private Integer cdDescar;

    @Column(nullable = false)
    private Integer grDescar;

    @Column(length = 50, nullable = false)
    private String dsDescar;

    @Column(nullable = false)
    private Boolean estDescar;

    // Relaciones
    @ManyToOne
    @JoinColumn(name = "id_nivcar", nullable = false)
    private ParNivcar parNivcar;

    @ManyToOne
    @JoinColumn(name = "id_dencar", nullable = false)
    private ParDencar parDencar;
}
