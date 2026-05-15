/**
 * OTIMIZAÇÃO DE CARREGAMENTO DE IMAGENS
 * Melhora a performance e experiência ao carregar fotos
 */

document.addEventListener('DOMContentLoaded', () => {
  // Otimizar carregamento de imagens da galeria
  const galleryImages = document.querySelectorAll('.gallery-item img');
  
  galleryImages.forEach((img, index) => {
    // Adicionar eventos de carregamento
    img.addEventListener('load', () => {
      img.classList.add('loaded');
    });
    
    img.addEventListener('error', () => {
      console.warn(`Erro ao carregar imagem: ${img.src}`);
    });
    
    // Preload prioritário para imagens do topo (primeiras 3)
    if (index < 3) {
      img.setAttribute('loading', 'eager');
    }
  });
  
  // Otimizar imagens do modal
  const modalImages = document.querySelectorAll('.modal-gallery-grid img');
  
  modalImages.forEach((img, index) => {
    img.addEventListener('load', () => {
      img.classList.add('loaded');
    });
    
    img.addEventListener('error', () => {
      console.warn(`Erro ao carregar imagem do modal: ${img.src}`);
    });
    
    // Preload para primeiras 6 imagens do modal
    if (index < 6) {
      img.setAttribute('loading', 'eager');
    }
  });
  
  // Adicionar suporte para conexões lentas
  if ('navigator' in window && 'connection' in navigator) {
    const connection = navigator.connection;
    
    if (connection && connection.saveData) {
      // Se o usuário ativou "Economizar dados", reduzir qualidade
      document.querySelectorAll('img').forEach(img => {
        img.style.filter = 'opacity(0.9)';
      });
    }
  }
});
