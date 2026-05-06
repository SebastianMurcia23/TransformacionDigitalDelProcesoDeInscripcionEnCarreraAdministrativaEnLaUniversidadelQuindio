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

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/carsol")
@RequiredArgsConstructor
public class ParCarsolController {

    private final ParCarsolService parCarsolService;

    @PostMapping
    public ResponseEntity<Void> crearCarsol(@Valid @RequestBody CrearCarsolDto dto) throws Exception {
        parCarsolService.crearCarsol(dto);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Void> editarCarsol(@Valid @RequestBody EditarCarsolDto dto) throws Exception {
        parCarsolService.editarCarsol(dto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCarsol(@PathVariable Integer id) throws Exception {
        parCarsolService.eliminarCarsol(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InformacionCarsolDto> obtenerCarsol(@PathVariable Integer id) throws Exception {
        InformacionCarsolDto dto = parCarsolService.obtenerCarsol(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<ListarCarsolDto>> listarCarsol() {
        List<ListarCarsolDto> lista = parCarsolService.listarCarsol();
        return ResponseEntity.ok(lista);
    }
}