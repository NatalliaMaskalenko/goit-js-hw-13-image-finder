import './sass/main.scss';
import articlesTpl from './temtlates/galerie.hbs';
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import PhotoApiService from './js/photo-service';

const searchFormEl = document.querySelector('.search-form');
// const btnSearchEl = document.querySelector('.btn-search');
const btnMoreEl = document.querySelector('.btn-more');
const containerEl = document.querySelector('.js-articles-container');

const photoApiService = new PhotoApiService();

searchFormEl.addEventListener('submit', onSearch);
btnMoreEl.addEventListener('click', onLoadMore);
// btnMoreEl.addEventListener('click', onSrollPage);

function onSearch(e) {
    e.preventDefault();
    clearArtiklesContainer();

    photoApiService.query = e.currentTarget.elements.query.value;
 if (photoApiService.query === '') {
        hideButton()
        return alert('Input is empty! Please enter what you search.');
    }

    photoApiService.resetPage();
    
    fetchAndMarkUp()
    showButton()
};

function onLoadMore() {
    fetchAndMarkUp().then(onSrollPage);
    // onSrollPage()
};

function fetchAndMarkUp() {
   return photoApiService.fetchArticles().then(countHits).then(appendArtiklesMarkup);

}

function appendArtiklesMarkup(hits) {
    containerEl.insertAdjacentHTML('beforeend', articlesTpl(hits));
};

function clearArtiklesContainer() {
    containerEl.innerHTML = '';
};



function onSrollPage() {
    // photoApiService.fetchArticles().then(hits => {
    //     appendArtiklesMarkup(hits);
        containerEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
// })

// { behavior: 'smooth', block: 'end' }
};

function hideButton() {
    btnMoreEl.classList.add("is-hidden");
};

function showButton() {
    btnMoreEl.classList.remove("is-hidden");
};

function countHits(arr) {

    if (arr.length === 0) {

        alert('Nothing founded! Please enter the correct name')
        hideButton()
    }

    return arr
   
}