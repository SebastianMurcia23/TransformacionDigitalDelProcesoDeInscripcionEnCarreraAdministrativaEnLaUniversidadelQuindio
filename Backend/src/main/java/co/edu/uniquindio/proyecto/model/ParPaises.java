package co.edu.uniquindio.proyecto.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "par_paises")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParPaises {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_paises;

    @Column(nullable = false, length = 25)
    private String nm_paises;
}
