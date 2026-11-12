import { useState, useEffect } from 'react';

export default function AdminBodega() {
  const [modo, setModo] = useState('agregar');

  // ==========================================
  // LÓGICA PARA AGREGAR (POST)
  // ==========================================
  const [formData, setFormData] = useState({
    tipo: 'fisico', 
    nombre: '', info: '', imagen: '', precio: '', cuotas: 0, stock: 0,
    marca: '', color: '', envio: false,
    plataforma: '', licencia: '', desarrollador: ''
  });

  const handleChangeAgregar = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmitAgregar = async (e) => {
    e.preventDefault();
    
    const productoBase = {
      tipo: formData.tipo,
      nombre: formData.nombre,
      info: formData.info, // Campo nuevo
      imagen: formData.imagen,
      precio: Number(formData.precio),
      cuotas: Number(formData.cuotas),
      stock: Number(formData.stock),
    };



    
    const payloadBackend = formData.tipo === 'fisico' 
      ? { ...productoBase, marca: formData.marca, color: formData.color, envio: formData.envio }
      : { ...productoBase, plataforma: formData.plataforma, licencia: formData.licencia, desarrollador: formData.desarrollador };

    try {
      // Conexión real a tu API en Java
      const res = await fetch('https://tiendaapi-xrv5.onrender.com/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadBackend)
      });

      if (!res.ok) throw new Error('Error en el servidor');
      alert('Producto agregado exitosamente en la base de datos');
      
      // Limpiamos el formulario
      setFormData({ ...formData, nombre: '', info: '', precio: '', stock: '' });
    } catch (error) {
      alert('Error al conectar con la API: ' + error.message);
    }
  };

  // ==========================================
  // LÓGICA PARA ACTUALIZAR (PUT)
  // ==========================================
  const [productosApi, setProductosApi] = useState([]); // Guarda lo que devuelve el GET
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [updateData, setUpdateData] = useState({ precio: '', stock: '', cuotas: 0, envio: false, tipo: '' });

  // Cuando se abre la pestaña "Actualizar", hacemos un GET a la API
  useEffect(() => {
    if (modo === 'actualizar') {
      fetch('https://tiendaapi-xrv5.onrender.com/productos')
        .then(res => res.json())
        .then(data => setProductosApi(data))
        .catch(err => console.error("Error trayendo productos de la API:", err));
    }
  }, [modo]);

  const handleSelectChange = (e) => {
    const id = e.target.value;
    setProductoSeleccionado(id);
    
    // Autocompletamos con los datos que trajo la API
    const prod = productosApi.find(p => p.id === Number(id) || p.id === id);
    if (prod) {
      setUpdateData({ 
        precio: prod.precio, stock: prod.stock, cuotas: prod.cuotas, envio: prod.envio || false, tipo: prod.tipo 
      });
    }
  };

  const handleChangeActualizar = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdateData({ ...updateData, [name]: type === 'checkbox' ? checked : value });
  };

const handleSubmitActualizar = async (e) => {
    e.preventDefault();
    try {
      const productoOriginal = productosApi.find(p => p.id == productoSeleccionado);

      const payloadCompleto = {
         ...productoOriginal,
         tipo: productoOriginal.tipo || updateData.tipo, // <-- FORZAMOS QUE VIAJE EL TIPO
         precio: Number(updateData.precio),
         stock: Number(updateData.stock),
         cuotas: Number(updateData.cuotas),
         envio: updateData.envio
      };

      const res = await fetch(`https://tiendaapi-xrv5.onrender.com/productos/${productoSeleccionado}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadCompleto) 
      });

      if (!res.ok) throw new Error('Error en el servidor');
      alert('Base de datos actualizada correctamente');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div id="contenidoModalBod" style={{ margin: '50px auto', padding: '20px' }}>
      <h2 style={{ color: 'white', textAlign: 'center' }}>Gestión de Bodega</h2>
      
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '25px' }}>
        <button onClick={() => setModo('agregar')} style={{ backgroundColor: modo === 'agregar' ? '#ffbb00' : 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Agregar Producto</button>
        <button onClick={() => setModo('actualizar')} style={{ backgroundColor: modo === 'actualizar' ? '#ffbb00' : 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Actualizar Producto</button>
      </div>

      {/* FORMULARIO AGREGAR */}
      {modo === 'agregar' && (
        <form onSubmit={handleSubmitAgregar} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '5px', color: 'white' }}>
            <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Tipo:</label>
            <select name="tipo" value={formData.tipo} onChange={handleChangeAgregar} style={{ padding: '5px' }}>
              <option value="fisico">Físico</option>
              <option value="digital">Digital</option>
            </select>
          </div>

          <input name="nombre" placeholder="Nombre" value={formData.nombre} required onChange={handleChangeAgregar} />
          
          {/* Nuevo campo Descripción */}
          <textarea name="info" placeholder="Descripción detallada del producto..." value={formData.info} required onChange={handleChangeAgregar} style={{ padding: '10px', borderRadius: '5px', minHeight: '80px', fontFamily: 'inherit' }} />
          
          <input name="imagen" placeholder="URL imagen" value={formData.imagen} required onChange={handleChangeAgregar} />
          <input name="precio" type="number" step="0.01" min="0" placeholder="Precio ($)" value={formData.precio} required onChange={handleChangeAgregar} />
          <input name="cuotas" type="number" min="0" placeholder="Cuotas" value={formData.cuotas} onChange={handleChangeAgregar} />
          <input name="stock" type="number" min="0" placeholder="Stock" value={formData.stock} required onChange={handleChangeAgregar} />

          <hr style={{ width: '100%', borderColor: 'gray' }} />

          {formData.tipo === 'fisico' && (
            <>
              <input name="marca" placeholder="Marca" required onChange={handleChangeAgregar} />
              <input name="color" placeholder="Color" required onChange={handleChangeAgregar} />
              <label style={{ color: 'white' }}><input name="envio" type="checkbox" checked={formData.envio} onChange={handleChangeAgregar} /> Habilitar envío</label>
            </>
          )}

          {formData.tipo === 'digital' && (
            <>
              <input name="plataforma" placeholder="Plataforma" required onChange={handleChangeAgregar} />
              <input name="licencia" placeholder="Licencia" required onChange={handleChangeAgregar} />
              <input name="desarrollador" placeholder="Desarrollador" required onChange={handleChangeAgregar} />
            </>
          )}
          <button type="submit" style={{ backgroundColor: '#ffbb00', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Guardar en SQL</button>
        </form>
      )}

      {/* FORMULARIO ACTUALIZAR */}
      {modo === 'actualizar' && (
        <form onSubmit={handleSubmitActualizar} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <select value={productoSeleccionado} onChange={handleSelectChange} required style={{ padding: '10px', borderRadius: '5px' }}>
            <option value="">-- Seleccioná un producto --</option>
            {productosApi.map(prod => (
              <option key={prod.id} value={prod.id}>{prod.nombre}</option>
            ))}
          </select>

          {productoSeleccionado && (
            <>
              <label style={{ color: 'white', marginBottom: '-5px' }}>Precio ($):</label>
              <input name="precio" type="number" step="0.01" min="0" value={updateData.precio} onChange={handleChangeActualizar} required />
              <label style={{ color: 'white', marginBottom: '-5px' }}>Stock:</label>
              <input name="stock" type="number" min="0" value={updateData.stock} onChange={handleChangeActualizar} required />
              <label style={{ color: 'white', marginBottom: '-5px' }}>Cuotas:</label>
              <input name="cuotas" type="number" min="0" value={updateData.cuotas} onChange={handleChangeActualizar} required />
              
              {updateData.tipo === 'fisico' && (
                <label style={{ color: 'white' }}><input name="envio" type="checkbox" checked={updateData.envio} onChange={handleChangeActualizar} /> Envío disponible</label>
              )}
              <button type="submit" style={{ backgroundColor: '#ffbb00', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Actualizar SQL</button>
            </>
          )}
        </form>
      )}
    </div>
  );
}