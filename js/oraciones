document.addEventListener('DOMContentLoaded', () => {
    fetch('data/oraciones.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('oraciones-container');
            let content = '';
            data.forEach(oracion => {
                content += `
                    <div class="card">
                        <h3>${oracion.titulo}</h3>
                        <p>${oracion.oracion}</p>
                        <audio controls>
                            <source src="${oracion.audio}" type="audio/mpeg">
                            Tu navegador no soporta el elemento de audio.
                        </audio>
                    </div>
                `;
            });
            container.innerHTML = content;
        });
});