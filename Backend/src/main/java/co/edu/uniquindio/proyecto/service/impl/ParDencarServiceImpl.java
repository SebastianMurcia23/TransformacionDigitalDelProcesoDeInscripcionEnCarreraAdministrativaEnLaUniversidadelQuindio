package co.edu.uniquindio.proyecto.service.impl;

import co.edu.uniquindio.proyecto.dto.ParDencarDto.CrearDencarDto;
import co.edu.uniquindio.proyecto.dto.ParDencarDto.EditarDencarDto;
import co.edu.uniquindio.proyecto.dto.ParDencarDto.InformacionDencarDto;
import co.edu.uniquindio.proyecto.dto.ParDencarDto.ListarDencarDto;
import co.edu.uniquindio.proyecto.model.ParDencar;
import co.edu.uniquindio.proyecto.repository.ParDencarRepository;
import co.edu.uniquindio.proyecto.service.ParDencarService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ParDencarServiceImpl implements ParDencarService {

    private final ParDencarRepository parDencarRepository;

    @Override
    public Integer crearDencar(CrearDencarDto dto) throws Exception {
        ParDencar nuevo = ParDencar.builder()
                .dsDencar(dto.dsDencar())
                .estDencar(dto.estDencar())
                .build();

        return parDencarRepository.save(nuevo).getIdDencar();
    }

    @Override
    public void editarDencar(EditarDencarDto dto) throws Exception {
        ParDencar dencar = parDencarRepository.findById(dto.idDencar())
                .orElseThrow(() -> new Exception("Denominación de cargo no encontrada"));

        dencar.setDsDencar(dto.dsDencar());
        dencar.setEstDencar(dto.estDencar());

        parDencarRepository.save(dencar);
    }

    @Override
    public void eliminarDencar(Integer id) throws Exception {
        ParDencar dencar = parDencarRepository.findById(id)
                .orElseThrow(() -> new Exception("Denominación de cargo no encontrada"));

        parDencarRepository.delete(dencar);
    }

    @Override
    public InformacionDencarDto obtenerDencar(Integer id) throws Exception {
        ParDencar dencar = parDencarRepository.findById(id)
                .orElseThrow(() -> new Exception("Denominación de cargo no encontrada"));

        return new InformacionDencarDto(
                dencar.getIdDencar(),
                dencar.getDsDencar(),
                dencar.getEstDencar()
        );
    }

    @Override
    public List<ListarDencarDto> listarDencar() {
        List<ParDencar> lista = parDencarRepository.findAll();
        List<ListarDencarDto> items = new ArrayList<>();

        for (ParDencar d : lista) {
            items.add(new ListarDencarDto(d.getIdDencar(), d.getDsDencar()));
        }

        return items;
    }
}
