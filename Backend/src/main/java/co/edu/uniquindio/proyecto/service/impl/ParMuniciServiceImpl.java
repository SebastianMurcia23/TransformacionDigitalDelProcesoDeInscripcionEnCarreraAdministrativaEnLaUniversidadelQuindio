package co.edu.uniquindio.proyecto.service.impl;

import co.edu.uniquindio.proyecto.dto.ParMuniciDto.CrearMuniciDto;
import co.edu.uniquindio.proyecto.dto.ParMuniciDto.EditarMuniciDto;
import co.edu.uniquindio.proyecto.dto.ParMuniciDto.InformacionMuniciDto;
import co.edu.uniquindio.proyecto.dto.ParMuniciDto.ListarMuniciDto;
import co.edu.uniquindio.proyecto.model.ParDepart;
import co.edu.uniquindio.proyecto.model.ParMunici;
import co.edu.uniquindio.proyecto.repository.ParDepartRepository;
import co.edu.uniquindio.proyecto.repository.ParMuniciRepository;
import co.edu.uniquindio.proyecto.service.ParMuniciService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ParMuniciServiceImpl implements ParMuniciService {

    private final ParMuniciRepository parMuniciRepository;
    private final ParDepartRepository parDepartRepository;

    @Override
    public Integer crearMunicipio(CrearMuniciDto dto) throws Exception {
        ParDepart depart = parDepartRepository.findById(dto.id_depart())
                .orElseThrow(() -> new Exception("Departamento no encontrado"));

        ParMunici nuevo = ParMunici.builder()
                .nm_munici(dto.nm_munici())
                .depart(depart)
                .build();

        return parMuniciRepository.save(nuevo).getId_munici();
    }

    @Override
    public void editarMunicipio(EditarMuniciDto dto) throws Exception {
        ParMunici munici = parMuniciRepository.findById(dto.id_munici())
                .orElseThrow(() -> new Exception("Municipio no encontrado"));

        ParDepart depart = parDepartRepository.findById(dto.id_depart())
                .orElseThrow(() -> new Exception("Departamento no encontrado"));

        munici.setNm_munici(dto.nm_munici());
        munici.setDepart(depart);

        parMuniciRepository.save(munici);
    }

    @Override
    public void eliminarMunicipio(Integer id) throws Exception {
        ParMunici munici = parMuniciRepository.findById(id)
                .orElseThrow(() -> new Exception("Municipio no encontrado"));

        parMuniciRepository.delete(munici);
    }

    @Override
    public InformacionMuniciDto obtenerMunicipio(Integer id) throws Exception {
        ParMunici munici = parMuniciRepository.findById(id)
                .orElseThrow(() -> new Exception("Municipio no encontrado"));

        return new InformacionMuniciDto(
                munici.getId_munici(),
                munici.getNm_munici(),
                munici.getDepart().getNm_depart()
        );
    }

    @Override
    public List<ListarMuniciDto> listarMunicipios() {
        List<ParMunici> municipios = parMuniciRepository.findAll();
        List<ListarMuniciDto> items = new ArrayList<>();

        for (ParMunici m : municipios) {
            items.add(new ListarMuniciDto(m.getId_munici(), m.getNm_munici()));
        }

        return items;
    }
}
