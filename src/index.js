import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';
export { countryRender };

const DEBOUNCE_DELAY = 300;

const refs = {
  inputSearch: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

function onSearchCountry() {
  const countryName = refs.inputSearch.value.trim();
  fetchCountries(countryName);

  if (countryName === '') {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  } else countryName === refs.inputSearch.value;
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

refs.inputSearch.addEventListener(
  'input',
  debounce(onSearchCountry, DEBOUNCE_DELAY)
);

function countryRender(countries) {
  if (countries.length > 10) {
    Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length >= 2 && countries.length <= 10) {
    const result = countries
      .map(
        country =>
          `<li> <img src="${country.flags.svg}" alt="${country.name.official}">
              <span>${country.name.official}</span></li>`
      )
      .join('');
    refs.countryList.insertAdjacentHTML('beforeend', result);
  } else if (countries.length === 1) {
    const country = countries[0];
    const result = `
                  <div class="container">
                  <img src="${country.flags.svg}" alt="${
      country.name.official
    } flag">
        <h2>${country.name.official}</h2></div>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Languages: ${Object.values(country.languages)}</p>
              `;
    refs.countryInfo.insertAdjacentHTML('beforeend', result);
  } else {
    Notify.info('Oops, there is no country with that name');
  }
}
