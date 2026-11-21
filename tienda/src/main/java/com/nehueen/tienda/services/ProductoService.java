package com.nehueen.tienda.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nehueen.tienda.exceptions.ProductoNoEncontradoException;
import com.nehueen.tienda.models.*;
import com.nehueen.tienda.repository.Catalogo;

@Service
public class ProductoService {
    private final Catalogo repo;
    @Autowired
    public ProductoService(Catalogo repo) {
        this.repo = repo;
    }
    public List<Producto> listarTodos() {
        return repo.findAll();
    }
    public Producto obtenerPorId(int id) {
        return repo.findById(id)
                .orElseThrow(() -> new ProductoNoEncontradoException(id));
    }
    public Producto guardar(Producto p) {
        return repo.save(p);
    }
    public Producto actualizar(int id, Producto datos) {
        Producto p = obtenerPorId(id);
        if (p != null) {
            p.setNombre(datos.getNombre());
            p.setImagen(datos.getImagen());
            p.setPrecio(datos.getPrecio());
            p.setStock(datos.getStock());
            p.setCuotas(datos.getCuotas());
            p.setInfo(datos.getInfo());
            if (p instanceof Fisico f && datos instanceof Fisico d){
                f.setEnvioGratis(d.isEnvioGratis());
                f.setColor(d.getColor());
                f.setMarca(d.getMarca());
            }
            if (p instanceof Digital dig && datos instanceof Digital d) {
                dig.setPlataforma(d.getPlataforma());
                dig.setLicencia(d.getLicencia());
                dig.setDesarrollador(d.getDesarrollador());
            }
            return repo.save(p);
        }
        return null;
    }
    public void eliminar(int id) {
        if (!repo.existsById(id)) {
            throw new ProductoNoEncontradoException(id);
        }
        repo.deleteById(id);
    }
}

 
 
