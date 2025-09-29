package co.edu.uniquindio.proyecto.controller;

import co.edu.uniquindio.proyecto.dto.ParDepartDto.CrearDepartDto;
import co.edu.uniquindio.proyecto.dto.ParDepartDto.EditarDepartDto;
import co.edu.uniquindio.proyecto.dto.ParDepartDto.InformacionDepartDto;
import co.edu.uniquindio.proyecto.dto.ParDepartDto.ListarDepartDto;
import co.edu.uniquindio.proyecto.service.ParDepartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/departamentos")
@RequiredArgsConstructor
public class ParDepartController {

    private final ParDepartService parDepartService;

    // Crear departamento
    @PostMapping
    public ResponseEntity<Integer> crearDepartamento(@Valid @RequestBody CrearDepartDto dto) throws Exception {
        Integer id = parDepartService.crearDepartamento(dto);
        return ResponseEntity.ok(id);
    }

    // Editar departamento
    @PutMapping
    public ResponseEntity<Void> editarDepartamento(@Valid @RequestBody EditarDepartDto dto) throws Exception {
        parDepartService.editarDepartamento(dto);
        return ResponseEntity.noContent().build();
    }

    // Eliminar departamento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarDepartamento(@PathVariable Integer id) throws Exception {
        parDepartService.eliminarDepartamento(id);
        return ResponseEntity.noContent().build();
    }

    // Obtener un departamento por id
    @GetMapping("/{id}")
    public ResponseEntity<InformacionDepartDto> obtenerDepartamento(@PathVariable Integer id) throws Exception {
        InformacionDepartDto dto = parDepartService.obtenerDepartamento(id);
        return ResponseEntity.ok(dto);
    }

    // Listar todos los departamentos
    @GetMapping
    public ResponseEntity<List<ListarDepartDto>> listarDepartamentos() {
        List<ListarDepartDto> lista = parDepartService.listarDepartamentos();
        return ResponseEntity.ok(lista);
    }

}
