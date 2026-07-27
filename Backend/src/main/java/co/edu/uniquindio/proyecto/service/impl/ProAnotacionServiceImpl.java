package co.edu.uniquindio.proyecto.service.impl;

import co.edu.uniquindio.proyecto.dto.ProAnotacionDto.CrearAnotacionDto;
import co.edu.uniquindio.proyecto.dto.ProAnotacionDto.ListarAnotacionDto;
import co.edu.uniquindio.proyecto.model.*;
import co.edu.uniquindio.proyecto.repository.*;
import co.edu.uniquindio.proyecto.service.ProAnotacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProAnotacionServiceImpl implements ProAnotacionService {

    private final ProAnotacionRepository proAnotacionRepository;
    private final ProFuncioRepository    proFuncioRepository;
    private final ParTipsolRepository    parTipsolRepository;
    private final ParDescarRepository    parDescarRepository;
    private final ParCarsolRepository    parCarsolRepository;

    @Override
    public Integer crearAnotacion(CrearAnotacionDto dto) throws Exception {
        ProFuncio funcio = proFuncioRepository.findById(dto.idFuncio())
                .orElseThrow(() -> new Exception("Funcionario no encontrado"));

        ParTipsol tipsol = parTipsolRepository.findById(dto.idTipsol())
                .orElseThrow(() -> new Exception("Tipo de solicitud no encontrado"));

        ParDescar descar = null;
        if (dto.idDescar() != null) {
            descar = parDescarRepository.findById(dto.idDescar())
                    .orElseThrow(() -> new Exception("Cargo no encontrado"));
        }

        List<ParCarsol> carsoles = new ArrayList<>();
        if (dto.idCarsoles() != null) {
            for (Integer idC : dto.idCarsoles()) {
                carsoles.add(parCarsolRepository.findById(idC)
                        .orElseThrow(() -> new Exception("Carsol no encontrado: " + idC)));
            }
        }

        ProAnotacion anotacion = ProAnotacion.builder()
                .funcio(funcio)
                .tipsol(tipsol)
                .descar(descar)
                .actoAdministrativo(dto.actoAdministrativo())
                .fechaAnotacion(dto.fechaAnotacion())
                .fechaIniComision(dto.fechaIniComision())
                .fechaFinComision(dto.fechaFinComision())
                .carsoles(carsoles)
                .build();

        return proAnotacionRepository.save(anotacion).getIdAnotacion();
    }

    @Override
    public void eliminarAnotacion(Integer id) throws Exception {
        ProAnotacion a = proAnotacionRepository.findById(id)
                .orElseThrow(() -> new Exception("Anotación no encontrada"));
        proAnotacionRepository.delete(a);
    }

    @Override
    public List<ListarAnotacionDto> listarPorFuncionario(Integer idFuncio) {
        List<ProAnotacion> lista = proAnotacionRepository.findByFuncioId(idFuncio); // <-- cambio aquí
        List<ListarAnotacionDto> resultado = new ArrayList<>();

        for (ProAnotacion a : lista) {
            List<String> dsCarsoles = a.getCarsoles().stream()
                    .map(ParCarsol::getDsCarsol)
                    .toList();

            resultado.add(new ListarAnotacionDto(
                    a.getIdAnotacion(),
                    a.getTipsol().getIdTipsol(),
                    a.getTipsol().getDsTipsol(),
                    a.getActoAdministrativo(),
                    a.getFechaAnotacion(),
                    a.getFechaIniComision(),
                    a.getFechaFinComision(),
                    a.getDescar() != null ? a.getDescar().getIdDescar()  : null,
                    a.getDescar() != null ? a.getDescar().getDsDescar()  : null,
                    a.getDescar() != null ? a.getDescar().getCdDescar()  : null,
                    a.getDescar() != null ? a.getDescar().getGrDescar()  : null,
                    dsCarsoles
            ));
        }
        return resultado;
    }
}