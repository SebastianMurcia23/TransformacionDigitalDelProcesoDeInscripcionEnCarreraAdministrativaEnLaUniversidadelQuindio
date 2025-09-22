package co.edu.uniquindio.proyecto.controller;

import co.edu.uniquindio.proyecto.dto.ParTipsolDto.CrearTipsolDto;
import co.edu.uniquindio.proyecto.dto.ParTipsolDto.EditarTipsolDto;
import co.edu.uniquindio.proyecto.dto.ParTipsolDto.InformacionTipsolDto;
import co.edu.uniquindio.proyecto.dto.ParTipsolDto.ListarTipsolDto;
import co.edu.uniquindio.proyecto.service.ParTipsolService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipsol")
@RequiredArgsConstructor
public class ParTipsolController {

    private final ParTipsolService parTipsolService;

    // Crear tipo de solicitud
    @PostMapping
    public ResponseEntity<String> crearTipsol(@Valid @RequestBody CrearTipsolDto dto) throws Exception {
        String id = parTipsolService.crearTipsol(dto);
        return ResponseEntity.ok(id);
    }

    // Editar tipo de solicitud
    @PutMapping
    public ResponseEntity<Void> editarTipsol(@Valid @RequestBody EditarTipsolDto dto) throws Exception {
        parTipsolService.editarTipsol(dto);
        return ResponseEntity.noContent().build();
    }

    // Eliminar tipo de solicitud
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTipsol(@PathVariable String id) throws Exception {
        parTipsolService.eliminarTipsol(id);
        return ResponseEntity.noContent().build();
    }

    // Obtener tipo de solicitud por id
    @GetMapping("/{id}")
    public ResponseEntity<InformacionTipsolDto> obtenerTipsol(@PathVariable String id) throws Exception {
        InformacionTipsolDto dto = parTipsolService.obtenerTipsol(id);
        return ResponseEntity.ok(dto);
    }

    // Listar tipos de solicitud
    @GetMapping
    public ResponseEntity<List<ListarTipsolDto>> listarTipsol() {
        List<ListarTipsolDto> lista = parTipsolService.listarTipsol();
        return ResponseEntity.ok(lista);
    }
}
