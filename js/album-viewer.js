const albums = {
  'acoperis-terasa': {
    title: 'Acoperiș terasă',
    photos: [1, 2, 3, 4, 5].map(n => `img/galerie/acoperis-terasa/acoperis-terasa-${n}.jpeg`),
  },
  'acoperis-bloc': {
    title: 'Acoperiș bloc',
    photos: [1, 2, 3, 4].map(n => `img/galerie/acoperis-bloc/acoperis-bloc${n}.jpeg`),
  },
  'terasa1': {
    title: 'Terasă 1',
    photos: [1, 2, 3, 4].map(n => `img/galerie/terasa1/terasa1-${n}.jpeg`),
  },
  'terasa2': {
    title: 'Terasă 2',
    photos: [1, 2, 3, 4].map(n => `img/galerie/terasa2/terasa2-${n}.jpeg`),
  },
  'terasa3': {
    title: 'Terasă 3',
    photos: [1, 2, 3, 4, 5].map(n => `img/galerie/terasa3/terasa3-${n}.jpeg`),
  },
  'acoperis-casa': {
    title: 'Acoperiș casă',
    photos: [
      'img/galerie/acoperis-casa/acoperis-casa1.jpeg',
      'img/galerie/acoperis-casa/acoperis-casa2.jpeg',
      'img/galerie/acoperis-casa/acoperis-casa3.jpeg',
    ],
  },
  'extra': {
    title: 'Diverse lucrări',
    photos: Array.from({ length: 12 }, (_, i) => `img/galerie/extra/extra-${i + 1}.jpeg`),
  },
};

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentAlbum = null;
let currentIndex = 0;

function showImage() {
  const photos = albums[currentAlbum].photos;
  lightboxImg.src = photos[currentIndex];
  lightboxImg.alt = albums[currentAlbum].title;
  lightboxCounter.textContent = `${currentIndex + 1} / ${photos.length}`;
}

function openAlbum(albumKey) {
  currentAlbum = albumKey;
  currentIndex = 0;
  showImage();
  lightbox.classList.add('open');
}

function closeLightbox() {
  lightbox.classList.remove('open');
  currentAlbum = null;
}

function nextImage() {
  const photos = albums[currentAlbum].photos;
  currentIndex = (currentIndex + 1) % photos.length;
  showImage();
}

function prevImage() {
  const photos = albums[currentAlbum].photos;
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  showImage();
}

document.querySelectorAll('.album-card').forEach(card => {
  card.addEventListener('click', () => openAlbum(card.dataset.album));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextImage);
lightboxPrev.addEventListener('click', prevImage);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});
