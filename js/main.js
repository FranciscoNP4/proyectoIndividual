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
//// ==> POR YULIETTE Y FRANK
// Obtenemos los elementos a través del DOM
const canvas = document.getElementById("canvasBebe");
const context = canvas.getContext("2d");
const button = document.getElementById("locateMeBtn");
const resultado = document.getElementById("results");

// Coordenadas de la Universidad de Zaragoza, ESHPAÑA
const uniLatitud = 41.6836; const uniLongitud = -0.8891;

button.addEventListener("click", getLocation);

function getLocation() {
  if (navigator.geolocation) { // If the browser's compatible with geolocation yay!
    navigator.geolocation.getCurrentPosition(
      showPosition, showError
    );
  } else { // Whoops, I guess not
    resultado.innerHTML = "Tu browser no soporta geolocalización sorry!";
  }
}

function showPosition(position) {
  // User coordinates
  const userLatitud = position.coords.latitude;
  const userLongitud = position.coords.longitude;
  // Show 'em
  console.log("Latitud: ", userLatitud);
  console.log("Longitud: ", userLongitud);
  // Calculate distance
  const distance = calcDistance(
    userLatitud, userLongitud, uniLatitud, uniLongitud
  );
  // Show results
  resultado.innerHTML = `<p><strong>Tu ubicación:</strong> </p>
    <p> Latitud: ${userLatitud.toFixed(4)} \n ${userLongitud.toFixed(4)}</p>
    <p> Estás a <strong>${distance.toFixed(2)}</strong> km de la Universidad de Zaragoza.</p>`;
  drawMap(distance);  // Show map
}

function showError(error) {
  resultado.innerHTML = "Ocurrió un error :c";
}

function calcDistance(latUser, longUser, latUni, longUni) {
  const R = 6371; // Earth's radius in kilometers

  const distLat = degreesToRadians(latUni - latUser);
  const distLong = degreesToRadians(longUni - longUser);

  const a =
  Math.sin(distLat / 2) * Math.sin(distLat / 2) + Math.cos(degreesToRadians(latUser)) *
  Math.cos(degreesToRadians(latUni)) * Math.sin(distLong / 2) * Math.sin(distLong / 2);

  const b = 2 * Math.atan2(
    Math.sqrt(a),
    Math.sqrt(1-a)
  );
  return R * b;
}

function degreesToRadians(degrees) { return degrees * (Math.PI / 180); }

function drawMap(distance) {
  // Clean up, clean up, everybpdy clean up!
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Background ambience iykyk
  context.fillStyle = "#dfe6e9";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // User omg
  context.beginPath();
  context.arc(100, 150, 20, 0, Math.PI * 2);
  context.fillStyle = "pink";
  context.fill();

  // University of Zaragoza
  context.beginPath();
  context.arc(400, 150, 20, 0, Math.PI * 2);
  context.fillStyle = "lightblue";
  context.fill();

  // the connection aka line between the two
  context.beginPath();
  context.moveTo(100, 150);
  context.lineTo(400, 150);
  context.strokeStyle = "purple";
  context.lineWidth = 3;
  context.stroke();

  // Can we just talk?
  context.font = "18px Libre Baskerville";
  context.fillStyle = "black";

  context.fillText(
    `Distancia: ${distance.toFixed(2)} km`,
    150,
    100
  );

  context.fillText("Tú", 90, 190);
  context.fillText("Campus", 370, 190);
}