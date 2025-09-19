package co.edu.uniquindio.proyecto.controller;

import co.edu.uniquindio.proyecto.dto.ParMuniciDto.CrearMuniciDto;
import co.edu.uniquindio.proyecto.dto.ParMuniciDto.EditarMuniciDto;
import co.edu.uniquindio.proyecto.dto.ParMuniciDto.InformacionMuniciDto;
import co.edu.uniquindio.proyecto.dto.ParMuniciDto.ListarMuniciDto;
import co.edu.uniquindio.proyecto.service.ParMuniciService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/municipios")
@RequiredArgsConstructor
public class ParMuniciController {

    private final ParMuniciService parMuniciService;

    // Crear municipio
    @PostMapping
    public ResponseEntity<Integer> crearMunicipio(@Valid @RequestBody CrearMuniciDto dto) throws Exception {
        Integer id = parMuniciService.crearMunicipio(dto);
        return ResponseEntity.ok(id);
    }

    // Editar municipio
    @PutMapping
    public ResponseEntity<Void> editarMunicipio(@Valid @RequestBody EditarMuniciDto dto) throws Exception {
        parMuniciService.editarMunicipio(dto);
        return ResponseEntity.noContent().build();
    }

    // Eliminar municipio
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarMunicipio(@PathVariable Integer id) throws Exception {
        parMuniciService.eliminarMunicipio(id);
        return ResponseEntity.noContent().build();
    }

    // Obtener un municipio por id
    @GetMapping("/{id}")
    public ResponseEntity<InformacionMuniciDto> obtenerMunicipio(@PathVariable Integer id) throws Exception {
        InformacionMuniciDto dto = parMuniciService.obtenerMunicipio(id);
        return ResponseEntity.ok(dto);
    }

    // Listar todos los municipios
    @GetMapping
    public ResponseEntity<List<ListarMuniciDto>> listarMunicipios() {
        List<ListarMuniciDto> lista = parMuniciService.listarMunicipios();
        return ResponseEntity.ok(lista);
    }
}
