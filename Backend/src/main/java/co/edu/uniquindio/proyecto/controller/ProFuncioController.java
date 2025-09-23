package co.edu.uniquindio.proyecto.controller;

import co.edu.uniquindio.proyecto.dto.ProFuncioDto.CrearFuncioDto;
import co.edu.uniquindio.proyecto.dto.ProFuncioDto.EditarFuncioDto;
import co.edu.uniquindio.proyecto.dto.ProFuncioDto.InformacionFuncioDto;
import co.edu.uniquindio.proyecto.dto.ProFuncioDto.ListarFuncioDto;
import co.edu.uniquindio.proyecto.service.ProFuncioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profuncio")
@RequiredArgsConstructor
public class ProFuncioController {

    private final ProFuncioService proFuncioService;

    // Crear funcionario
    @PostMapping
    public ResponseEntity<Integer> crearFuncio(@Valid @RequestBody CrearFuncioDto dto) throws Exception {
        Integer id = proFuncioService.crearFuncio(dto);
        return ResponseEntity.ok(id);
    }

    // Editar funcionario
    @PutMapping
    public ResponseEntity<Void> editarFuncio(@Valid @RequestBody EditarFuncioDto dto) throws Exception {
        proFuncioService.editarFuncio(dto);
        return ResponseEntity.noContent().build();
    }

    // Eliminar funcionario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarFuncio(@PathVariable Integer id) throws Exception {
        proFuncioService.eliminarFuncio(id);
        return ResponseEntity.noContent().build();
    }

    // Obtener funcionario por id
    @GetMapping("/{id}")
    public ResponseEntity<InformacionFuncioDto> obtenerFuncio(@PathVariable Integer id) throws Exception {
        InformacionFuncioDto dto = proFuncioService.obtenerFuncio(id);
        return ResponseEntity.ok(dto);
    }

    // Listar funcionarios
    @GetMapping
    public ResponseEntity<List<ListarFuncioDto>> listarFuncio() {
        List<ListarFuncioDto> lista = proFuncioService.listarFuncio();
        return ResponseEntity.ok(lista);
    }
}
