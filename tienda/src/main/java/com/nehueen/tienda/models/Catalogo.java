package com.nehueen.tienda.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface Catalogo extends JpaRepository<Producto,Integer> {
 // Podés agregar métodos personalizados aquí si son necesarios
}
