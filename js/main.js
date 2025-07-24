document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('info-container');
    const filtrosContainer = document.getElementById('filtros-container');
    let todosLosDatos = []; // Variable para guardar todos los datos originales

    // Función para renderizar (dibujar) las tarjetas
    function renderizarTarjetas(datos) {
        if (!container) return;
        container.innerHTML = ''; // Limpiamos el contenedor primero
        let content = '';
        datos.forEach(item => {
            content += `
                <div class="card" data-aos="fade-up">
                    ${item.imagen ? `<img src="${item.imagen}" alt="${item.nombre}" class="santo-imagen">` : ''}
                    <div class="card-content">
                        <h3>${item.nombre} - ${item.tipo}</h3>
                        <p>${item.descripcion}</p>
                    </div>
                </div>
            `;
        });
        container.innerHTML = content;
        // Re-inicializamos AOS para las nuevas tarjetas si es necesario, aunque con 'once:true' no debería hacer falta.
        // Si las animaciones no funcionan al filtrar, podemos añadir AOS.refresh() aquí.
    }

    // Cargar los datos iniciales
    fetch('./data/santos.json')
        .then(response => response.json())
        .then(data => {
            todosLosDatos = data; // Guardamos los datos originales
            renderizarTarjetas(todosLosDatos); // Mostramos todas las tarjetas al principio
        })
        .catch(error => {
            console.error("Error al cargar los datos de los santos:", error);
            if(container) container.innerHTML = '<p>Error al cargar el contenido.</p>';
        });

    // Lógica para los botones de filtro
    if (filtrosContainer) {
        filtrosContainer.addEventListener('click', (e) => {
            // Nos aseguramos de que se hizo clic en un botón
            if (e.target.tagName === 'BUTTON') {
                const filtro = e.target.getAttribute('data-filter');

                // Manejar la clase 'active' para los botones
                document.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                // Filtrar los datos y renderizar de nuevo
                if (filtro === 'Todos') {
                    renderizarTarjetas(todosLosDatos);
                } else {
                    const datosFiltrados = todosLosDatos.filter(item => item.tipo === filtro);
                    renderizarTarjetas(datosFiltrados);
                }
            }
        });
    }
});