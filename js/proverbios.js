<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proverbio Diario</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body class="proverbio-page">
    <header>
        <h1>Proverbio del Día</h1>
        <nav>
            <a href="index.html">Inicio</a>
            <a href="santos.html">Santos, Ángeles y Vírgenes</a>
            <a href="proverbio.html">Proverbio Diario</a>
            <a href="oraciones.html">Oraciones</a>
        </nav>
    </header>

    <main>
        <div id="proverbio-container">
            <div id="proverbio-card">
                <p id="proverbio-texto">Cargando proverbio...</p>
            </div>

            <div class="proverbio-actions">
                <button id="generar-proverbio-btn">Mostrar Otro Proverbio</button>
                <div class="share-buttons">
                    <span>Compartir:</span>
                    <a id="share-whatsapp" href="#" target="_blank" class="share-btn whatsapp">WhatsApp</a>
                    <a id="share-twitter" href="#" target="_blank" class="share-btn twitter">Twitter</a>
                </div>
            </div>
        </div>
    </main>

    <footer>
        <p>&copy; 2025 Tu Sitio Religioso</p>
    </footer>

    <script src="js/proverbios.js"></script>
</body>
</html>