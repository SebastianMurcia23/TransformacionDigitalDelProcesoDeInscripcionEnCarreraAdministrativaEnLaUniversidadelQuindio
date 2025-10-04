package co.edu.uniquindio.proyecto.controller;

import co.edu.uniquindio.proyecto.dto.ParTipdocDto.CrearTipdocDto;
import co.edu.uniquindio.proyecto.dto.ParTipdocDto.EditarTipdocDto;
import co.edu.uniquindio.proyecto.dto.ParTipdocDto.InformacionTipdocDto;
import co.edu.uniquindio.proyecto.dto.ParTipdocDto.ListarTipdocDto;
import co.edu.uniquindio.proyecto.service.ParTipdocService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/tipdoc")
@RequiredArgsConstructor
public class ParTipdocController {

    private final ParTipdocService parTipdocService;

    // Crear tipo de documento
    @PostMapping
    public ResponseEntity<Integer> crearTipdoc(@Valid @RequestBody CrearTipdocDto dto) throws Exception {
        Integer id = parTipdocService.crearTipdoc(dto);
        return ResponseEntity.ok(id);
    }

    // Editar tipo de documento
    @PutMapping
    public ResponseEntity<Void> editarTipdoc(@Valid @RequestBody EditarTipdocDto dto) throws Exception {
        parTipdocService.editarTipdoc(dto);
        return ResponseEntity.noContent().build();
    }

    // Eliminar tipo de documento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTipdoc(@PathVariable Integer id) throws Exception {
        parTipdocService.eliminarTipdoc(id);
        return ResponseEntity.noContent().build();
    }

    // Obtener tipo de documento por id
    @GetMapping("/{id}")
    public ResponseEntity<InformacionTipdocDto> obtenerTipdoc(@PathVariable Integer id) throws Exception {
        InformacionTipdocDto dto = parTipdocService.obtenerTipdoc(id);
        return ResponseEntity.ok(dto);
    }

    // Listar tipos de documento
    @GetMapping
    public ResponseEntity<List<ListarTipdocDto>> listarTipdoc() {
        List<ListarTipdocDto> lista = parTipdocService.listarTipdoc();
        return ResponseEntity.ok(lista);
    }
}
