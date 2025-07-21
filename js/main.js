document.addEventListener('DOMContentLoaded', () => {
    fetch('data/santos.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('info-container');
            let content = '';
            data.forEach(item => {
                content += `
                <div class="card">
                ${item.imagen ? `<img src="${item.imagen}" alt="${item.nombre}" class="santo-imagen">` : ''}
                <div class="card-content">
            <h3>${item.nombre} - ${item.tipo}</h3>
            <p>${item.descripcion}</p>
            </div>
            </div>
            `;
            });
            container.innerHTML = content;
        });
});