package co.edu.uniquindio.proyecto.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "par_depart")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParDepart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_depart;

    @Column(nullable = false, length = 25)
    private String nm_depart;

    @ManyToOne
    @JoinColumn(name = "id_paises", nullable = false)
    private ParPaises pais;
}
