package co.edu.uniquindio.proyecto.controller;

import co.edu.uniquindio.proyecto.dto.ParCarsolDto.CrearCarsolDto;
import co.edu.uniquindio.proyecto.dto.ParCarsolDto.EditarCarsolDto;
import co.edu.uniquindio.proyecto.dto.ParCarsolDto.InformacionCarsolDto;
import co.edu.uniquindio.proyecto.dto.ParCarsolDto.ListarCarsolDto;
import co.edu.uniquindio.proyecto.service.ParCarsolService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carsol")
@RequiredArgsConstructor
public class ParCarsolController {

    private final ParCarsolService parCarsolService;

    // Crear característica de solicitud
    @PostMapping
    public ResponseEntity<Integer> crearCarsol(@Valid @RequestBody CrearCarsolDto dto) throws Exception {
        Integer id = parCarsolService.crearCarsol(dto);
        return ResponseEntity.ok(id);
    }

    // Editar característica de solicitud
    @PutMapping
    public ResponseEntity<Void> editarCarsol(@Valid @RequestBody EditarCarsolDto dto) throws Exception {
        parCarsolService.editarCarsol(dto);
        return ResponseEntity.noContent().build();
    }

    // Eliminar característica de solicitud
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCarsol(@PathVariable Integer id) throws Exception {
        parCarsolService.eliminarCarsol(id);
        return ResponseEntity.noContent().build();
    }

    // Obtener característica de solicitud por id
    @GetMapping("/{id}")
    public ResponseEntity<InformacionCarsolDto> obtenerCarsol(@PathVariable Integer id) throws Exception {
        InformacionCarsolDto dto = parCarsolService.obtenerCarsol(id);
        return ResponseEntity.ok(dto);
    }

    // Listar características de solicitud
    @GetMapping
    public ResponseEntity<List<ListarCarsolDto>> listarCarsol() {
        List<ListarCarsolDto> lista = parCarsolService.listarCarsol();
        return ResponseEntity.ok(lista);
    }
}
