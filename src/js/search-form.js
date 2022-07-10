import throttle from 'lodash/throttle';
import debounce from 'lodash/throttle';
import refs from './refs';
import { movieService } from './movie-service';
import renderCardTemplate from './card-templete';
import './header';
import { loading } from './loading';
import { blockSreen } from './loading';
import {
  renderPagination,
  removePagination,
  showPagination,
} from './pagination';
// import { fromPairs } from 'lodash';

refs.searchForm = document.querySelector('.search-form');


// const DEBOUNCE_DELAY = 300;

// refs.searchForm.addEventListener("input", debounce(searchMovies, DEBOUNCE_DELAY));
// refs.searchForm.addEventListener('submit', searchMovies);

export default function searchMovies(event) {
  event.preventDefault();

  const value = event.currentTarget.elements.query.value.trim();

  if (value.length <= 2 || value.length === 0) {
    moreTwoCharacters();
    return;
    }
    
  loading.on();

  blockSreen();

  fetchData(value);

  clearMarkup();
}

async function fetchData(value) {
  const total_pages = movieService.totalPage;
    const data = await movieService.getSearchQuery(value, 1);
    console.log(data);
    // if (data.results === false) {
    //     loading.off();
    //     correctionRequest();
    //     return;
    // }
  const card = data.results.map(result => renderCardTemplate(result)).join('');
    refs.moviesCard.innerHTML = card;
    
  loading.off();

  if (total_pages >= 2) {
    // call pagination
    renderPagination(movieService.totalPage, movieService.page);
  }
}

function moreTwoCharacters() {
  alert('Please enter more than 2 characters');
}
function correctionRequest(){
    alert('Please enter a correction request');
}
function clearMarkup() {
  refs.moviesCard.innerHTML = '';
}
