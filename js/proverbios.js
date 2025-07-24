document.addEventListener('DOMContentLoaded', () => {
    // --- OBTENER ELEMENTOS DEL DOM ---
    const proverbioTexto = document.getElementById('proverbio-texto');
    const generarBtn = document.getElementById('generar-proverbio-btn');
    const shareWhatsappBtn = document.getElementById('share-whatsapp');
    const shareTwitterBtn = document.getElementById('share-twitter');

    let todosLosProverbios = [];
    let proverbioActual = '';

    // --- FUNCIÓN PARA ACTUALIZAR LOS ENLACES DE COMPARTIR ---
    function actualizarEnlacesCompartir(proverbio) {
        const textoCodificado = encodeURIComponent(`"${proverbio}" - De mi sitio religioso.`);
        shareWhatsappBtn.href = `https://api.whatsapp.com/send?text=${textoCodificado}`;
        shareTwitterBtn.href = `https://twitter.com/intent/tweet?text=${textoCodificado}`;
    }

    // --- FUNCIÓN PARA MOSTRAR UN NUEVO PROVERBIO ---
    function mostrarNuevoProverbio() {
        if (todosLosProverbios.length === 0) return;

        // Efecto de desvanecimiento (fade out)
        proverbioTexto.style.opacity = '0';

        setTimeout(() => {
            // Seleccionar un nuevo proverbio al azar
            const randomIndex = Math.floor(Math.random() * todosLosProverbios.length);
            proverbioActual = todosLosProverbios[randomIndex];

            // Actualizar el texto y los enlaces
            proverbioTexto.textContent = `“${proverbioActual}”`;
            actualizarEnlacesCompartir(proverbioActual);

            // Efecto de aparición (fade in)
            proverbioTexto.style.opacity = '1';
        }, 300); // Espera 0.3 segundos para que la animación de fade out ocurra
    }

    // --- CARGA INICIAL DE DATOS ---
    fetch('./data/proverbios.json')
        .then(response => response.json())
        .then(data => {
            todosLosProverbios = data.proverbios; // Asumiendo que el JSON tiene una clave "proverbios"
            mostrarNuevoProverbio(); // Muestra el primer proverbio al cargar la página
        })
        .catch(error => {
            console.error("Error al cargar los proverbios:", error);
            proverbioTexto.textContent = 'No se pudieron cargar los proverbios en este momento.';
        });

    // --- EVENT LISTENER PARA EL BOTÓN ---
    generarBtn.addEventListener('click', mostrarNuevoProverbio);
});