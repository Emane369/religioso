document.addEventListener('DOMContentLoaded', () => {
    fetch('data/proverbios.json')
        .then(response => response.json())
        .then(data => {
            const proverbios = data.proverbios;
            const proverbioDelDia = proverbios[Math.floor(Math.random() * proverbios.length)];
            document.getElementById('proverbio-texto').textContent = proverbioDelDia;
        });
});