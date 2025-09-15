package co.edu.uniquindio.proyecto.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "par_tipsol")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParTipsol {

    @Id
    @Column(length = 3)
    private String idTipsol;

    @Column(length = 250, nullable = false)
    private String dsTipsol;

    @Column(length = 3, nullable = false)
    private String sgTipsol;

    @Column(nullable = false)
    private Boolean estTipsol;
}
