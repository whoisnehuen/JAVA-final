package com.nehueen.tienda.exceptions;

public class ProductoNoEncontradoException extends RuntimeException {
    public ProductoNoEncontradoException(int id) {
        super("No existe el producto con id " + id);
    }
}