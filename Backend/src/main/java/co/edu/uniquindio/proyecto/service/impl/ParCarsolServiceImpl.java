package co.edu.uniquindio.proyecto.service.impl;

import co.edu.uniquindio.proyecto.dto.ParCarsolDto.CrearCarsolDto;
import co.edu.uniquindio.proyecto.dto.ParCarsolDto.EditarCarsolDto;
import co.edu.uniquindio.proyecto.dto.ParCarsolDto.InformacionCarsolDto;
import co.edu.uniquindio.proyecto.dto.ParCarsolDto.ListarCarsolDto;
import co.edu.uniquindio.proyecto.model.ParCarsol;
import co.edu.uniquindio.proyecto.model.ParTipsol;
import co.edu.uniquindio.proyecto.repository.ParCarsolRepository;
import co.edu.uniquindio.proyecto.repository.ParTipsolRepository;
import co.edu.uniquindio.proyecto.service.ParCarsolService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ParCarsolServiceImpl implements ParCarsolService {

    private final ParCarsolRepository parCarsolRepository;
    private final ParTipsolRepository parTipsolRepository;

    @Override
    public Integer crearCarsol(CrearCarsolDto dto) throws Exception {
        ParTipsol tipsol = parTipsolRepository.findById(dto.idTipsol())
                .orElseThrow(() -> new Exception("Tipo de solicitud no encontrado"));

        ParCarsol nuevo = ParCarsol.builder()
                .dsCarsol(dto.dsCarsol())
                .sgCarsol(dto.sgCarsol())
                .estCarsol(dto.estCarsol())
                .parTipsol(tipsol)
                .build();

        return parCarsolRepository.save(nuevo).getIdCarsol();
    }

    @Override
    public void editarCarsol(EditarCarsolDto dto) throws Exception {
        ParCarsol carsol = parCarsolRepository.findById(dto.idCarsol())
                .orElseThrow(() -> new Exception("Característica de solicitud no encontrada"));

        ParTipsol tipsol = parTipsolRepository.findById(dto.idTipsol())
                .orElseThrow(() -> new Exception("Tipo de solicitud no encontrado"));

        carsol.setDsCarsol(dto.dsCarsol());
        carsol.setSgCarsol(dto.sgCarsol());
        carsol.setEstCarsol(dto.estCarsol());
        carsol.setParTipsol(tipsol);

        parCarsolRepository.save(carsol);
    }

    @Override
    public void eliminarCarsol(Integer id) throws Exception {
        ParCarsol carsol = parCarsolRepository.findById(id)
                .orElseThrow(() -> new Exception("Característica de solicitud no encontrada"));

        parCarsolRepository.delete(carsol);
    }

    @Override
    public InformacionCarsolDto obtenerCarsol(Integer id) throws Exception {
        ParCarsol carsol = parCarsolRepository.findById(id)
                .orElseThrow(() -> new Exception("Característica de solicitud no encontrada"));

        return new InformacionCarsolDto(
                carsol.getIdCarsol(),
                carsol.getDsCarsol(),
                carsol.getSgCarsol(),
                carsol.getEstCarsol(),
                carsol.getParTipsol().getDsTipsol()
        );
    }

    @Override
    public List<ListarCarsolDto> listarCarsol() {
        List<ParCarsol> lista = parCarsolRepository.findAll();
        List<ListarCarsolDto> items = new ArrayList<>();

        for (ParCarsol c : lista) {
            items.add(new ListarCarsolDto(c.getIdCarsol(), c.getDsCarsol()));
        }

        return items;
    }
}
