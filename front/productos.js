function noDisponible() {
    alert("Página en desarrollo")
}


let Procesador = {
    nombre : "Procesador",
    imagen: "./img/procesador.png",
    marca : "Intel core",
    precio : 302999,
    cuotas : 6,
    modelo : "i5",
    color : "none",
    envioGratis : true,
}

let Gabinete = {
    nombre : "Gabinete",
    imagen: "./img/gabinete.png",
    marca : "Sentey",
    precio : 41400,
    cuotas : false,
    modelo : "office",
    color : "rojo",
    envioGratis : true,
}

let Motherboard = {
    nombre : "Motherboard",
    imagen: "./img/mother.png",
    marca : "MSI",
    precio : 119999,
    cuotas : 6,
    modelo : "B206",
    color : "gris",
    envioGratis : true,
}

let Mouse = {
    nombre : "Mouse",
    imagen: "./img/mouse.png",
    marca : "Genius",
    precio : 5600,
    cuotas : false,
    modelo : "USB",
    color : "rojo",
    envioGratis : false,
}

let Teclado = {
    nombre : "Teclado",
    imagen: "./img/teclado.png",
    marca : "Logitec",
    precio : 46977.85,
    cuotas : false,
    modelo : "Bluetooth",
    color : "rosa",
    envioGratis : false,
}

let Auriculares = {
    nombre: "Auriculares",
    imagen: "./img/auricular.png",
    marca : "JBL",
    precio : 69992.22,
    cuotas : 3,
    modelo : "Bluetooth",
    color : "azul",
    envioGratis : false,
}

let Monitor = {
    nombre: "Monitor",
    imagen: "./img/monitor.png",
    marca : "Samsung",
    precio : 214999,
    cuotas : 9,
    modelo : "LED",
    color : "black",
    envioGratis : true,
}

let Smartphone = {
    nombre: "Smartphone",
    imagen: "./img/smartphone.png",
    marca : "Samsung",
    precio : 2599999,
    cuotas : 12,
    modelo : "S24 Ultra",
    color : "grey",
    envioGratis : true,
}

let Smartwatch = {
    nombre: "Smartwatch",
    imagen: "./img/smartwatch.png",
    marca : "Samsung",
    precio : 92159,
    cuotas : false,
    modelo : "Fit 3",
    color : "black",
    envioGratis : false,
}

let Impresora = {
    nombre: "Impresora 3D",
    imagen: "./img/impresora.webp",
    marca : "Creality",
    precio : 2599999,
    cuotas : 9,
    modelo : "Ender 3 V2",
    envioGratis : true,
}

let Productos = [Procesador, Gabinete, Motherboard, Mouse, Teclado, Auriculares, Monitor, Smartphone, Smartwatch, Impresora];



for (i=0; i < Productos.length; i++){
    let caja = document.createElement("div");
    caja.classList.add("caja-producto");

    let titulo = document.createElement("h2");
    titulo.innerText = Productos[i].nombre;
    caja.appendChild(titulo);

    let _imagen = document.createElement("img");
    _imagen.src = Productos[i].imagen; // Asignar la imagen del producto
    _imagen.alt = Productos[i].nombre; // Texto alternativo
    caja.appendChild(_imagen);

    let _marca = document.createElement("p");
    _marca.innerText = "Marca : " + Productos[i].marca;
    caja.appendChild(_marca);

    let _modelo = document.createElement("p");
    _modelo.innerText = "Modelo : " + Productos[i].modelo;
    caja.appendChild(_modelo);

    let _color = document.createElement("p");
    _color.innerText = "Color : " + Productos[i].color;
    caja.appendChild(_color);

    let _precio = document.createElement("p");
    _precio.innerText = "Precio : $" + Productos[i].precio;
    caja.appendChild(_precio);

    let _cuotas = document.createElement("p");
    if (Productos[i].cuotas == false){
        _cuotas.innerText = "Hasta 24 cuotas CON interés"
    }
    else{
        let precioCuota = Productos[i].precio / Productos[i].cuotas
        _cuotas.innerText = "Hasta " + Productos[i].cuotas + " cuotas SIN interés de $" + precioCuota.toFixed(2)
        _cuotas.style.color = "red";
    }
    caja.appendChild(_cuotas);

    let _envio = document.createElement("p");
    if (Productos[i].envioGratis == true){
        _envio.innerText= "Con envio gratis!"
    }
    else{
         _envio.innerText= "SIN envio gratis"
    }
    caja.appendChild(_envio);

    let btn = document.createElement("div");
    let txt = document.createElement("h3");
    btn.innerHTML = `<button class="add-to-cart-button" onclick="addToCart(this, &quot;${Productos[i].nombre}&quot;, ${Productos[i].precio})">Agregar al carrito</button>`
    caja.appendChild(btn);
    txt.innerText = "Producto agregado!";
    txt.style.color = "green";

    btn.addEventListener("click", function(){
        caja.appendChild(txt);
    });

    document.querySelector("#contenedor").appendChild(caja);
}