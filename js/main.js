document.addEventListener('DOMContentLoaded', () => {
    // --- OBTENER ELEMENTOS DEL DOM ---
    const container = document.getElementById('info-container');
    const filtrosContainer = document.getElementById('filtros-container');
    const searchBar = document.getElementById('search-bar');
    const modalContainer = document.getElementById('modal-container');
    const modalCerrarBtn = document.getElementById('modal-cerrar-btn');
    const modalCuerpo = document.getElementById('modal-cuerpo');

    let todosLosDatos = []; // Para guardar los datos originales del JSON

    // --- FUNCIONES DEL MODAL ---
    function abrirModal(item) {
        if (!modalContainer || !modalCuerpo) return;

        modalCuerpo.innerHTML = `
            ${item.imagen ? `<img src="${item.imagen}" alt="${item.nombre}">` : ''}
            <h2>${item.nombre} - ${item.tipo}</h2>
            <p>${item.descripcion}</p>
        `;
        modalContainer.classList.remove('modal-oculto');
        modalContainer.classList.add('modal-visible');
    }

    function cerrarModal() {
        if (!modalContainer) return;
        modalContainer.classList.add('modal-oculto');
        modalContainer.classList.remove('modal-visible');
    }

    // --- FUNCIÓN PARA RENDERIZAR LAS TARJETAS ---
    function renderizarTarjetas(datos) {
        if (!container) return;
        container.innerHTML = ''; // Limpiamos el contenedor
        
        let content = '';
        datos.forEach((item, index) => {
            // Acortamos la descripción para la vista previa
            const descripcionCorta = item.descripcion.substring(0, 100) + '...';

            content += `
                <div class="card" data-aos="fade-up">
                    ${item.imagen ? `<img src="${item.imagen}" alt="${item.nombre}" class="santo-imagen">` : ''}
                    <div class="card-content">
                        <h3>${item.nombre} - ${item.tipo}</h3>
                        <p>${descripcionCorta}</p>
                        <button class="leer-mas-btn" data-index="${index}">Leer más</button>
                    </div>
                </div>
            `;
        });
        container.innerHTML = content;
    }

    // --- FUNCIÓN PARA FILTRAR Y RENDERIZAR ---
    function aplicarFiltros() {
        const filtroActivo = document.querySelector('.filtro-btn.active').getAttribute('data-filter');
        const terminoBusqueda = searchBar.value.toLowerCase();
        let datosFiltrados = todosLosDatos;

        if (filtroActivo !== 'Todos') {
            datosFiltrados = datosFiltrados.filter(item => item.tipo === filtroActivo);
        }
        if (terminoBusqueda) {
            datosFiltrados = datosFiltrados.filter(item => item.nombre.toLowerCase().includes(terminoBusqueda));
        }
        renderizarTarjetas(datosFiltrados);
    }

    // --- CARGA INICIAL DE DATOS ---
    fetch('./data/santos.json')
        .then(response => response.json())
        .then(data => {
            todosLosDatos = data;
            aplicarFiltros();
        })
        .catch(error => console.error("Error al cargar los datos:", error));

    // --- EVENT LISTENERS ---
    // Para los botones de categoría
    if (filtrosContainer) {
        filtrosContainer.addEventListener('click', e => {
            if (e.target.tagName === 'BUTTON') {
                document.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                aplicarFiltros();
            }
        });
    }

    // Para la barra de búsqueda
    if (searchBar) {
        searchBar.addEventListener('input', aplicarFiltros);
    }

    // Para abrir el modal (usando delegación de eventos)
    if (container) {
        container.addEventListener('click', e => {
            if (e.target.classList.contains('leer-mas-btn')) {
                const index = e.target.getAttribute('data-index');
                const itemData = todosLosDatos.find((item, i) => i == index);
                if(itemData) {
                    abrirModal(itemData);
                } else {
                    // Si el item no se encuentra (después de filtrar), lo buscamos por nombre
                    const card = e.target.closest('.card');
                    const nombre = card.querySelector('h3').textContent.split(' - ')[0];
                    const itemOriginal = todosLosDatos.find(item => item.nombre === nombre);
                    if(itemOriginal) abrirModal(itemOriginal);
                }
            }
        });
    }
    
    // Para cerrar el modal
    if (modalCerrarBtn) {
        modalCerrarBtn.addEventListener('click', cerrarModal);
    }
    if (modalContainer) {
        modalContainer.addEventListener('click', e => {
            // Cierra el modal solo si se hace clic en el fondo oscuro
            if (e.target.id === 'modal-container') {
                cerrarModal();
            }
        });
    }
    document.addEventListener('keydown', e => {
        // Cierra el modal con la tecla Escape
        if (e.key === 'Escape' && modalContainer.classList.contains('modal-visible')) {
            cerrarModal();
        }
    });
});