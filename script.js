// Efecto de las estrellas que siguen sutilmente el ratón
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    
    // Movemos ligeramente el background position
    document.body.style.backgroundPosition = `${x}px ${y}px, ${x * 2}px ${y * 2}px, ${x * 1.5}px ${y * 1.5}px, ${x * 0.5}px ${y * 0.5}px, ${x * 0.8}px ${y * 0.8}px`;
});

// Revelación de las tarjetas de servicios
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Añadimos un pequeño retraso escalonado a cada tarjeta
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

// Preparamos las tarjetas para la animación
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    observer.observe(card);
});

console.log('🌌 Leonardo Nexus Initialized');

// Sistema de Meteoritos (Estrellas fugaces)
function createMeteor() {
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');
    
    // Nace en un borde aleatorio
    const startX = Math.random() * window.innerWidth;
    const startY = -50; // Nace arriba
    
    // Viaja hacia un punto aleatorio en la parte inferior/diagonal
    const endX = startX + (Math.random() - 0.5) * 1000;
    const endY = window.innerHeight + 50;
    
    // Calculamos el ángulo para rotarlo en la dirección de caída
    const deltaY = endY - startY;
    const deltaX = endX - startX;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    
    // Distancia total
    const distance = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
    
    meteor.style.left = `${startX}px`;
    meteor.style.top = `${startY}px`;
    meteor.style.width = `${Math.random() * 100 + 50}px`; // Longitud del haz
    
    // Variables CSS para la animación
    meteor.style.setProperty('--dx', `${deltaX}px`);
    meteor.style.setProperty('--dy', `${deltaY}px`);
    meteor.style.setProperty('--angle', `${angle}deg`);
    
    // Duración de la caída aleatoria entre 1s y 3s
    const duration = Math.random() * 2 + 1;
    meteor.style.animationDuration = `${duration}s`;
    
    document.querySelector('.nexus-system').appendChild(meteor);
    
    // Destruimos el DOM del meteorito cuando acaba
    setTimeout(() => {
        meteor.remove();
    }, duration * 1000);
}

// Generamos un meteorito de vez en cuando (entre 2 y 6 segundos)
function spawnMeteoritesLoop() {
    createMeteor();
    const nextSpawn = Math.random() * 4000 + 2000;
    setTimeout(spawnMeteoritesLoop, nextSpawn);
}

// Iniciar lluvia de estrellas
setTimeout(spawnMeteoritesLoop, 2000);
