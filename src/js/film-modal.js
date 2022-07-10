import { result } from 'lodash';
import vectorSvg from '../images/icons.svg';
import { movieService } from './movie-service';
import renderCardTemplate from './card-templete';
import { addEventsOnModalBtn } from './localStorage';
import addEventsOnModalBtnTrailer from './trailer';

const refs = {
  filmModal: document.querySelector('.modal-film'),
  closeModalFilm: document.querySelector('.modal-film-close__btn'),
  backdropFilmModal: document.querySelector('.js-backdrop-film-modal'),
  filmCardTemplate: document.querySelector('.movies-card'),
};


refs.backdropFilmModal.addEventListener('click', onBackDropClick);
refs.filmCardTemplate.addEventListener('click', onOpenFilmModal);

function onOpenFilmModal() {
  event.preventDefault();
  const id = event.target.parentNode.parentNode.dataset.cardId;

  if (!id) return;
  document.body.classList.add('show-modal');
  onClickFilm(+id);
}

function onCloseModal() {
  document.body.classList.remove('show-modal');
  refs.filmModal.innerHTML = "";
}

function onBackDropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

export default async function onClickFilm(id) {
  const answer = await movieService.getOneMovie(id).then(movie => {
    const genre = Object.values(movie.genres);

    let genreValue = [];
    let genreId = [];
    for (const value of genre) {
      genreValue.push(value.name);
      genreId.push(value.id);
    }
    const markup = `<div class="film-card"
            data-film-id = '${movie.id}'
            data-film-title = '${movie.title}'
            data-film-poster = '${movie.poster_path}'
            data-card-release="${movie.release_date}"
            data-film-vote = '${movie.vote_average}'
            data-film-genre = '${genreId}'
            >
               <button type="button" class="modal-film-close__btn" data-action="close-modal" data-id="modalFilmCloseBtn">
            <svg class="modal-film__vector" width="18" height="18">
                <use href="${vectorSvg}#icon-close"></use>
            </svg>
        </button>
            <div class="film-info-container">
                <div class="btn-wrapper-trailer">
  <button type="button" class="btn-trailer" data-id="trailerBtn">
    <div class="btn-trailer-overlay-text">
      <h3 class="btn-trailer-text">Watch Trailer</h3>
    </div>
  </button>
  <img
    class="film-poster-img"
    src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
    alt="${movie.tags}"
    loading="lazy"
  /></div>
            <div class="value-films">
            <h2 class="name-film">${movie.original_title}</h2>
            <table>
            <tbody><tr><td class="info-film"">Vote / Votes</td><td class="info-value"><span class="vote">${
              movie.vote_average
            }</span> / <span class="vote-count">${
      movie.vote_count
    }</span> </td></tr>
            <tbody><tr><td class="info-film"">Popularity</td><td class="info-value">${
              movie.popularity
            }</td></tr>
            <tbody><tr><td class="info-film"">Original Title</td><td class="info-value original-title">${
              movie.original_title
            }</td></tr>
            <tbody><tr><td class="info-film"">Genre</td><td class="info-value genres-film">${genreValue.join(
              ', '
            )}</td></tr>
                </table>
            <h3 class="about-film-title">about</h3>
            <p><span class="about-film-text">${movie.overview}</span></p>
            <div class="modal-btn-wrapper">
            <button type="button" class="film-modal-btn add-to-watched">add to watched</button>
            <button type="button" class="film-modal-btn add-to-queue">add to queue</button>
            </div>
            </div>
            </div>
            </div>`;
    refs.filmModal.innerHTML = markup;

    refs.closeModalFilm = document.querySelector('.modal-film-close__btn')
      refs.closeModalFilm.addEventListener('click', onCloseModal);
    addEventsOnModalBtn();
    addEventsOnModalBtnTrailer(movie.videos);
  });
}