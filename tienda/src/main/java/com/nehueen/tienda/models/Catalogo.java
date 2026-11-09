package com.nehueen.tienda.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface Catalogo extends JpaRepository<Producto,Integer> {
 // Podés agregar métodos personalizados aquí si son necesarios
}

/* public class Catalogo {
    public static ArrayList<Producto> productos = new ArrayList<>();
    public static ArrayList<String> pedidos = new ArrayList<>();
    static{
        productos.add(new Te("Verde", 100, 10));
        productos.add(new Cafe("Espresso", 150, 200));
        productos.add(new Cafe("Caramel Macchiato", 100, 500));
        productos.add(new Te("Chai", 150, 250));
        productos.add(new Te("Rojo", 50, 10));
        productos.add(new Cafe("Cookie", 50, 200));
        productos.add(new Cafe("Submarino", 200, 200));
        productos.add(new Te("Matcha", 1500, 67000));
    }
} */