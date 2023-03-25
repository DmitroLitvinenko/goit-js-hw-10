// import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputSearch: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const country = '';

refs.inputSearch.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function fetchCountries(countryName) {
  fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags.svg,languages`
  )
    .then(response => response.json())
    .then(country => {
      if (country.length > 10) {
        Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (country.length >= 2 && country.length <= 10) {
        const result = country.map(name =>
          `<img src="${name.flags.svg}" alt="${name.name.official} flag">
        <span>${name.name.official}</span>`.json('')
        );
        console.log(result);
        result.insertAdjacentHtml(beforeend, countryList);
      }
      console.log(country);
    });
}

function onSearch() {
  const countryName = refs.inputSearch.value;
  console.dir(refs.inputSearch);
  fetchCountries(countryName);
}
