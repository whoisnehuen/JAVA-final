productos = [];

const botonCarrito = document.getElementById('botonCarrito');
const modal = document.getElementById('modal');
const containerProductos = document.getElementById('productos');
const botonParaCerrar = document.querySelector('.close');

botonCarrito.addEventListener('click', () => {
    updateCartDisplay();
    modal.style.display = 'block';
});

botonParaCerrar.addEventListener('click', () => {
    modal.style.display = 'none';
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