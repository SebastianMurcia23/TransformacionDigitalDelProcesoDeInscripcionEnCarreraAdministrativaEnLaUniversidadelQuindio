package co.edu.uniquindio.proyecto.service.impl;

import co.edu.uniquindio.proyecto.dto.ProFuncioDto.CrearFuncioDto;
import co.edu.uniquindio.proyecto.dto.ProFuncioDto.EditarFuncioDto;
import co.edu.uniquindio.proyecto.dto.ProFuncioDto.InformacionFuncioDto;
import co.edu.uniquindio.proyecto.dto.ProFuncioDto.ListarFuncioDto;
import co.edu.uniquindio.proyecto.model.*;
import co.edu.uniquindio.proyecto.repository.*;
import co.edu.uniquindio.proyecto.service.ProFuncioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProFuncioServiceImpl implements ProFuncioService {

    private final ProFuncioRepository proFuncioRepository;
    private final ParTipdocRepository parTipdocRepository;
    private final ParGeneroRepository parGeneroRepository;
    private final ParDepartRepository parDepartRepository;
    private final ParMuniciRepository parMuniciRepository;
    private final ParPaisesRepository parPaisesRepository;

    @Override
    public Integer crearFuncio(CrearFuncioDto dto) throws Exception {
        ParTipdoc tipdoc = parTipdocRepository.findById(dto.id_tipdoc())
                .orElseThrow(() -> new Exception("Tipo de documento no encontrado"));

        ParGenero genero = parGeneroRepository.findById(dto.id_genero())
                .orElseThrow(() -> new Exception("Género no encontrado"));

        ParMunici munici = parMuniciRepository.findById(dto.id_munici())
                .orElseThrow(() -> new Exception("Municipio no encontrado"));

        ParDepart depart = parDepartRepository.findById(dto.id_depart())
                .orElseThrow(() -> new Exception("Departamento no encontrado"));

        ParPaises pais = parPaisesRepository.findById(dto.id_pais())
                .orElseThrow(() -> new Exception("País no encontrado"));

        ProFuncio nuevo = ProFuncio.builder()
                .id_funcio(dto.id_funcio())
                .tipdoc(tipdoc)
                .genero(genero)
                .nm_func1(dto.nm_func1())
                .nm_func2(dto.nm_func2())
                .ap_func1(dto.ap_func1())
                .ap_func2(dto.ap_func2())
                .pais(pais)
                .depart(depart)
                .munici(munici)
                .no_funcio(dto.no_funcio())
                .ce_funcio(dto.ce_funcio())
                .build();

        return proFuncioRepository.save(nuevo).getId_funcio();
    }

    @Override
    public void editarFuncio(EditarFuncioDto dto) throws Exception {
        ProFuncio funcio = proFuncioRepository.findById(dto.id_funcio())
                .orElseThrow(() -> new Exception("Funcionario no encontrado"));

        ParTipdoc tipdoc = parTipdocRepository.findById(dto.id_tipdoc())
                .orElseThrow(() -> new Exception("Tipo de documento no encontrado"));

        ParGenero genero = parGeneroRepository.findById(dto.id_genero())
                .orElseThrow(() -> new Exception("Género no encontrado"));

        ParMunici munici = parMuniciRepository.findById(dto.id_munici())
                .orElseThrow(() -> new Exception("Municipio no encontrado"));

        ParDepart depart = parDepartRepository.findById(dto.id_depart())
                .orElseThrow(() -> new Exception("Departamento no encontrado"));

        ParPaises pais = parPaisesRepository.findById(dto.id_pais())
                .orElseThrow(() -> new Exception("País no encontrado"));

        funcio.setTipdoc(tipdoc);
        funcio.setGenero(genero);
        funcio.setNm_func1(dto.nm_func1());
        funcio.setNm_func2(dto.nm_func2());
        funcio.setAp_func1(dto.ap_func1());
        funcio.setAp_func2(dto.ap_func2());
        funcio.setPais(pais);
        funcio.setDepart(depart);
        funcio.setMunici(munici);
        funcio.setNo_funcio(dto.no_funcio());
        funcio.setCe_funcio(dto.ce_funcio());

        proFuncioRepository.save(funcio);
    }

    @Override
    public void eliminarFuncio(Integer id) throws Exception {
        ProFuncio funcio = proFuncioRepository.findById(id)
                .orElseThrow(() -> new Exception("Funcionario no encontrado"));

        proFuncioRepository.delete(funcio);
    }

    @Override
    public InformacionFuncioDto obtenerFuncio(Integer id) throws Exception {
        ProFuncio funcio = proFuncioRepository.findById(id)
                .orElseThrow(() -> new Exception("Funcionario no encontrado"));

        return new InformacionFuncioDto(
                funcio.getId_funcio(),
                funcio.getTipdoc().getDs_tipdoc(),
                funcio.getGenero().getDs_genero(),
                funcio.getNm_func1(),
                funcio.getNm_func2(),
                funcio.getAp_func1(),
                funcio.getAp_func2(),
                funcio.getPais().getId_paises(),
                funcio.getDepart().getId_depart(),
                funcio.getMunici().getId_munici(),
                funcio.getNo_funcio(),
                funcio.getCe_funcio()
        );
    }

    @Override
    public List<ListarFuncioDto> listarFuncio() {
        List<ProFuncio> lista = proFuncioRepository.findAll();
        List<ListarFuncioDto> items = new ArrayList<>();

        for (ProFuncio f : lista) {
            items.add(new ListarFuncioDto(f.getId_funcio(), f.getNm_func1(),f.getNm_func2(),f.getAp_func1(),f.getAp_func2(),f.getCe_funcio()));
        }

        return items;
    }
}
