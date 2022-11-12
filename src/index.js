import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { galleryMarkup } from "./js/markup";
import { searchQuery } from "./js/fetch";

const searchForm = document.querySelector('.js-search-form'),
    gallery = document.querySelector('.js-gallery'),
    loadMore = document.querySelector('.js-load-more'),
    lightbox = new SimpleLightbox('.gallery a', { CaptionDelay: 250, captions: true, captionsData: 'alt' });

searchForm.addEventListener('submit', searchInformation);
loadMore.addEventListener('click', onButtonClick);

async function searchInformation(event) {
    event.preventDefault();
    loadMore.classList.add('is-hidden');
    searchQuery.page = 1;

    const query = event.target.elements.searchQuery.value.trim(),
        response = await searchQuery.searchPictures(query),
        galleryItem = response.hits;

    try {
        gallery.innerHTML = '';
        if (galleryItem.length === 0) {
            Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
        }  else if (!query) {
                return Notiflix.Notify.info('Please, enter key word for search!');
        } else {
            Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
            renderingMarkup(response.hits);
            loadMore.classList.remove('is-hidden');
        } 

    } catch (error) {
        console.log(error.message);
    }
    console.log(response);
}

async function onButtonClick() {
    searchQuery.page += 1;

    const response = await searchQuery.searchPictures();
    if (searchQuery.page > response.totalHits / searchQuery.per_page) {
        loadMore.classList.add('is-hidden');
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    }
    renderingMarkup(response.hits);

    const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}

function renderingMarkup(array) {
    gallery.insertAdjacentHTML('beforeend', galleryMarkup(array));
    lightbox.refresh();
}