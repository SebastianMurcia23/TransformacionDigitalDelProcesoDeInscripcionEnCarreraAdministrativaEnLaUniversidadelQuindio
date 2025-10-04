package co.edu.uniquindio.proyecto.service.impl;

import co.edu.uniquindio.proyecto.dto.ParDepartDto.*;
import co.edu.uniquindio.proyecto.model.ParDepart;
import co.edu.uniquindio.proyecto.model.ParPaises;
import co.edu.uniquindio.proyecto.repository.ParDepartRepository;
import co.edu.uniquindio.proyecto.repository.ParPaisesRepository;
import co.edu.uniquindio.proyecto.service.ParDepartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ParDepartServiceImpl implements ParDepartService {

    private final ParDepartRepository parDepartRepository;
    private final ParPaisesRepository parPaisesRepository;

    @Override
    public Integer crearDepartamento(CrearDepartDto dto) throws Exception {
        ParPaises pais = parPaisesRepository.findById(dto.id_paises())
                .orElseThrow(() -> new Exception("País no encontrado"));

        ParDepart departamento = ParDepart.builder()
                .nm_depart(dto.nm_depart())
                .pais(pais)
                .build();

        return parDepartRepository.save(departamento).getId_depart();
    }

    @Override
    public void editarDepartamento(EditarDepartDto dto) throws Exception {
        ParDepart departamento = parDepartRepository.findById(dto.id_depart())
                .orElseThrow(() -> new Exception("Departamento no encontrado"));

        ParPaises pais = parPaisesRepository.findById(dto.id_paises())
                .orElseThrow(() -> new Exception("País no encontrado"));

        departamento.setNm_depart(dto.nm_depart());
        departamento.setPais(pais);
    }

    @Override
    public void eliminarDepartamento(Integer id) throws Exception {
        if (!parDepartRepository.existsById(id)) {
            throw new Exception("Departamento no encontrado");
        }
        parDepartRepository.deleteById(id);
    }

    @Override
    public InformacionDepartDto obtenerDepartamento(Integer id) throws Exception {
        ParDepart departamento = parDepartRepository.findById(id)
                .orElseThrow(() -> new Exception("Departamento no encontrado"));

        return new InformacionDepartDto(
                departamento.getId_depart(),
                departamento.getNm_depart(),
                departamento.getPais().getNm_paises()
        );
    }

    @Override
    public List<ListarDepartDto> listarDepartamentos() {
        return parDepartRepository.findAll().stream()
                .map(d -> new ListarDepartDto(d.getId_depart(), d.getNm_depart()))
                .collect(Collectors.toList());
    }

    @Override
    public List<ListarDepartDto> listarDepartamentosPorPais(Integer idPais) {
        return parDepartRepository.findByPaisId(idPais).stream()
                .map(d -> new ListarDepartDto(d.getId_depart(), d.getNm_depart()))
                .collect(Collectors.toList());
    }
}