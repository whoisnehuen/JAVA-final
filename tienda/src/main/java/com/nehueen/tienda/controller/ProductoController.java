package com.nehueen.tienda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nehueen.tienda.models.*;
import com.nehueen.tienda.services.ProductoService;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "*")
public class ProductoController {
    final ProductoService productoService;
    @Autowired
    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }
    @GetMapping
    public List<Producto> listarProductos() {
        return productoService.listarTodos();
    }
    @GetMapping("/{id}")
    public Producto obtenerProducto(@PathVariable int id) {
        return productoService.obtenerPorId(id);
    }
    @PostMapping
    public Producto crearProducto(@RequestBody Producto nuevo) {
        return productoService.guardar(nuevo);
    }
    @PutMapping("/{id}")
    public Producto actualizarProducto(@PathVariable int id, @RequestBody Producto datos) {
        return productoService.actualizar(id, datos);
    }
    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable int id) {
        productoService.eliminar(id);
    }


    /* public record ProductoRequest(String tipo, String nombre, double precio, int stock) {}
    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public List<Producto> listarProductos() {
        return productoService.listarTodos();
    }
    @GetMapping("/{id}")
    public Producto obtenerProducto(@PathVariable int id) {
        return productoService.obtenerPorId(id);
    }
    @PostMapping
    public Producto crearProducto(@RequestBody ProductoRequest nuevoProducto) {
        return productoService.guardar(
                nuevoProducto.tipo(),
                nuevoProducto.nombre(),
                nuevoProducto.precio(),
                nuevoProducto.stock());
    }
    @GetMapping("/eliminar/{id}")
    public boolean eliminarProducto(@PathVariable int id) {
        return productoService.eliminar(id);
    } */

}