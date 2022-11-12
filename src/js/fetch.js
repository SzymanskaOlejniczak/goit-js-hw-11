
import Notiflix from 'notiflix';

const axios = require('axios').default;

export let lastIndexPage = 1;


export async function fetchImages(name, page) {
  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      method: 'get',
      params: {
        key: '31279594-d7f31148a9794d6f86efa6037',
        q: name,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
      },
    });

    if (response.data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    if (response.data.totalHits > 0 && page === 1)
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );

    if (response.data.totalHits % 40 === 0) {
      lastIndexPage = response.data.totalHits / 40;
    } else {
      lastIndexPage = Math.floor(response.data.totalHits / 40) + 1;
    }

    return response.data;
  } catch (error) {
    console.log(error);
  }
}