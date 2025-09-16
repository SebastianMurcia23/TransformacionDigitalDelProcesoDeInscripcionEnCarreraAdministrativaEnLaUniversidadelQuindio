package co.edu.uniquindio.proyecto.test;

import co.edu.uniquindio.proyecto.model.ParPaises;
import co.edu.uniquindio.proyecto.repository.ParPaisesRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ParPaisesTest {

    @Autowired
    private ParPaisesRepository parPaisesRepository;

    @Test
    @Order(1)
    public void guardarPaisTest() {
        ParPaises paises = new ParPaises();
        paises.setNm_paises("Colombia");

        ParPaises guardado = parPaisesRepository.save(paises);

        Assertions.assertNotNull(guardado.getId_paises());
        Assertions.assertEquals("Colombia", guardado.getNm_paises());
    }

    @Test
    @Order(2)
    public void listarPaisesTest() {
        List<ParPaises> lista = parPaisesRepository.findAll();
        Assertions.assertFalse(lista.isEmpty());
    }
}
