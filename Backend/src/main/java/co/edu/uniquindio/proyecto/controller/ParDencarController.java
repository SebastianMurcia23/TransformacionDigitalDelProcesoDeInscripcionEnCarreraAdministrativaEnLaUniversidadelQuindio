package co.edu.uniquindio.proyecto.controller;

import co.edu.uniquindio.proyecto.dto.ParDencarDto.*;
import co.edu.uniquindio.proyecto.dto.ParNivcarDto.ActualizarEstNivcar;
import co.edu.uniquindio.proyecto.service.ParDencarService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/dencar")
@RequiredArgsConstructor
public class ParDencarController {

    private final ParDencarService parDencarService;

    // Crear denominación de cargo
    @PostMapping
    public ResponseEntity<Integer> crearDencar(@Valid @RequestBody CrearDencarDto dto) throws Exception {
        Integer id = parDencarService.crearDencar(dto);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/est")
    public ResponseEntity<Void> actualizarEstDencar(@Valid @RequestBody ActualizarEstDencarDto dto) throws Exception {
        parDencarService.actualizarEstDencar(dto);
        return ResponseEntity.noContent().build();
    }

    // Editar denominación de cargo
    @PutMapping
    public ResponseEntity<Void> editarDencar(@Valid @RequestBody EditarDencarDto dto) throws Exception {
        parDencarService.editarDencar(dto);
        return ResponseEntity.noContent().build();
    }

    // Eliminar denominación de cargo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDencar(@PathVariable Integer id) throws Exception {
        parDencarService.eliminarDencar(id);
        return ResponseEntity.noContent().build();
    }

    // Obtener denominación de cargo por id
    @GetMapping("/{id}")
    public ResponseEntity<InformacionDencarDto> obtenerDencar(@PathVariable Integer id) throws Exception {
        InformacionDencarDto dto = parDencarService.obtenerDencar(id);
        return ResponseEntity.ok(dto);
    }

    // Listar denominaciones de cargo
    @GetMapping
    public ResponseEntity<List<ListarDencarDto>> listarDencar() {
        List<ListarDencarDto> lista = parDencarService.listarDencar();
        return ResponseEntity.ok(lista);
    }
}
