// main.js — UniEje Ing. Software

// Filtros del plan de estudios
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// Validación básica del formulario de contacto
const form = document.getElementById('contacto-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre   = document.getElementById('nombre').value.trim();
    const email    = document.getElementById('email').value.trim();
    const privacidad = document.getElementById('privacidad').checked;

    if (!nombre || !email) {
      alert('Por favor completa los campos de nombre y correo electrónico.');
      return;
    }
    if (!privacidad) {
      alert('Debes aceptar el aviso de privacidad para continuar.');
      return;
    }
    alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');
    form.reset();
  });

}
 // ===== LÓGICA LISTA DE ALUMNOS =====
  const listaAlumnos = [];

    function agregarAlumno() {
  const nombreInput = document.getElementById('alumnoInput');
  const areaInput = document.getElementById('areaInput');
  const habilidadesInput = document.getElementById('habilidadesInput');
  const errorMsg = document.getElementById('errorMsg');

  const nombre = nombreInput.value.trim();
  const area = areaInput.value;
  const habilidades = habilidadesInput.value.trim();

  errorMsg.textContent = '';

  // Validaciones
  if (nombre.length < 3) {
    errorMsg.textContent = 'Nombre inválido.';
    return;
  }

  if (!area) {
    errorMsg.textContent = 'Selecciona un área de interés.';
    return;
  }

  if (habilidades.length < 3) {
    errorMsg.textContent = 'Describe al menos una habilidad.';
    return;
  }

  // Evitar duplicados por nombre
  const existe = listaAlumnos.some(
    alumno => alumno.nombre.toUpperCase() === nombre.toUpperCase()
  );

  if (existe) {
    errorMsg.textContent = 'Este usuario ya existe.';
    return;
  }

  // Agregar objeto
  listaAlumnos.push({ nombre, area, habilidades });

  // Limpiar
  nombreInput.value = '';
  areaInput.value = '';
  habilidadesInput.value = '';

  actualizarInterfaz();
}
      //////==========Funcion para actualizar la interfaz ====
    

function actualizarInterfaz() {
  const contenedor = document.getElementById('contenedorAlumnos');
  const contador = document.getElementById('contadorAlumnos');

  const total = listaAlumnos.length;
  contador.textContent = `${total} alumno${total !== 1 ? 's' : ''}`;

  contenedor.innerHTML = '';

  if (total === 0) {
    contenedor.innerHTML = '<span class="empty-state">Sin alumnos</span>';
    return;
  }

  listaAlumnos.forEach((alumno, index) => {
    const perfilHTML = `
      <div class="perfil">
        <h4>${alumno.nombre}</h4>
        <p><strong>Área:</strong> ${alumno.area}</p>
        <p><strong>Habilidades:</strong> ${alumno.habilidades}</p>
        
      </div>
    `;
    contenedor.innerHTML += perfilHTML;
  });

}
//////==========USO DE GEOLOCALIZACION DE CANVAS Y USO DOM  ====
