package co.edu.uniquindio.proyecto.controller;

import co.edu.uniquindio.proyecto.dto.ProAnotacionDto.CrearAnotacionDto;
import co.edu.uniquindio.proyecto.dto.ProAnotacionDto.ListarAnotacionDto;
import co.edu.uniquindio.proyecto.service.ProAnotacionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/anotacion")
@RequiredArgsConstructor
public class ProAnotacionController {

    private final ProAnotacionService proAnotacionService;

    @PostMapping
    public ResponseEntity<Integer> crear(@Valid @RequestBody CrearAnotacionDto dto) throws Exception {
        return ResponseEntity.ok(proAnotacionService.crearAnotacion(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) throws Exception {
        proAnotacionService.eliminarAnotacion(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/funcio/{idFuncio}")
    public ResponseEntity<List<ListarAnotacionDto>> listarPorFuncionario(@PathVariable Integer idFuncio) {
        return ResponseEntity.ok(proAnotacionService.listarPorFuncionario(idFuncio));
    }
}