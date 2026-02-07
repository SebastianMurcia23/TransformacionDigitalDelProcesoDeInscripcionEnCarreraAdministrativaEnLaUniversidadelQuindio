package co.edu.uniquindio.proyecto.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "par_tipdoc")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParTipdoc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_tipdoc;
    @Column(nullable = false, length = 100)
    private String ds_tipdoc;
    @Column(nullable = false)
    private Boolean est_tipdoc;
}
