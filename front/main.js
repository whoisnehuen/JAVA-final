productos = [];

const botonCarrito = document.getElementById('botonCarrito');
const botonBodega = document.getElementById('botonBodega');
const modal = document.getElementById('modal');
const modalBod = document.getElementById('modalBod');
const containerProductos = document.getElementById('productos');
const botonParaCerrar = document.querySelector('.close');

botonCarrito.addEventListener('click', () => {
    updateCartDisplay();
    modal.style.display = 'block';
});

botonBodega.addEventListener('click', () => {
    modalBod.style.display = 'block';
});

botonParaCerrar.addEventListener('click', () => {
    modal.style.display = 'none';
    modalBod.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

function addToCart(button, title, price) {
    const existingItem = productos.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity++; 
    } else {
        productos.push({ title, price, quantity: 1 }); 
    }
    updateCartDisplay();
    updateCartCount(); 
    button.textContent = 'Agregado';
    button.classList.add('added');
}

function updateCartDisplay() {
    containerProductos.innerHTML = ''; 
    let total = 0;
    productos.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <p>${item.title} --> $${item.price} = $${itemTotal}</p>
            <div class="quanty-controls">
                <button class="quantity-btn" onclick="decrementQuantity('${item.title}')">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="incrementQuantity('${item.title}')">+</button>
            </div>
            <button class="remove" onclick="removeFromCart('${item.title}')">Eliminar</button>
        `;
        containerProductos.appendChild(cartItemElement);
    });
    const cartTotalElement = document.getElementById('carritoTotal');
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cantidadProductos');
    const totalCount = productos.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalCount;
}

function removeFromCart(title) {
    productos = productos.filter(item => item.title !== title);
    updateCartDisplay();
    updateCartCount();
}

function incrementQuantity(title) {
    const item = productos.find(item => item.title === title);
    if (item) {
        item.quantity++;
        updateCartDisplay();
        updateCartCount();
    }
}

function decrementQuantity(title) {
    const item = productosCarrito.find(item => item.title === title);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCartDisplay();
        updateCartCount();
    }
}



document.getElementById('btnBodega').addEventListener('click', () => {
    modalBod.style.display = 'block';
});

document.getElementById('formNuevo').addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = e.target;
    const nuevo = {
        nombre: f.nombre.value,
        imagen: f.imagen.value,
        marca: f.marca.value,
        modelo: f.modelo.value,
        color: f.color.value || null,
        precio: Number(f.precio.value),
        cuotas: parseInt(f.cuotas.value) || 0,
        stock: parseInt(f.stock.value) || 0,
        envioGratis: f.envioGratis.checked
    };

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevo)
    });

    if (!res.ok) { alert('No se pudo guardar el producto'); return; }
    f.reset();
    modalBod.style.display = 'none';
    cargarProductos();
});
