package co.edu.uniquindio.proyecto.service.impl;

import co.edu.uniquindio.proyecto.dto.ParNivcarDto.CrearNivcarDto;
import co.edu.uniquindio.proyecto.dto.ParNivcarDto.EditarNivcarDto;
import co.edu.uniquindio.proyecto.dto.ParNivcarDto.InformacionNivcarDto;
import co.edu.uniquindio.proyecto.dto.ParNivcarDto.ListarNivcarDto;
import co.edu.uniquindio.proyecto.model.ParNivcar;
import co.edu.uniquindio.proyecto.repository.ParNivcarRepository;
import co.edu.uniquindio.proyecto.service.ParNivcarService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ParNivcarServiceImpl implements ParNivcarService {

    private final ParNivcarRepository parNivcarRepository;

    @Override
    public Integer crearNivcar(CrearNivcarDto dto) throws Exception {
        ParNivcar nuevo = ParNivcar.builder()
                .dsNivcar(dto.dsNivcar())
                .estNivcar(dto.estNivcar())
                .build();

        return parNivcarRepository.save(nuevo).getIdNivcar();
    }

    @Override
    public void editarNivcar(EditarNivcarDto dto) throws Exception {
        ParNivcar nivcar = parNivcarRepository.findById(dto.idNivcar())
                .orElseThrow(() -> new Exception("Nivel de cargo no encontrado"));

        nivcar.setDsNivcar(dto.dsNivcar());
        nivcar.setEstNivcar(dto.estNivcar());

        parNivcarRepository.save(nivcar);
    }

    @Override
    public void eliminarNivcar(Integer id) throws Exception {
        ParNivcar nivcar = parNivcarRepository.findById(id)
                .orElseThrow(() -> new Exception("Nivel de cargo no encontrado"));

        parNivcarRepository.delete(nivcar);
    }

    @Override
    public InformacionNivcarDto obtenerNivcar(Integer id) throws Exception {
        ParNivcar nivcar = parNivcarRepository.findById(id)
                .orElseThrow(() -> new Exception("Nivel de cargo no encontrado"));

        return new InformacionNivcarDto(
                nivcar.getIdNivcar(),
                nivcar.getDsNivcar(),
                nivcar.getEstNivcar()
        );
    }

    @Override
    public List<ListarNivcarDto> listarNivcar() {
        List<ParNivcar> lista = parNivcarRepository.findAll();
        List<ListarNivcarDto> items = new ArrayList<>();

        for (ParNivcar n : lista) {
            items.add(new ListarNivcarDto(n.getIdNivcar(), n.getDsNivcar()));
        }

        return items;
    }
}
