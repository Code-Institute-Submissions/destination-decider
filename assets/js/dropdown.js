// populate continent dropdown

let continentDropdown = $('#continent-dropdown');

continentDropdown.empty();

continentDropdown.append('<option selected="true" disabled>Select Continent</option>');
continentDropdown.prop('selectedIndex', 0);

const continents = '/assets/data/continents.json';

$.getJSON(continents, function (data) {
  $.each(data, function (key, entry) {
    continentDropdown.append($('<option></option>').attr('value', entry.name).text(entry.name));
  })
});

// populate country dropdown

let countryDropdown = $('#country-dropdown');

countryDropdown.empty();

countryDropdown.append('<option selected="true" disabled>Select Country</option>');
countryDropdown.prop('selectedIndex', 0);

const countries = '/assets/data/countries.json';

$.getJSON(countries, function (data) {
  $.each(data, function (key, entry) {
    countryDropdown.append($('<option></option>').attr('value', entry.name).text(entry.name));
  })
  
});


// populate cities dropdown


let cityDropdown = $('#city-dropdown');

cityDropdown.empty();

cityDropdown.append('<option selected="true" disabled>Select City</option>');
cityDropdown.prop('selectedIndex', 0);

const cities = '/assets/data/cities.json';

$.getJSON(cities, function (data) {
  $.each(data, function (key, entry) {
    cityDropdown.append($('<option></option>').attr('value', entry.name).text(entry.name));
  })
});