package co.edu.uniquindio.proyecto.service.impl;

import co.edu.uniquindio.proyecto.dto.ParTipdocDto.CrearTipdocDto;
import co.edu.uniquindio.proyecto.dto.ParTipdocDto.EditarTipdocDto;
import co.edu.uniquindio.proyecto.dto.ParTipdocDto.InformacionTipdocDto;
import co.edu.uniquindio.proyecto.dto.ParTipdocDto.ListarTipdocDto;
import co.edu.uniquindio.proyecto.model.ParTipdoc;
import co.edu.uniquindio.proyecto.repository.ParTipdocRepository;
import co.edu.uniquindio.proyecto.service.ParTipdocService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ParTipdocServiceImpl implements ParTipdocService {

    private final ParTipdocRepository parTipdocRepository;

    @Override
    public Integer crearTipdoc(CrearTipdocDto dto) throws Exception {
        ParTipdoc nuevo = ParTipdoc.builder()
                .ds_tipdoc(dto.ds_tipdoc())
                .build();

        return parTipdocRepository.save(nuevo).getId_tipdoc();
    }

    @Override
    public void editarTipdoc(EditarTipdocDto dto) throws Exception {
        ParTipdoc tipdoc = parTipdocRepository.findById(dto.id_tipdoc())
                .orElseThrow(() -> new Exception("Tipo de documento no encontrado"));

        tipdoc.setDs_tipdoc(dto.ds_tipdoc());

        parTipdocRepository.save(tipdoc);
    }

    @Override
    public void eliminarTipdoc(Integer id) throws Exception {
        ParTipdoc tipdoc = parTipdocRepository.findById(id)
                .orElseThrow(() -> new Exception("Tipo de documento no encontrado"));

        parTipdocRepository.delete(tipdoc);
    }

    @Override
    public InformacionTipdocDto obtenerTipdoc(Integer id) throws Exception {
        ParTipdoc tipdoc = parTipdocRepository.findById(id)
                .orElseThrow(() -> new Exception("Tipo de documento no encontrado"));

        return new InformacionTipdocDto(
                tipdoc.getId_tipdoc(),
                tipdoc.getDs_tipdoc()
        );
    }

    @Override
    public List<ListarTipdocDto> listarTipdoc() {
        List<ParTipdoc> lista = parTipdocRepository.findAll();
        List<ListarTipdocDto> items = new ArrayList<>();

        for (ParTipdoc t : lista) {
            items.add(new ListarTipdocDto(t.getId_tipdoc(), t.getDs_tipdoc()));
        }

        return items;
    }
}
