package co.edu.uniquindio.proyecto.controller;

import co.edu.uniquindio.proyecto.dto.ParGeneroDto.CrearGeneroDto;
import co.edu.uniquindio.proyecto.dto.ParGeneroDto.EditarGeneroDto;
import co.edu.uniquindio.proyecto.dto.ParGeneroDto.InformacionGeneroDto;
import co.edu.uniquindio.proyecto.dto.ParGeneroDto.ListarGeneroDto;
import co.edu.uniquindio.proyecto.service.ParGeneroService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/genero")
@RequiredArgsConstructor
public class ParGeneroController {

    private final ParGeneroService parGeneroService;

    // Crear género
    @PostMapping
    public ResponseEntity<Integer> crearGenero(@Valid @RequestBody CrearGeneroDto dto) throws Exception {
        Integer id = parGeneroService.crearGenero(dto);
        return ResponseEntity.ok(id);
    }

    // Editar género
    @PutMapping
    public ResponseEntity<Void> editarGenero(@Valid @RequestBody EditarGeneroDto dto) throws Exception {
        parGeneroService.editarGenero(dto);
        return ResponseEntity.noContent().build();
    }

    // Eliminar género
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarGenero(@PathVariable Integer id) throws Exception {
        parGeneroService.eliminarGenero(id);
        return ResponseEntity.noContent().build();
    }

    // Obtener género por id
    @GetMapping("/{id}")
    public ResponseEntity<InformacionGeneroDto> obtenerGenero(@PathVariable Integer id) throws Exception {
        InformacionGeneroDto dto = parGeneroService.obtenerGenero(id);
        return ResponseEntity.ok(dto);
    }

    // Listar géneros
    @GetMapping
    public ResponseEntity<List<ListarGeneroDto>> listarGeneros() {
        List<ListarGeneroDto> lista = parGeneroService.listarGeneros();
        return ResponseEntity.ok(lista);
    }
}
