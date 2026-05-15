/**
 * GUIA DE OTIMIZAÇÃO DE IMAGENS
 * 
 * Siga os passos abaixo para converter e comprimir as imagens da galeria
 */

// ============================================================================
// OPÇÃO 1: USAR FERRAMENTAS ONLINE (Mais fácil)
// ============================================================================

/*
1. Acesse: https://convertio.co/pt/jpg-webp/
   ou: https://squoosh.app/ (Google's image compression)

2. Para cada imagem em img/Galeriaimg/:
   - Faça upload da imagem JPG
   - Configure tamanho máximo: 800px de largura
   - Qualidade: 80% (bom balance entre tamanho e qualidade)
   - Formatos: 
     a) Crie versão WebP (menor tamanho, mais rápido)
     b) Mantenha versão JPG como fallback (para navegadores antigos)
   - Baixe e substitua o arquivo original

3. Nomes dos arquivos: mantenha os mesmos nomes
   Exemplo: IMG_0857.jpg (depois converter para IMG_0857.webp)
*/

// ============================================================================
// OPÇÃO 2: USAR COMANDOS NO TERMINAL (ImageMagick)
// ============================================================================

/*
1. Instale ImageMagick:
   Windows: https://imagemagick.org/script/download.php#windows
   Mac: brew install imagemagick
   Linux: sudo apt-get install imagemagick

2. Abra o terminal na pasta img/Galeriaimg/ e execute:

   # Converter JPG para WebP (comprimido)
   for image in *.jpg; do convert "$image" -resize 800x800 -quality 80 "${image%.jpg}.webp"; done

   # Ou se estiver no Windows (PowerShell):
   Get-ChildItem *.jpg | ForEach-Object { convert $_.FullName -resize 800x800 -quality 80 ($_.BaseName + '.webp') }
*/

// ============================================================================
// OPÇÃO 3: SCRIPT AUTOMATIZADO (Melhor para futuro)
// ============================================================================

/*
1. Instale Node.js: https://nodejs.org/

2. Instale a biblioteca de compressão:
   npm install -g imagemin imagemin-webp imagemin-mozjpeg

3. Crie arquivo script-compress.js na raiz do projeto com:

   const imagemin = require('imagemin');
   const imageminWebp = require('imagemin-webp');
   const imageminMozjpeg = require('imagemin-mozjpeg');

   (async () => {
     await imagemin(['img/Galeriaimg/*.jpg'], {
       destination: 'img/Galeriaimg/compressed',
       plugins: [
         imageminWebp({quality: 80}),
         imageminMozjpeg({quality: 80})
       ]
     });
     console.log('Imagens comprimidas com sucesso!');
   })();

4. Execute: node script-compress.js
*/

// ============================================================================
// O QUE FOI OTIMIZADO NO CÓDIGO
// ============================================================================

/*
✅ Adicionado loading="lazy" em todas as imagens
✅ Adicionado decoding="async" para carregamento assíncrono
✅ Adicionado width e height para evitar layout shift
✅ Removidas transições pesadas e efeitos de scale/blur
✅ Hover simplificado apenas com sombra suave
✅ Image optimization script para lazy load automático

Próximas melhorias:
1. Converter imagens para WebP (você faz via ferramenta online ou ImageMagick)
2. Reduzir tamanho para máximo 800px de largura
3. Comprimir com qualidade 75-80%
4. O código já está pronto para suportar WebP!
*/

// ============================================================================
// APÓS CONVERTER AS IMAGENS
// ============================================================================

/*
Depois que converter para WebP, atualize o HTML para suportar ambos os formatos:

EXEMPLO ANTES:
<img src="img/Galeriaimg/IMG_0857.jpg" alt="..." width="280" height="280" loading="lazy" decoding="async" />

EXEMPLO DEPOIS:
<picture>
  <source srcset="img/Galeriaimg/IMG_0857.webp" type="image/webp">
  <img src="img/Galeriaimg/IMG_0857.jpg" alt="..." width="280" height="280" loading="lazy" decoding="async" />
</picture>

Isso oferece WebP para navegadores modernos e fallback para JPG em navegadores antigos.
*/
