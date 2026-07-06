// === DOM Elements ===
const toggleBtn = document.getElementById('toggleGalleryBtn');
const galleryContainer = document.getElementById('galleryContainer');
const themeToggle = document.getElementById('themeToggle');
const fullModal = document.getElementById('fullscreenModal');
const fullContent = document.getElementById('fullscreenContent');

// 1. Botón desplegar / esconder galería (videos y fotos)
toggleBtn.addEventListener('click', () => {
    galleryContainer.classList.toggle('hidden');
    
    // Cambiar texto del botón según estado
    if (galleryContainer.classList.contains('hidden')) {
        toggleBtn.innerHTML = '📷 VIDEOS Y FOTOS';
    } else {
        toggleBtn.innerHTML = '✖️ CERRAR GALERÍA';
    }
});

// 2. Modo nocturno / claro
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    
    // Cambiar ícono del botón
    if (document.body.classList.contains('light-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// 3. Función para abrir contenido en pantalla completa
function openFullscreen(content, type) {
    fullContent.innerHTML = ''; // Limpiar contenido anterior
    
    if (type === 'image') {
        // Para imágenes
        const img = document.createElement('img');
        img.src = content;
        img.alt = 'Imagen en pantalla completa';
        fullContent.appendChild(img);
    } else if (type === 'video') {
        // Para videos - clonamos el video para mantener sus controles y audio
        const videoClone = content.cloneNode(true);
        videoClone.style.maxWidth = '100%';
        videoClone.style.maxHeight = '90vh';
        videoClone.controls = true;
        videoClone.autoplay = false;
        fullContent.appendChild(videoClone);
    }
    
    fullModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevenir scroll
}

// 4. Función para cerrar pantalla completa
function closeFullscreen() {
    // Pausar cualquier video que esté reproduciéndose
    const videos = fullContent.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
    });
    
    fullModal.style.display = 'none';
    fullContent.innerHTML = '';
    document.body.style.overflow = ''; // Restaurar scroll
}

// 5. Manejar clics en elementos de la galería
function handleGalleryClick(e) {
    const target = e.currentTarget;
    const type = target.dataset.type;
    
    if (type === 'image') {
        // Es una imagen
        const img = target.querySelector('img');
        if (img) {
            openFullscreen(img.src, 'image');
        }
    } else if (type === 'video') {
        // Es un video
        const video = target.querySelector('video');
        if (video) {
            // Pausamos el video actual si está reproduciéndose
            video.pause();
            openFullscreen(video, 'video');
        }
    }
}

// 6. Asignar eventos a los elementos de la galería
function bindGalleryEvents() {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        // Remover eventos previos para evitar duplicados
        item.removeEventListener('click', handleGalleryClick);
        item.addEventListener('click', handleGalleryClick);
    });
}

// 7. Cerrar modal al hacer clic fuera del contenido
fullModal.addEventListener('click', (e) => {
    // Si el clic fue en el modal (fondo) y no en el contenido
    if (e.target === fullModal) {
        closeFullscreen();
    }
});

// 8. Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fullModal.style.display === 'flex') {
        closeFullscreen();
    }
});

// 9. Observador para elementos dinámicos (por si se agregan más)
const observer = new MutationObserver(() => {
    bindGalleryEvents();
});
observer.observe(galleryContainer, { childList: true, subtree: true });

// 10. Inicializar eventos
bindGalleryEvents();

// 11. Manejar autoplay del video de fondo
const bgVideo = document.getElementById('bgVideo');
if (bgVideo) {
    bgVideo.play().catch(e => console.log("Autoplay bloqueado"));
}

// 12. Prevenir que el modal se cierre al hacer clic en el contenido
fullContent.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que el clic en el contenido cierre el modal
});

console.log('✅ Sonido Cheque - Galería interactiva cargada correctamente');
