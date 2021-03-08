import './sass/main.scss';
import './js/openLibrary.js';
import refs from './js/refs.js';
import apiService from './js/apiSearchFetch.js';
import lightbox from './js/modalFilmMarkup';
import { processingSpinner, deleteSpinner } from './js/spinner-loader';
import './js/pagination.min';
import optionsPagination from './js/paginationOptions';
const container = $('#pagination-container');

// processingSpinner();

function setGenresString(genresArray) {
  const reqGenres = [];
  genresArray.map(res => reqGenres.push(` ${res.name}`));
  reqGenres.toString().trim();
  return reqGenres;
}

function genresFilter(data, genreIds) {
  const filtredData = data.filter(genre =>
    genreIds.find(genreId => genre.id === genreId),
  );
  return setGenresString(filtredData);
}

function getNewResult(results) {
  results.map(result => {
    result.release_date = result.release_date.slice(0, 4);
    result.poster_path =
      'https://image.tmdb.org/t/p/original/' + result.poster_path;
    return result;
  });
  return results;
}

///поиск по инпуту
refs.inputForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  apiService.query = form.elements.query.value;
  console.log(apiService.searchUrl);
  refs.movieGrid.innerHTML = '';
  form.reset(); //чистим форму

  container.pagination({
    ...optionsPagination, //деструктуризация базовых настроек пагинатора (default options) рендер страницы зашит в дефолтных опциях!!!
    dataSource: apiService.searchUrl, //передача корня ссылки на сайт в данном случае ссылка поиска
    ajax: apiService.ajaxDataForSearch, // настройки запросов аякса под каждый сайт-сервер (apiKey,page,query)
  });
});

//запускается при отрисовке страницы первым
container.pagination({
  ...optionsPagination, //деструктуризация базовых настроек пагинатора (default options) рендер страницы зашит в дефолтных опциях!!!
  dataSource: apiService.popularUrl, //передача корня ссылки на сайт в данном случае ссылка популярных фильмов
  ajax: apiService.ajaxDataForPopular, // настройки запросов аякса под каждый сайт-сервер (apiKey,page,query)
});
// deleteSpinner();
lightbox();
