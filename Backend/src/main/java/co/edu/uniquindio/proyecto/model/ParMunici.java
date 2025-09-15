package co.edu.uniquindio.proyecto.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "par_munici")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParMunici {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_munici;

    @Column(nullable = false, length = 25)
    private String nm_munici;

    @ManyToOne
    @JoinColumn(name = "id_depart", nullable = false)
    private ParDepart depart;
}
