package co.edu.uniquindio.proyecto.controller;

import co.edu.uniquindio.proyecto.dto.ParDescarDto.CrearDescarDto;
import co.edu.uniquindio.proyecto.dto.ParDescarDto.EditarDescarDto;
import co.edu.uniquindio.proyecto.dto.ParDescarDto.InformacionDescarDto;
import co.edu.uniquindio.proyecto.dto.ParDescarDto.ListarDescarDto;
import co.edu.uniquindio.proyecto.service.ParDescarService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/descar")
@RequiredArgsConstructor
public class ParDescarController {

    private final ParDescarService parDescarService;

    // Crear descripción de cargo
    @PostMapping
    public ResponseEntity<Integer> crearDescar(@Valid @RequestBody CrearDescarDto dto) throws Exception {
        Integer id = parDescarService.crearDescar(dto);
        return ResponseEntity.ok(id);
    }

    // Editar descripción de cargo
    @PutMapping
    public ResponseEntity<Void> editarDescar(@Valid @RequestBody EditarDescarDto dto) throws Exception {
        parDescarService.editarDescar(dto);
        return ResponseEntity.noContent().build();
    }

    // Eliminar descripción de cargo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDescar(@PathVariable Integer id) throws Exception {
        parDescarService.eliminarDescar(id);
        return ResponseEntity.noContent().build();
    }

    // Obtener descripción de cargo por id
    @GetMapping("/{id}")
    public ResponseEntity<InformacionDescarDto> obtenerDescar(@PathVariable Integer id) throws Exception {
        InformacionDescarDto dto = parDescarService.obtenerDescar(id);
        return ResponseEntity.ok(dto);
    }

    // Listar todas las descripciones de cargo
    @GetMapping
    public ResponseEntity<List<ListarDescarDto>> listarDescar() {
        List<ListarDescarDto> lista = parDescarService.listarDescar();
        return ResponseEntity.ok(lista);
    }
}
