import { useState, useEffect } from 'react';
import { API_URL } from '../config';

const estiloBotonModo = (activo) => ({
  backgroundColor: activo ? '#ffbb00' : 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
});

const estiloBotonEnviar = {
  backgroundColor: '#ffbb00',
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const formularioVacio = {
  tipo: 'fisico',
  nombre: '', info: '', imagen: '', precio: '', cuotas: 0, stock: 0,
  marca: '', color: '', envioGratis: false,
  plataforma: '', licencia: '', desarrollador: ''
};

export default function AdminBodega() {
  const [modo, setModo] = useState('agregar');

  // ==========================================
  // LISTA DE PRODUCTOS (para actualizar y eliminar)
  // ==========================================
  const [productosApi, setProductosApi] = useState([]);

  const cargarProductos = () => {
    fetch(`${API_URL}/productos`)
      .then(res => res.json())
      .then(data => setProductosApi(data))
      .catch(err => console.error("Error trayendo productos de la API:", err));
  };

  // Cuando se abre "Actualizar" o "Eliminar", traemos los productos de la API
  useEffect(() => {
    if (modo === 'actualizar' || modo === 'eliminar') {
      cargarProductos();
    }
  }, [modo]);

  // ==========================================
  // LÓGICA PARA AGREGAR (POST)
  // ==========================================
  const [formData, setFormData] = useState(formularioVacio);

  const handleChangeAgregar = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmitAgregar = async (e) => {
    e.preventDefault();

    const productoBase = {
      tipo: formData.tipo,
      nombre: formData.nombre,
      info: formData.info,
      imagen: formData.imagen,
      precio: Number(formData.precio),
      cuotas: Number(formData.cuotas),
      stock: Number(formData.stock),
    };

    // El backend espera "envioGratis" (así se llama el campo en Fisico.java)
    const payloadBackend = formData.tipo === 'fisico'
      ? { ...productoBase, marca: formData.marca, color: formData.color, envioGratis: formData.envioGratis }
      : { ...productoBase, plataforma: formData.plataforma, licencia: formData.licencia, desarrollador: formData.desarrollador };

    try {
      const res = await fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadBackend)
      });

      if (!res.ok) throw new Error('Error en el servidor');
      alert('Producto agregado exitosamente en la base de datos');

      // Limpiamos el formulario (mantenemos el tipo elegido)
      setFormData({ ...formularioVacio, tipo: formData.tipo });
    } catch (error) {
      alert('Error al conectar con la API: ' + error.message);
    }
  };

  // ==========================================
  // LÓGICA PARA ACTUALIZAR (PUT)
  // ==========================================
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [updateData, setUpdateData] = useState({ precio: '', stock: '', cuotas: 0, envioGratis: false, tipo: '' });

  const handleSelectChange = (e) => {
    const id = e.target.value;
    setProductoSeleccionado(id);

    // Autocompletamos con los datos que trajo la API
    const prod = productosApi.find(p => p.id === Number(id));
    if (prod) {
      setUpdateData({
        precio: prod.precio,
        stock: prod.stock,
        cuotas: prod.cuotas,
        envioGratis: prod.envioGratis || false,
        tipo: prod.tipo
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
      const productoOriginal = productosApi.find(p => p.id === Number(productoSeleccionado));

      const payloadCompleto = {
        ...productoOriginal,
        tipo: productoOriginal.tipo || updateData.tipo,
        precio: Number(updateData.precio),
        stock: Number(updateData.stock),
        cuotas: Number(updateData.cuotas),
        envioGratis: updateData.envioGratis
      };

      const res = await fetch(`${API_URL}/productos/${productoSeleccionado}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadCompleto)
      });

      if (!res.ok) throw new Error('Error en el servidor');
      alert('Base de datos actualizada correctamente');
      cargarProductos();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  // ==========================================
  // LÓGICA PARA ELIMINAR (DELETE)
  // ==========================================
  const [productoAEliminar, setProductoAEliminar] = useState('');

  const handleSubmitEliminar = async (e) => {
    e.preventDefault();
    const prod = productosApi.find(p => p.id === Number(productoAEliminar));
    if (!prod) return;

    if (!confirm(`¿Seguro que querés eliminar "${prod.nombre}"? No se puede deshacer.`)) return;

    try {
      const res = await fetch(`${API_URL}/productos/${productoAEliminar}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Error en el servidor');
      alert('Producto eliminado correctamente');
      setProductoAEliminar('');
      cargarProductos();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const productoParaBorrar = productosApi.find(p => p.id === Number(productoAEliminar));

  return (
    <div id="contenidoModalBod" style={{ margin: '50px auto', padding: '20px' }}>
      <h2 style={{ color: 'white', textAlign: 'center' }}>Gestión de Bodega</h2>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '25px' }}>
        <button onClick={() => setModo('agregar')} style={estiloBotonModo(modo === 'agregar')}>Agregar Producto</button>
        <button onClick={() => setModo('actualizar')} style={estiloBotonModo(modo === 'actualizar')}>Actualizar Producto</button>
        <button onClick={() => setModo('eliminar')} style={estiloBotonModo(modo === 'eliminar')}>Eliminar Producto</button>
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
          <textarea name="info" placeholder="Descripción detallada del producto..." value={formData.info} required onChange={handleChangeAgregar} style={{ padding: '10px', borderRadius: '5px', minHeight: '80px', fontFamily: 'inherit' }} />
          <input name="imagen" placeholder="URL imagen" value={formData.imagen} required onChange={handleChangeAgregar} />
          <input name="precio" type="number" step="0.01" min="0" placeholder="Precio ($)" value={formData.precio} required onChange={handleChangeAgregar} />
          <input name="cuotas" type="number" min="0" placeholder="Cuotas" value={formData.cuotas} onChange={handleChangeAgregar} />
          <input name="stock" type="number" min="0" placeholder="Stock" value={formData.stock} required onChange={handleChangeAgregar} />

          <hr style={{ width: '100%', borderColor: 'gray' }} />

          {formData.tipo === 'fisico' && (
            <>
              <input name="marca" placeholder="Marca" value={formData.marca} required onChange={handleChangeAgregar} />
              <input name="color" placeholder="Color" value={formData.color} required onChange={handleChangeAgregar} />
              <label style={{ color: 'white' }}>
                <input name="envioGratis" type="checkbox" checked={formData.envioGratis} onChange={handleChangeAgregar} /> Envío gratis
              </label>
            </>
          )}

          {formData.tipo === 'digital' && (
            <>
              <input name="plataforma" placeholder="Plataforma" value={formData.plataforma} required onChange={handleChangeAgregar} />
              <input name="licencia" placeholder="Licencia" value={formData.licencia} required onChange={handleChangeAgregar} />
              <input name="desarrollador" placeholder="Desarrollador" value={formData.desarrollador} required onChange={handleChangeAgregar} />
            </>
          )}
          <button type="submit" style={estiloBotonEnviar}>Guardar en SQL</button>
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
                <label style={{ color: 'white' }}>
                  <input name="envioGratis" type="checkbox" checked={updateData.envioGratis} onChange={handleChangeActualizar} /> Envío gratis
                </label>
              )}
              <button type="submit" style={estiloBotonEnviar}>Actualizar SQL</button>
            </>
          )}
        </form>
      )}

      {/* FORMULARIO ELIMINAR */}
      {modo === 'eliminar' && (
        <form onSubmit={handleSubmitEliminar} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <select value={productoAEliminar} onChange={(e) => setProductoAEliminar(e.target.value)} required style={{ padding: '10px', borderRadius: '5px' }}>
            <option value="">-- Seleccioná un producto --</option>
            {productosApi.map(prod => (
              <option key={prod.id} value={prod.id}>{prod.nombre}</option>
            ))}
          </select>

          {productoParaBorrar && (
            <>
              <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '5px', color: 'white' }}>
                <p style={{ margin: '0 0 5px 0' }}><strong>{productoParaBorrar.nombre}</strong></p>
                <p style={{ margin: 0 }}>Precio: ${productoParaBorrar.precio} · Stock: {productoParaBorrar.stock} · Tipo: {productoParaBorrar.tipo}</p>
              </div>
              <button type="submit" style={{ ...estiloBotonEnviar, backgroundColor: 'red', color: 'white' }}>Eliminar de SQL</button>
            </>
          )}
        </form>
      )}
    </div>
  );
}
