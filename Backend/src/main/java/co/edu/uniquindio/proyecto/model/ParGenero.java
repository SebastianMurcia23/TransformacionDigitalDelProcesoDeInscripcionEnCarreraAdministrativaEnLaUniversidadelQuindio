package co.edu.uniquindio.proyecto.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "par_genero")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParGenero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_genero;

    @Column(nullable = false, length = 15)
    private String ds_genero;

    @Column(nullable = false, length = 1)
    private String sg_genero;
}
