package com.nehueen.tienda.models;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
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
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede tener más de 100 caracteres")
    private String nombre;
    @NotBlank(message = "La imagen es obligatoria")
    private String imagen;
    @Positive(message = "El precio debe ser mayor a 0")
    protected double precio;
    @Min(value = 0, message = "El stock no puede ser negativo")
    private int stock;
    @Min(value = 0, message = "Las cuotas no pueden ser negativas")
    private int cuotas;
    @Size(max = 255, message = "La descripción no puede tener más de 255 caracteres")
    private String info;
    public Producto(String nombre, String imagen, double precio, int stock, int cuotas, String info) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
        this.stock = stock;
        this.cuotas = cuotas;
        this.info = info;
    }
}
