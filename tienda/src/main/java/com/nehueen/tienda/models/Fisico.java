package com.nehueen.tienda.models;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity 
@Getter 
@Setter 
public class Fisico extends Producto {
    private boolean envioGratis;
    private String color;
    private String marca;
    protected Fisico() {
        super("", "", 0, 0, 0);
    }
    public Fisico(String nombre, String imagen, double precio, int stock, int cuotas, boolean envioGratis, String color, String marca) {
        super(nombre, imagen, precio, stock, cuotas);
        this.envioGratis = envioGratis;
        this.color = color;
        this.marca = marca;
    }
}