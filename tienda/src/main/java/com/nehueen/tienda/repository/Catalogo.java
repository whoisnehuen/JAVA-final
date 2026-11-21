package com.nehueen.tienda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nehueen.tienda.models.Producto;
@Repository
public interface Catalogo extends JpaRepository<Producto,Integer> {
 // Podés agregar métodos personalizados aquí si son necesarios
}
