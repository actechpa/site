document.addEventListener("DOMContentLoaded", function() {

    // Lógica para a animação de "scroll"
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));


    // =============================================
    // ========= INÍCIO DA LÓGICA DO CARROSSEL =========
    // =============================================
    const track = document.querySelector('.carousel-track');
    if (track) { // Verifica se o carrossel existe na página
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.carousel-button.next');
        const prevButton = document.querySelector('.carousel-button.prev');
        const slideWidth = slides[0].getBoundingClientRect().width;
        let currentIndex = 0;
        let autoplayInterval;

        // Função para mover o carrossel para um slide específico
        const moveToSlide = (targetIndex) => {
            track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
            currentIndex = targetIndex;
        };
        
        // Função para avançar para o próximo slide
        const nextSlide = () => {
             // Se estiver no último slide "real" (antes dos clones)
            if (currentIndex >= slides.length / 2) { 
                track.style.transition = 'none'; // Remove a transição para um pulo instantâneo
                currentIndex = 0; // Volta para o início
                moveToSlide(currentIndex); // Move para o primeiro slide
                
                // Força o navegador a aplicar a mudança antes de reativar a transição
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease-in-out';
                    currentIndex++;
                    moveToSlide(currentIndex);
                }, 20);

            } else {
                currentIndex++;
                moveToSlide(currentIndex);
            }
        };

        // Navegação com os botões
        nextButton.addEventListener('click', nextSlide);

        prevButton.addEventListener('click', () => {
            if (currentIndex === 0) return; // Não faz nada se já estiver no primeiro
            currentIndex--;
            moveToSlide(currentIndex);
        });

        // Autoplay
        const startAutoplay = () => {
            autoplayInterval = setInterval(nextSlide, 3000); // Muda de slide a cada 3 segundos
        };

        const stopAutoplay = () => {
            clearInterval(autoplayInterval);
        };
        
        // Inicia o autoplay e adiciona pausa no hover
        const carousel = document.querySelector('.client-carousel');
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        startAutoplay();
    }
    // ===========================================
    // ========= FIM DA LÓGICA DO CARROSSEL =========
    // ===========================================

});