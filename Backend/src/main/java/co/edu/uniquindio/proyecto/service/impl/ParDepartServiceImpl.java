package co.edu.uniquindio.proyecto.service.impl;

import co.edu.uniquindio.proyecto.dto.ParDepartDto.CrearDepartDto;
import co.edu.uniquindio.proyecto.dto.ParDepartDto.EditarDepartDto;
import co.edu.uniquindio.proyecto.dto.ParDepartDto.InformacionDepartDto;
import co.edu.uniquindio.proyecto.dto.ParDepartDto.ListarDepartDto;
import co.edu.uniquindio.proyecto.model.ParDepart;
import co.edu.uniquindio.proyecto.model.ParPaises;
import co.edu.uniquindio.proyecto.repository.ParDepartRepository;
import co.edu.uniquindio.proyecto.repository.ParPaisesRepository;
import co.edu.uniquindio.proyecto.service.ParDepartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ParDepartServiceImpl implements ParDepartService {

    private final ParDepartRepository parDepartRepository;
    private final ParPaisesRepository parPaisesRepository;

    @Override
    public Integer crearDepartamento(CrearDepartDto dto) throws Exception {
        ParPaises pais = parPaisesRepository.findById(dto.id_paises())
                .orElseThrow(() -> new Exception("País no encontrado"));

        ParDepart nuevo = ParDepart.builder()
                .nm_depart(dto.nm_depart())
                .pais(pais)
                .build();

        return parDepartRepository.save(nuevo).getId_depart();
    }

    @Override
    public void editarDepartamento(EditarDepartDto dto) throws Exception {
        ParDepart depart = parDepartRepository.findById(dto.id_depart())
                .orElseThrow(() -> new Exception("Departamento no encontrado"));

        ParPaises pais = parPaisesRepository.findById(dto.id_paises())
                .orElseThrow(() -> new Exception("País no encontrado"));

        depart.setNm_depart(dto.nm_depart());
        depart.setPais(pais);

        parDepartRepository.save(depart);
    }

    @Override
    public void eliminarDepartamento(Integer id) throws Exception {
        ParDepart depart = parDepartRepository.findById(id)
                .orElseThrow(() -> new Exception("Departamento no encontrado"));

        parDepartRepository.delete(depart);
    }

    @Override
    public InformacionDepartDto obtenerDepartamento(Integer id) throws Exception {
        ParDepart depart = parDepartRepository.findById(id)
                .orElseThrow(() -> new Exception("Departamento no encontrado"));

        return new InformacionDepartDto(
                depart.getId_depart(),
                depart.getNm_depart(),
                depart.getPais().getNm_paises()
        );
    }

    @Override
    public List<ListarDepartDto> listarDepartamentos() {
        List<ParDepart> departamentos = parDepartRepository.findAll();
        List<ListarDepartDto> items = new ArrayList<>();

        for (ParDepart d : departamentos) {
            items.add(new ListarDepartDto(d.getId_depart(), d.getNm_depart()));
        }

        return items;
    }
}
