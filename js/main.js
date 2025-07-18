document.addEventListener('DOMContentLoaded', () => {
    fetch('data/santos.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('info-container');
            let content = '';
            data.forEach(item => {
                content += `
                    <div class="card">
                        <h3>${item.nombre} - ${item.tipo}</h3>
                        <p>${item.descripcion}</p>
                    </div>
                `;
            });
            container.innerHTML = content;
        });
});