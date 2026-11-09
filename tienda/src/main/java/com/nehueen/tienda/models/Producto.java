package com.nehueen.tienda.models;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
interface Descontable {
    void aplicarDescuento(double porcentaje);
}

@Entity
@Table(name = "producto")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "tipo")
@JsonSubTypes({
    @JsonSubTypes.Type(value = Cafe.class, name = "cafe"),
    @JsonSubTypes.Type(value = Te.class, name = "te")
})
@Setter
@Getter 
public abstract class Producto {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;
    private String nombre;
    protected double precio;
    private int stock;
    public Producto(String nombre, double precio, int stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
    public abstract double calcularPrecioFinal();
}
