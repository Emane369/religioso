document.addEventListener('DOMContentLoaded', () => {
    // Obtenemos todos los elementos del DOM que necesitamos
    const container = document.getElementById('info-container');
    const filtrosContainer = document.getElementById('filtros-container');
    const searchBar = document.getElementById('search-bar');
    
    let todosLosDatos = []; // Para guardar los datos originales del JSON

    // --- FUNCIÓN PARA RENDERIZAR LAS TARJETAS ---
    // Esta función recibe una lista de datos y los muestra en pantalla
    function renderizarTarjetas(datos) {
        if (!container) return;
        container.innerHTML = ''; // Limpiamos el contenedor
        
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
    }

    // --- FUNCIÓN PARA FILTRAR Y RENDERIZAR ---
    // Esta función centraliza toda la lógica de filtrado
    function aplicarFiltros() {
        // Obtenemos el filtro de categoría activo
        const filtroActivo = document.querySelector('.filtro-btn.active').getAttribute('data-filter');
        // Obtenemos el texto de la barra de búsqueda en minúsculas
        const terminoBusqueda = searchBar.value.toLowerCase();

        let datosFiltrados = todosLosDatos;

        // 1. Aplicamos el filtro por categoría
        if (filtroActivo !== 'Todos') {
            datosFiltrados = datosFiltrados.filter(item => item.tipo === filtroActivo);
        }

        // 2. Aplicamos el filtro por búsqueda sobre el resultado anterior
        if (terminoBusqueda) {
            datosFiltrados = datosFiltrados.filter(item => 
                item.nombre.toLowerCase().includes(terminoBusqueda)
            );
        }

        renderizarTarjetas(datosFiltrados);
    }

    // --- CARGA INICIAL DE DATOS ---
    fetch('./data/santos.json')
        .then(response => response.json())
        .then(data => {
            todosLosDatos = data;
            aplicarFiltros(); // Mostramos todo al principio
        })
        .catch(error => console.error("Error al cargar los datos:", error));

    // --- EVENT LISTENERS (ESCUCHADORES DE EVENTOS) ---
    // Para los botones de categoría
    if (filtrosContainer) {
        filtrosContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                document.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                aplicarFiltros(); // Volvemos a filtrar cuando cambia la categoría
            }
        });
    }

    // Para la barra de búsqueda
    if (searchBar) {
        searchBar.addEventListener('input', aplicarFiltros); // Volvemos a filtrar cada vez que se escribe
    }
});