package co.edu.uniquindio.proyecto.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "par_dencar")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParDencar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDencar;

    @Column(length = 50, nullable = false)
    private String dsDencar;

    @Column(nullable = false)
    private Boolean estDencar;
}
