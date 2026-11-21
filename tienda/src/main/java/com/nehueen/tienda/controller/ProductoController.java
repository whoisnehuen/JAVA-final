package com.nehueen.tienda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import jakarta.validation.Valid;
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
    public ResponseEntity<List<Producto>> listarProductos() {
        return ResponseEntity.ok(productoService.listarTodos());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProducto(@PathVariable int id) {
        return ResponseEntity.ok(productoService.obtenerPorId(id));
    }
    @PostMapping
    public ResponseEntity<Producto> crearProducto(@Valid @RequestBody Producto nuevo) {
        Producto creado = productoService.guardar(nuevo);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable int id, @Valid @RequestBody Producto datos) {
        return ResponseEntity.ok(productoService.actualizar(id, datos));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable int id) {
        productoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

}