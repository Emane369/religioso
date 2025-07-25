document.addEventListener('DOMContentLoaded', () => {
    // --- OBTENER ELEMENTOS DEL DOM ---
    const oracionesContainer = document.getElementById('oraciones-container');
    const filtrosContainer = document.getElementById('filtros-container');
    const searchBar = document.getElementById('search-bar');
    
    let todasLasOraciones = [];
    let audioElements = []; // Para manejar los reproductores de audio
    let audioActual = null; // Para saber qué audio se está reproduciendo

    // --- FUNCIÓN PARA RENDERIZAR LAS ORACIONES ---
    function renderizarOraciones(oraciones) {
        if (!oracionesContainer) return;
        oracionesContainer.innerHTML = '';
        audioElements = []; // Limpiamos la lista de audios

        if (oraciones.length === 0) {
            oracionesContainer.innerHTML = '<p class="no-results">No se encontraron oraciones que coincidan con tu búsqueda.</p>';
            return;
        }

        oraciones.forEach((oracion, index) => {
            // Creamos el elemento de audio pero no lo añadimos al DOM visible
            const audioEl = new Audio(oracion.audio);
            audioEl.preload = 'metadata';
            audioElements.push(audioEl);

            const tieneAudio = oracion.audio && oracion.audio.length > 0;

            oracionesContainer.innerHTML += `
                <div class="oracion-card" data-index="${index}" data-aos="fade-up">
                    <div class="oracion-header">
                        <h4>${oracion.titulo}</h4>
                        <span class="oracion-categoria">${oracion.categoria}</span>
                        <span class="oracion-toggle-icon">+</span>
                    </div>
                    <div class="oracion-cuerpo">
                        <p class="oracion-texto">${oracion.oracion}</p>
                        ${tieneAudio ? `
                        <div class="custom-audio-player">
                            <button class="play-pause-btn" aria-label="Reproducir/Pausar">▶</button>
                            <div class="progress-container">
                                <div class="progress-bar"></div>
                            </div>
                        </div>
                        ` : ''}
                        <div class="oracion-actions">
                            <button class="copy-btn">Copiar Texto</button>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    // --- FUNCIÓN PARA FILTRAR Y RENDERIZAR ---
    function aplicarFiltros() {
        const filtroActivo = document.querySelector('.filtro-btn.active').getAttribute('data-filter');
        const terminoBusqueda = searchBar.value.toLowerCase();
        let oracionesFiltradas = todasLasOraciones;

        if (filtroActivo !== 'Todos') {
            oracionesFiltradas = oracionesFiltradas.filter(item => item.categoria === filtroActivo);
        }
        if (terminoBusqueda) {
            oracionesFiltradas = oracionesFiltradas.filter(item => item.titulo.toLowerCase().includes(terminoBusqueda));
        }
        renderizarOraciones(oracionesFiltradas);
    }

    // --- CARGA INICIAL DE DATOS ---
    fetch('./data/oraciones.json')
        .then(response => response.json())
        .then(data => {
            todasLasOraciones = data;
            aplicarFiltros();
        })
        .catch(error => console.error("Error al cargar las oraciones:", error));

    // --- EVENT LISTENERS (DELEGACIÓN) ---
    oracionesContainer.addEventListener('click', e => {
        const target = e.target;
        
        // Lógica para expandir/colapsar (Accordion)
        const header = target.closest('.oracion-header');
        if (header) {
            header.parentElement.classList.toggle('active');
        }

        // Lógica para el botón de Play/Pause
        if (target.classList.contains('play-pause-btn')) {
            const card = target.closest('.oracion-card');
            const index = card.getAttribute('data-index');
            const audio = audioElements[index];

            if (audio.paused) {
                // Pausar cualquier otro audio que se esté reproduciendo
                if (audioActual && audioActual !== audio) {
                    audioActual.pause();
                }
                audioActual = audio;
                audio.play();
            } else {
                audio.pause();
            }
        }
        
        // Lógica para el botón de Copiar
        if (target.classList.contains('copy-btn')) {
            const texto = target.closest('.oracion-cuerpo').querySelector('.oracion-texto').textContent;
            navigator.clipboard.writeText(texto).then(() => {
                target.textContent = '¡Copiado!';
                setTimeout(() => { target.textContent = 'Copiar Texto'; }, 2000);
            });
        }
    });
    
    // --- LÓGICA PARA ACTUALIZAR ESTADOS DE AUDIO ---
    setInterval(() => {
        audioElements.forEach((audio, index) => {
            const card = oracionesContainer.querySelector(`.oracion-card[data-index="${index}"]`);
            if (!card) return;

            const playBtn = card.querySelector('.play-pause-btn');
            const progressBar = card.querySelector('.progress-bar');
            
            if (audio.paused) {
                playBtn.innerHTML = '▶';
                card.classList.remove('playing');
            } else {
                playBtn.innerHTML = '⏸️';
                card.classList.add('playing');
                // Actualizar barra de progreso
                const progress = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = `${progress}%`;
            }
        });
    }, 500);


    // --- EVENT LISTENERS PARA FILTROS Y BÚSQUEDA ---
    if (filtrosContainer) {
        filtrosContainer.addEventListener('click', e => {
            if (e.target.tagName === 'BUTTON') {
                document.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                aplicarFiltros();
            }
        });
    }
    if (searchBar) {
        searchBar.addEventListener('input', aplicarFiltros);
    }
});