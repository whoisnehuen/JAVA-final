package com.nehueen.tienda.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nehueen.tienda.models.*;

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
        return repo.findById(id).orElse(null);
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
            return repo.save(p);
        }
        return null;
    }
    public boolean eliminar(int id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}

 
 