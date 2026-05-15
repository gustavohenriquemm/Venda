/**
 * ANIMAÇÕES DE SCROLL - FADE IN COM MOVIMENTO SUAVE
 * Usa Intersection Observer para ativar animações quando elementos entram na viewport
 * Performance otimizada com lazy loading
 */

document.addEventListener('DOMContentLoaded', () => {
  // Verificar se o navegador suporta Intersection Observer
  if (!('IntersectionObserver' in window)) {
    console.log('Intersection Observer não suportado, animações desativadas');
    return;
  }

  // Seletores de elementos que devem ter animação de scroll
  const animationSelectors = [
    // Títulos e subtítulos das seções
    '.section-title',
    '.section-label',
    '.gallery-title',
    '.gallery-eyebrow',
    '.gallery-subtitle',
    '.about-title',
    '.about-tagline',
    
    // Cards
    '.quality-card',
    '.testimonial-card',
    '.gallery-item',
    '.feature',
    
    // Imagens
    '.about-image',
    '.image-wrap img',
    '.hero-title',
    
    // Botões
    '.btn-primary',
    '.btn-outline',
    '.gallery-button',
    
    // Conteúdo
    '.about-text',
    '.accent-line',
    '.quality-grid',
    '.testimonials-grid',
    
    // Contato (quando adicionar)
    '.contact-form',
    '.contact-info'
  ];

  // Encontrar todos os elementos que precisam de animação
  const elementsToAnimate = document.querySelectorAll(animationSelectors.join(', '));

  // Filtrar elementos dentro do modal (não animar dentro do modal para evitar travamento)
  const filteredElements = Array.from(elementsToAnimate).filter(element => {
    return !element.closest('#galleryModal') && !element.closest('.gallery-modal');
  });

  // Configurar Intersection Observer
  const observerOptions = {
    root: null, // Viewport
    rootMargin: '0px 0px -50px 0px', // Ativar quando elemento está 50px antes de entrar totalmente na tela
    threshold: 0 // Ativar assim que qualquer parte do elemento estiver visível
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Adicionar classe visible para ativar animação
        entry.target.classList.add('scroll-animate', 'visible');
        
        // Parar de observar este elemento (animar apenas uma vez)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar cada elemento
  filteredElements.forEach(element => {
    element.classList.add('scroll-animate');
    observer.observe(element);
  });

  // Animar elementos que já estão visíveis na tela inicial
  filteredElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      element.classList.add('visible');
      observer.unobserve(element);
    }
  });
});
