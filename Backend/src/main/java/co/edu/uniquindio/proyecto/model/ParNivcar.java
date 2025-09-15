package co.edu.uniquindio.proyecto.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "par_nivcar")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParNivcar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idNivcar;

    @Column(length = 20, nullable = false)
    private String dsNivcar;

    @Column(nullable = false)
    private Boolean estNivcar;
}
