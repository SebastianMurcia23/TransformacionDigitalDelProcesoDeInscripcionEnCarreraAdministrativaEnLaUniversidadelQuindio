package co.edu.uniquindio.proyecto.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "par_carsol")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParCarsol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCarsol;

    @Column(length = 300, nullable = false)
    private String dsCarsol;

    @Column(length = 5, nullable = false)
    private String sgCarsol;

    @Column(nullable = false)
    private Boolean estCarsol;

    // Relación con par_tipsol
    @ManyToOne
    @JoinColumn(name = "id_tipsol", nullable = false)
    private ParTipsol parTipsol;
}
