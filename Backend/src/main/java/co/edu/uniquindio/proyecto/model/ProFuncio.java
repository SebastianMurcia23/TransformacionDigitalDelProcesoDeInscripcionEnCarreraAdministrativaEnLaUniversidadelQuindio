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

    @ManyToOne
    @JoinColumn(name = "id_pais", nullable = false)
    private ParPaises pais;

    @ManyToOne
    @JoinColumn(name = "id_depart", nullable = false)
    private ParDepart depart;

    @ManyToOne
    @JoinColumn(name = "id_munici", nullable = false)
    private ParMunici munici;

    @Column(nullable = false)
    private Integer no_funcio;

    @Column(nullable = false, length = 100)
    private String ce_funcio;
}











