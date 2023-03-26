import { Notify } from 'notiflix';
import { countryRender } from './index';
export { fetchCountries };

function fetchCountries(countryName) {
  fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(countries => countryRender(countries))
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function countryRender() {
  countries => {
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
                  <img src="${country.flags.svg}" alt="${
        country.name.official
      } flag">
                  <h2>${country.name.official}</h2>
                  <p>Capital: ${country.capital}</p>
                  <p>Population: ${country.population}</p>
                  <p>Languages: ${Object.values(country.languages)}</p>
              `;
      refs.countryInfo.insertAdjacentHTML('beforeend', result);
    } else {
      Notify.info('Oops, there is no country with that name');
    }
  };
}
