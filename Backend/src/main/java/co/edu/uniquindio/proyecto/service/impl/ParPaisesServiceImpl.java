package co.edu.uniquindio.proyecto.service.impl;

import co.edu.uniquindio.proyecto.dto.ParPaisesDto.CrearPaisesDto;
import co.edu.uniquindio.proyecto.dto.ParPaisesDto.EditarPaisesDto;
import co.edu.uniquindio.proyecto.dto.ParPaisesDto.InformacionPaisesDto;
import co.edu.uniquindio.proyecto.dto.ParPaisesDto.ListarPaisesDto;
import co.edu.uniquindio.proyecto.model.ParPaises;
import co.edu.uniquindio.proyecto.repository.ParPaisesRepository;
import co.edu.uniquindio.proyecto.service.ParPaisesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ParPaisesServiceImpl implements ParPaisesService {

    private final ParPaisesRepository paisesRepository;

    @Override
    public Integer crearPais(CrearPaisesDto pais) throws Exception {
        // Validar duplicados
        if(existeNombre(pais.nombre())){
            throw new Exception("El país "+pais.nombre()+" ya existe");
        }

        ParPaises nuevo = ParPaises.builder()
                .nm_paises(pais.nombre())
                .build();

        return paisesRepository.save(nuevo).getId_paises();
    }

    @Override
    public void editarPais(EditarPaisesDto pais) throws Exception {
        ParPaises paisExistente = paisesRepository.findById(pais.id())
                .orElseThrow(() -> new Exception("País con id "+pais.id()+" no encontrado"));

        paisExistente.setNm_paises(pais.nombre());
        paisesRepository.save(paisExistente);
    }

    @Override
    public void eliminarPais(Integer id) throws Exception {
        if(!paisesRepository.existsById(id)){
            throw new Exception("El país con id "+id+" no existe");
        }
        paisesRepository.deleteById(id);
    }

    @Override
    public InformacionPaisesDto obtenerPais(Integer id) throws Exception {
        ParPaises pais = paisesRepository.findById(id)
                .orElseThrow(() -> new Exception("País con id "+id+" no encontrado"));

        return new InformacionPaisesDto(
                pais.getId_paises(),
                pais.getNm_paises()
        );
    }

    @Override
    public List<ListarPaisesDto> listarPaises() {
        return paisesRepository.findAll()
                .stream()
                .map(p -> new ListarPaisesDto(
                        p.getId_paises(),
                        p.getNm_paises()
                ))
                .toList();
    }

    // Método auxiliar
    private boolean existeNombre(String nombre){
        return paisesRepository.findAll().stream()
                .anyMatch(p -> p.getNm_paises().equalsIgnoreCase(nombre));
    }
}
