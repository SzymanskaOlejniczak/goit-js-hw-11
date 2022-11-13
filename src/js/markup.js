
// import SipleLighbox
import SimpleLightbox from 'simplelightbox';
// additional styles import
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

// render images
export function renderImages(images) {
  const markup = images
    .map(image => {
      return `<a class="gallery__link" href="${image.largeImageURL}">
                <div class="gallery-item">
                    <img class="gallery-item__img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy"/>
                  <div class="info">
                    <p class="info-item">
                      <b>Likes</b><br>
                      ${image.likes}
                    </p>
                    <p class="info-item">
                      <b>Views</b><br>
                      ${image.views}
                    </p>
                    <p class="info-item">
                      <b>Comments</b><br>
                      ${image.comments}
                    </p>
                    <p class="info-item">
                      <b>Downloads</b><br>
                      ${image.downloads}
                    </p>
                  </div>
                </div>
              </a>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  // add simpleLightbox library
  var lightbox = new SimpleLightbox('.gallery a');
}