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
    .then(countryRender)
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}
