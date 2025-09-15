package co.edu.uniquindio.proyecto.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pro_funcio")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProFuncio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_funcio;

    @ManyToOne
    @JoinColumn(name = "id_tipdoc", nullable = false)
    private ParTipdoc tipdoc;

    @ManyToOne
    @JoinColumn(name = "id_genero", nullable = false)
    private ParGenero genero;

    @Column(nullable = false, length = 25)
    private String nm_func1;

    @Column(nullable = false, length = 25)
    private String nm_func2;

    @Column(nullable = false, length = 25)
    private String ap_func1;

    @Column(nullable = false, length = 25)
    private String ap_func2;

    @Column(nullable = false)
    private Integer id_pais;

    @Column(nullable = false)
    private Integer no_funcio;

    @Column(nullable = false, length = 100)
    private String ce_funcio;
}
