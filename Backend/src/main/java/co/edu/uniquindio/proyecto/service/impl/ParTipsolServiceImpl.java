package co.edu.uniquindio.proyecto.service.impl;

import co.edu.uniquindio.proyecto.dto.ParTipsolDto.CrearTipsolDto;
import co.edu.uniquindio.proyecto.dto.ParTipsolDto.EditarTipsolDto;
import co.edu.uniquindio.proyecto.dto.ParTipsolDto.InformacionTipsolDto;
import co.edu.uniquindio.proyecto.dto.ParTipsolDto.ListarTipsolDto;
import co.edu.uniquindio.proyecto.model.ParTipsol;
import co.edu.uniquindio.proyecto.repository.ParTipsolRepository;
import co.edu.uniquindio.proyecto.service.ParTipsolService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ParTipsolServiceImpl implements ParTipsolService {

    private final ParTipsolRepository parTipsolRepository;

    @Override
    public String crearTipsol(CrearTipsolDto dto) throws Exception {
        if (parTipsolRepository.existsById(dto.idTipsol())) {
            throw new Exception("El tipo de solicitud con ID " + dto.idTipsol() + " ya existe");
        }

        ParTipsol nuevo = ParTipsol.builder()
                .idTipsol(dto.idTipsol())
                .dsTipsol(dto.dsTipsol())
                .sgTipsol(dto.sgTipsol())
                .estTipsol(dto.estTipsol())
                .build();

        return parTipsolRepository.save(nuevo).getIdTipsol();
    }

    @Override
    public void editarTipsol(EditarTipsolDto dto) throws Exception {
        ParTipsol tipsol = parTipsolRepository.findById(dto.idTipsol())
                .orElseThrow(() -> new Exception("Tipo de solicitud no encontrado"));

        tipsol.setDsTipsol(dto.dsTipsol());
        tipsol.setSgTipsol(dto.sgTipsol());
        tipsol.setEstTipsol(dto.estTipsol());

        parTipsolRepository.save(tipsol);
    }

    @Override
    public void eliminarTipsol(String id) throws Exception {
        ParTipsol tipsol = parTipsolRepository.findById(id)
                .orElseThrow(() -> new Exception("Tipo de solicitud no encontrado"));

        parTipsolRepository.delete(tipsol);
    }

    @Override
    public InformacionTipsolDto obtenerTipsol(String id) throws Exception {
        ParTipsol tipsol = parTipsolRepository.findById(id)
                .orElseThrow(() -> new Exception("Tipo de solicitud no encontrado"));

        return new InformacionTipsolDto(
                tipsol.getIdTipsol(),
                tipsol.getDsTipsol(),
                tipsol.getSgTipsol(),
                tipsol.getEstTipsol()
        );
    }

    @Override
    public List<ListarTipsolDto> listarTipsol() {
        List<ParTipsol> lista = parTipsolRepository.findAll();
        List<ListarTipsolDto> items = new ArrayList<>();

        for (ParTipsol t : lista) {
            items.add(new ListarTipsolDto(t.getIdTipsol(), t.getDsTipsol()));
        }

        return items;
    }
}
