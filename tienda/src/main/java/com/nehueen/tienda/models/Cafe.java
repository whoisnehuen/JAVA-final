package com.nehueen.tienda.models;

import jakarta.persistence.Entity;

@Entity 
public class Cafe extends Producto implements Descontable {
    private double descuento = 0.90;
    protected Cafe() {
        super("", 0, 0);
    }
    public Cafe(String nombre, double precio, int stock) {
        super(nombre, precio, stock);
    }
    @Override 
    public double calcularPrecioFinal() {
        return precio * descuento;
    }
    @Override
    public void aplicarDescuento(double porcentaje) {
        throw new UnsupportedOperationException("Unimplemented method 'aplicarDescuento'");
    }
}