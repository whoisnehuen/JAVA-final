package com.nehueen.tienda.models;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "producto")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "tipo")
@JsonSubTypes({
    @JsonSubTypes.Type(value = Fisico.class, name = "fisico"),
    @JsonSubTypes.Type(value = Digital.class, name = "digital")
})
@Setter
@Getter 
public abstract class Producto {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int id;
    private String nombre;
    private String imagen;
    protected double precio;
    private int stock;
    private int cuotas;
    public Producto(String nombre, String imagen, double precio, int stock, int cuotas) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
        this.stock = stock;
        this.cuotas = cuotas;
    }
}
