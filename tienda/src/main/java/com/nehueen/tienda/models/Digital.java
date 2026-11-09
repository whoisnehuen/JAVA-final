package com.nehueen.tienda.models;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter 
@Setter 
public class Digital extends Producto{
    private String plataforma;
    private String licencia;
    private String desarrollador;
    protected Digital() {
        super("", "", 0, 0, 0);
    }
    public Digital(String nombre, String imagen, double precio, int stock, int cuotas, String plataforma, String licencia, String desarrollador) {
        super(nombre, imagen, precio, stock, cuotas);
        this.plataforma = plataforma;
        this.licencia = licencia;
        this.desarrollador = desarrollador;
    }
}