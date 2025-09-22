package co.edu.uniquindio.proyecto.controller;

import co.edu.uniquindio.proyecto.dto.ParNivcarDto.CrearNivcarDto;
import co.edu.uniquindio.proyecto.dto.ParNivcarDto.EditarNivcarDto;
import co.edu.uniquindio.proyecto.dto.ParNivcarDto.InformacionNivcarDto;
import co.edu.uniquindio.proyecto.dto.ParNivcarDto.ListarNivcarDto;
import co.edu.uniquindio.proyecto.service.ParNivcarService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nivcar")
@RequiredArgsConstructor
public class ParNivcarController {

    private final ParNivcarService parNivcarService;

    // Crear nivel de cargo
    @PostMapping
    public ResponseEntity<Integer> crearNivcar(@Valid @RequestBody CrearNivcarDto dto) throws Exception {
        Integer id = parNivcarService.crearNivcar(dto);
        return ResponseEntity.ok(id);
    }

    // Editar nivel de cargo
    @PutMapping
    public ResponseEntity<Void> editarNivcar(@Valid @RequestBody EditarNivcarDto dto) throws Exception {
        parNivcarService.editarNivcar(dto);
        return ResponseEntity.noContent().build();
    }

    // Eliminar nivel de cargo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarNivcar(@PathVariable Integer id) throws Exception {
        parNivcarService.eliminarNivcar(id);
        return ResponseEntity.noContent().build();
    }

    // Obtener nivel de cargo por id
    @GetMapping("/{id}")
    public ResponseEntity<InformacionNivcarDto> obtenerNivcar(@PathVariable Integer id) throws Exception {
        InformacionNivcarDto dto = parNivcarService.obtenerNivcar(id);
        return ResponseEntity.ok(dto);
    }

    // Listar todos los niveles de cargo
    @GetMapping
    public ResponseEntity<List<ListarNivcarDto>> listarNivcar() {
        List<ListarNivcarDto> lista = parNivcarService.listarNivcar();
        return ResponseEntity.ok(lista);
    }
}
