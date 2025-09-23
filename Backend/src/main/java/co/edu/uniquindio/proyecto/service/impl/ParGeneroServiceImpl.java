package co.edu.uniquindio.proyecto.service.impl;

import co.edu.uniquindio.proyecto.dto.ParGeneroDto.CrearGeneroDto;
import co.edu.uniquindio.proyecto.dto.ParGeneroDto.EditarGeneroDto;
import co.edu.uniquindio.proyecto.dto.ParGeneroDto.InformacionGeneroDto;
import co.edu.uniquindio.proyecto.dto.ParGeneroDto.ListarGeneroDto;
import co.edu.uniquindio.proyecto.model.ParGenero;
import co.edu.uniquindio.proyecto.repository.ParGeneroRepository;
import co.edu.uniquindio.proyecto.service.ParGeneroService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ParGeneroServiceImpl implements ParGeneroService {

    private final ParGeneroRepository parGeneroRepository;

    @Override
    public Integer crearGenero(CrearGeneroDto dto) throws Exception {
        ParGenero nuevo = ParGenero.builder()
                .ds_genero(dto.ds_genero())
                .sg_genero(dto.sg_genero())
                .build();

        return parGeneroRepository.save(nuevo).getId_genero();
    }

    @Override
    public void editarGenero(EditarGeneroDto dto) throws Exception {
        ParGenero genero = parGeneroRepository.findById(dto.id_genero())
                .orElseThrow(() -> new Exception("Género no encontrado"));

        genero.setDs_genero(dto.ds_genero());
        genero.setSg_genero(dto.sg_genero());

        parGeneroRepository.save(genero);
    }

    @Override
    public void eliminarGenero(Integer id) throws Exception {
        ParGenero genero = parGeneroRepository.findById(id)
                .orElseThrow(() -> new Exception("Género no encontrado"));

        parGeneroRepository.delete(genero);
    }

    @Override
    public InformacionGeneroDto obtenerGenero(Integer id) throws Exception {
        ParGenero genero = parGeneroRepository.findById(id)
                .orElseThrow(() -> new Exception("Género no encontrado"));

        return new InformacionGeneroDto(
                genero.getId_genero(),
                genero.getDs_genero(),
                genero.getSg_genero()
        );
    }

    @Override
    public List<ListarGeneroDto> listarGeneros() {
        List<ParGenero> lista = parGeneroRepository.findAll();
        List<ListarGeneroDto> items = new ArrayList<>();

        for (ParGenero g : lista) {
            items.add(new ListarGeneroDto(g.getId_genero(), g.getDs_genero()));
        }

        return items;
    }
}
