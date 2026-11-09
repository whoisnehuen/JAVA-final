package com.nehueen.tienda.models;

import jakarta.persistence.Entity;

@Entity
public class Te extends Producto implements Descontable {
    private double descuento = 0.75;

    protected Te() {
        super("", 0, 0);
    }

    public Te(String nombre, double precio, int stock) {
        super(nombre, precio, stock);
    }
    @Override
    public double calcularPrecioFinal() {
        return precio * descuento;
    }
    @Override
    public void aplicarDescuento(double porcentaje) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'aplicarDescuento'");
    }
}