import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const loadButton = document.querySelector(".load-button");
const gallery = document.querySelector(".gallery");

let currentPage = 1;
let perPage = 15;
let currentQuery = "";

function hideButton() {
    loadButton.classList.add("hidden");
  }
  
  function showButton() {
    loadButton.classList.remove("hidden");
}
  



form.addEventListener("submit", async event => {
    event.preventDefault();

    const query = event.target.elements['search-text'].value.trim();
    if (!query) {
        iziToast.warning({
            title: "warning",
            message: "Please enter a search term",
            position: 'topLeft'
        });
        return;
    }

    currentQuery = query;
    currentPage = 1;

    clearGallery();
    showLoader();
    hideButton();

    try {
        const data = await getImagesByQuery(currentQuery, currentPage, perPage)
        const { hits } = data;

      if (hits.length === 0) {
        iziToast.info({
          title: 'Info',
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topLeft'
        });
      } else {
          createGallery(hits);
          showButton();
        }
        
        const totalPages = Math.ceil(data.totalHits / perPage);
        if (currentPage >= totalPages) {
            hideButton();
        }


    } catch(error) {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
        position: 'topLeft'
      });
    } finally {
      hideLoader();
    }
});

loadButton.addEventListener("click", async () => {
    currentPage += 1;
    showLoader();

    try {
        const data = await getImagesByQuery(currentQuery, currentPage, perPage);
        createGallery(data.hits)

        const galleryItem = document.querySelector(".gallery-item");
    if (galleryItem) {
      const itemHeight = galleryItem.getBoundingClientRect().height;
      window.scrollBy({
        top: itemHeight * 2,
        behavior: "smooth"
      })
        }
        
        const totalPages = Math.ceil(data.totalHits / perPage);
    if (currentPage >= totalPages) {
      hideLoadButton();
      iziToast.info({
  title: 'Info',
  message: "We're sorry, but you've reached the end of search results.",
  position: 'topLeft',
});
    }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.',
            position: 'topLeft',
          });
        } finally {
          hideLoader();
        }
      }) 
