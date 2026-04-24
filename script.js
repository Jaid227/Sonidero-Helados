// ========================
// SCRIPT: Sonidero & Helados
// Funcionalidades:
// - Cargar imágenes y videos dinámicamente según carpetas (simulado)
// - Modo nocturno/claro
// - Pantalla completa con primer click, cerrar con segundo click en cualquier lugar
// - WhatsApp integrado
// ========================

document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURACIÓN EDITABLE (para cambiar archivos fácilmente) ---
    // Aquí defines qué archivos mostrar en cada galería.
    // Puedes modificar estos arrays para agregar o quitar imágenes/videos.
    // Los archivos deben estar dentro de las carpetas: imagenes/ y videos/
    // Estructura sugerida:
    // imagenes/sonidero/foto1.jpg, foto2.png
    // imagenes/helados/cono.jpg
    // imagenes/ambos/fiesta.jpg
    // videos/sonidero/mezcla.mp4
    // videos/helados/preparacion.mp4
    // videos/ambos/promo.mp4
    
    const mediaLibrary = {
        imagenes: {
            sonidero: [
                { src: "imagenes/sonidero/equipo1.jpg", caption: "Consola profesional" },
                { src: "imagenes/sonidero/fiesta.jpg", caption: "Evento masivo" },
                { src: "imagenes/sonidero/djset.jpg", caption: "Luces y sonido" },
                { src: "imagenes/sonidero/publico.jpg", caption: "Ambiente único" }
            ],
            helados: [
                { src: "imagenes/helados/variedad.jpg", caption: "Sabores artesanales" },
                { src: "imagenes/helados/cono.jpg", caption: "Cono clásico" },
                { src: "imagenes/helados/barquilla.jpg", caption: "Barquilla especial" },
                { src: "imagenes/helados/frutales.jpg", caption: "Helados de fruta" }
            ],
            ambos: [
                { src: "imagenes/ambos/evento_completo.jpg", caption: "Fiesta + Helados" },
                { src: "imagenes/ambos/niños_felices.jpg", caption: "Niños disfrutando" },
                { src: "imagenes/ambos/pista_baile.jpg", caption: "Pista con música" }
            ]
        },
        videos: {
            sonidero: [
                { src: "videos/sonidero/mezcla_demo.mp4", caption: "Mezcla en vivo" },
                { src: "videos/sonidero/evento_exito.mp4", caption: "Evento reciente" }
            ],
            helados: [
                { src: "videos/helados/preparacion.mp4", caption: "Cómo hacemos helados" },
                { src: "videos/helados/promo_helados.mp4", caption: "Promo verano" }
            ],
            ambos: [
                { src: "videos/ambos/combo_fiesta.mp4", caption: "Pack Sonidero+Helados" }
            ]
        }
    };
    
    // Si prefieres no modificar el código cada vez que agregas archivos,
    // también puedes crear manualmente los elementos en el HTML.
    // Pero esta función permite generar las galerías desde JS.
    
    // Función para poblar galerías según data-folder y data-type
    function populateGalleries() {
        // Seleccionamos todas las .gallery
        const galleries = document.querySelectorAll('.gallery');
        galleries.forEach(gallery => {
            const type = gallery.getAttribute('data-type'); // 'image' o 'video'
            const folder = gallery.getAttribute('data-folder'); // 'imagenes/sonidero/'
            if (!folder) return;
            
            // Extraemos la categoría: sonidero, helados o ambos
            let category = '';
            if (folder.includes('sonidero')) category = 'sonidero';
            else if (folder.includes('helados')) category = 'helados';
            else if (folder.includes('ambos')) category = 'ambos';
            else return;
            
            let itemsArray = [];
            if (type === 'image') {
                itemsArray = mediaLibrary.imagenes[category] || [];
            } else if (type === 'video') {
                itemsArray = mediaLibrary.videos[category] || [];
            }
            
            // Limpiar gallery (por si hay contenido previo)
            gallery.innerHTML = '';
            
            // Por cada item, crear un div .gallery-item
            itemsArray.forEach(item => {
                const mediaDiv = document.createElement('div');
                mediaDiv.className = 'gallery-item';
                if (type === 'image') {
                    const img = document.createElement('img');
                    img.src = item.src;
                    img.alt = item.caption;
                    img.loading = 'lazy';
                    const captionSpan = document.createElement('span');
                    captionSpan.textContent = item.caption;
                    mediaDiv.appendChild(img);
                    mediaDiv.appendChild(captionSpan);
                    // Evento primer click: pantalla completa en imagen
                    mediaDiv.addEventListener('click', (e) => {
                        e.stopPropagation();
                        showFullscreen(item.src, 'image');
                    });
                } else if (type === 'video') {
                    const video = document.createElement('video');
                    video.src = item.src;
                    video.poster = ''; // opcional
                    video.muted = true;
                    video.preload = 'metadata';
                    const captionSpan = document.createElement('span');
                    captionSpan.textContent = item.caption;
                    mediaDiv.appendChild(video);
                    mediaDiv.appendChild(captionSpan);
                    // click para expandir video a pantalla completa
                    mediaDiv.addEventListener('click', (e) => {
                        e.stopPropagation();
                        showFullscreen(item.src, 'video', item.caption);
                    });
                    // Para que el video no se reproduzca automáticamente al cargar, 
                    // pero podemos añadir hover opcional? Meh
                }
                gallery.appendChild(mediaDiv);
            });
            
            // Si no hay items, mostrar mensaje amigable
            if (itemsArray.length === 0) {
                gallery.innerHTML = '<p style="padding:1rem;">Agrega contenido en la carpeta correspondiente. 📁</p>';
            }
        });
    }
    
    // Función para mostrar pantalla completa (imagen o video)
    let currentOverlay = null;
    
    function showFullscreen(src, type, title = '') {
        // Si ya hay overlay, lo removemos primero (por si acaso)
        if (currentOverlay) {
            document.body.removeChild(currentOverlay);
            currentOverlay = null;
        }
        const overlay = document.createElement('div');
        overlay.className = 'fullscreen-overlay';
        let media;
        if (type === 'image') {
            media = document.createElement('img');
            media.src = src;
            media.alt = title || 'Contenido';
        } else {
            media = document.createElement('video');
            media.src = src;
            media.controls = true;
            media.autoplay = true;
            media.style.maxWidth = '90%';
            media.style.maxHeight = '90%';
        }
        overlay.appendChild(media);
        document.body.appendChild(overlay);
        currentOverlay = overlay;
        
        // Segundo click: CERRAR la pantalla completa (haciendo click en cualquier lugar del overlay)
        overlay.addEventListener('click', function closeFull(e) {
            // Evita que si haces clic en el video/imagen cierre inmediatamente? 
            // El diseño pide: "cuando se dé el segundo clic donde sea, se quite de pantalla completa"
            // Cualquier click en el overlay elimina.
            if (currentOverlay) {
                document.body.removeChild(currentOverlay);
                currentOverlay = null;
            }
            overlay.removeEventListener('click', closeFull);
        });
    }
    
    // --- MODO NOCTURNO/CLARO ---
    const themeBtn = document.getElementById('themeToggle');
    const body = document.body;
    // Revisar localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }
    
    function updateThemeIcon(isDark) {
        const icon = themeBtn.querySelector('i');
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    });
    
    // Opcional: Manejar error de carga de imágenes por si aún no existen las carpetas
    // Muestra un aviso consola pero no rompe la app.
    
    // Inicializar galerías
    populateGalleries();
    
    // Animación extra: Prevenir que el video empiece a sonar sin permiso en móviles,
    // pero se maneja con muted y autoplay solo en fullscreen.
    // Actualizar el número de WhatsApp: ya presente en el href del botón flotante y en footer.
    // Si deseas cambiar el número, editar el href en index.html y footer.
    console.log('Proyecto Sonidero & Helados listo. Modifica las carpetas /imagenes y /videos con tu contenido.');
});