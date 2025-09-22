package co.edu.uniquindio.proyecto.service.impl;

import co.edu.uniquindio.proyecto.dto.ParDescarDto.CrearDescarDto;
import co.edu.uniquindio.proyecto.dto.ParDescarDto.EditarDescarDto;
import co.edu.uniquindio.proyecto.dto.ParDescarDto.InformacionDescarDto;
import co.edu.uniquindio.proyecto.dto.ParDescarDto.ListarDescarDto;
import co.edu.uniquindio.proyecto.model.ParDescar;
import co.edu.uniquindio.proyecto.model.ParDencar;
import co.edu.uniquindio.proyecto.model.ParNivcar;
import co.edu.uniquindio.proyecto.repository.ParDescarRepository;
import co.edu.uniquindio.proyecto.repository.ParDencarRepository;
import co.edu.uniquindio.proyecto.repository.ParNivcarRepository;
import co.edu.uniquindio.proyecto.service.ParDescarService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ParDescarServiceImpl implements ParDescarService {

    private final ParDescarRepository parDescarRepository;
    private final ParNivcarRepository parNivcarRepository;
    private final ParDencarRepository parDencarRepository;

    @Override
    public Integer crearDescar(CrearDescarDto dto) throws Exception {
        ParNivcar nivcar = parNivcarRepository.findById(dto.id_nivcar())
                .orElseThrow(() -> new Exception("Nivel de cargo no encontrado"));

        ParDencar dencar = parDencarRepository.findById(dto.id_dencar())
                .orElseThrow(() -> new Exception("Denominación de cargo no encontrada"));

        ParDescar nuevo = ParDescar.builder()
                .cdDescar(dto.cdDescar())
                .grDescar(dto.grDescar())
                .dsDescar(dto.dsDescar())
                .estDescar(dto.estDescar())
                .parNivcar(nivcar)
                .parDencar(dencar)
                .build();

        return parDescarRepository.save(nuevo).getIdDescar();
    }

    @Override
    public void editarDescar(EditarDescarDto dto) throws Exception {
        ParDescar descar = parDescarRepository.findById(dto.idDescar())
                .orElseThrow(() -> new Exception("Descripción de cargo no encontrada"));

        ParNivcar nivcar = parNivcarRepository.findById(dto.id_nivcar())
                .orElseThrow(() -> new Exception("Nivel de cargo no encontrado"));

        ParDencar dencar = parDencarRepository.findById(dto.id_dencar())
                .orElseThrow(() -> new Exception("Denominación de cargo no encontrada"));

        descar.setCdDescar(dto.cdDescar());
        descar.setGrDescar(dto.grDescar());
        descar.setDsDescar(dto.dsDescar());
        descar.setEstDescar(dto.estDescar());
        descar.setParNivcar(nivcar);
        descar.setParDencar(dencar);

        parDescarRepository.save(descar);
    }

    @Override
    public void eliminarDescar(Integer id) throws Exception {
        ParDescar descar = parDescarRepository.findById(id)
                .orElseThrow(() -> new Exception("Descripción de cargo no encontrada"));

        parDescarRepository.delete(descar);
    }

    @Override
    public InformacionDescarDto obtenerDescar(Integer id) throws Exception {
        ParDescar descar = parDescarRepository.findById(id)
                .orElseThrow(() -> new Exception("Descripción de cargo no encontrada"));

        return new InformacionDescarDto(
                descar.getIdDescar(),
                descar.getCdDescar(),
                descar.getGrDescar(),
                descar.getDsDescar(),
                descar.getEstDescar(),
                descar.getParNivcar().toString(), // aquí puedes mapear a nombre específico si tienes campo
                descar.getParDencar().toString()
        );
    }

    @Override
    public List<ListarDescarDto> listarDescar() {
        List<ParDescar> lista = parDescarRepository.findAll();
        List<ListarDescarDto> items = new ArrayList<>();

        for (ParDescar d : lista) {
            items.add(new ListarDescarDto(d.getIdDescar(), d.getDsDescar()));
        }

        return items;
    }
}
