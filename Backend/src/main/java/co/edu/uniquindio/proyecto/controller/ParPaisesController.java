package co.edu.uniquindio.proyecto.controller;

import co.edu.uniquindio.proyecto.dto.ParPaisesDto.CrearPaisesDto;
import co.edu.uniquindio.proyecto.dto.ParPaisesDto.EditarPaisesDto;
import co.edu.uniquindio.proyecto.dto.ParPaisesDto.InformacionPaisesDto;
import co.edu.uniquindio.proyecto.dto.ParPaisesDto.ListarPaisesDto;
import co.edu.uniquindio.proyecto.service.ParPaisesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/paises")
@RequiredArgsConstructor
public class ParPaisesController {

    private final ParPaisesService parPaisesService;

    // Crear país
    @PostMapping
    public ResponseEntity<Integer> crearPais(@Valid @RequestBody CrearPaisesDto dto) throws Exception {
        Integer id = parPaisesService.crearPais(dto);
        return ResponseEntity.ok(id);
    }

    // Editar país
    @PutMapping
    public ResponseEntity<Void> editarPais(@Valid @RequestBody EditarPaisesDto dto) throws Exception {
        parPaisesService.editarPais(dto);
        return ResponseEntity.noContent().build();
    }

    // Eliminar país
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPais(@PathVariable Integer id) throws Exception {
        parPaisesService.eliminarPais(id);
        return ResponseEntity.noContent().build();
    }

    // Obtener un país por id
    @GetMapping("/{id}")
    public ResponseEntity<InformacionPaisesDto> obtenerPais(@PathVariable Integer id) throws Exception {
        InformacionPaisesDto dto = parPaisesService.obtenerPais(id);
        return ResponseEntity.ok(dto);
    }

    // Listar todos los países
    @GetMapping
    public ResponseEntity<List<ListarPaisesDto>> listarPaises() {
        List<ListarPaisesDto> lista = parPaisesService.listarPaises();
        return ResponseEntity.ok(lista);
    }
}
