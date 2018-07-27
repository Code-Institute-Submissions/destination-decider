// populate continent dropdown

let continentDropdown = $('#continent-dropdown');

continentDropdown.empty();

continentDropdown.append('<option selected="true" disabled>Select Continent</option>');
continentDropdown.prop('selectedIndex', 0);

const continents = '/assets/data/continents.json';

$.getJSON(continents, function(data) {
  $.each(data, function(key, entry) {
    continentDropdown.append($('<option></option>').attr('value', entry.name).text(entry.name));
  })
});




// populating country dropdown based on continent selection

let countryDropdown = $('#country-dropdown');

countryDropdown.append('<option selected="true" disabled>Select Country</option>');

continentDropdown.on("change", function(event) {
  console.log("dropdown value changed", continentDropdown.val());


  $.getJSON('/assets/data/countries.json', function(data) {
    console.log("data", data[continentDropdown.val()]["countries"]);
    countryDropdown.empty();
    countryDropdown.append('<option selected="true" disabled>Select Country</option>');

    $.each(data[continentDropdown.val()]["countries"], function(key, entry) {
      console.log("Entry", entry)
      countryDropdown.append($('<option></option>').attr('value', entry.name).text(entry.name));
    })
  });
});

// populate city dropdown based on country that was picked

let cityDropdown = $('#city-dropdown');

cityDropdown.append('<option selected="true" disabled>Select City</option>');

countryDropdown.on("change", function(event) {
  console.log("dropdown value changed", countryDropdown.val());


  $.getJSON('/assets/data/cities.json', function(data) {
    console.log("data", data[countryDropdown.val()]["cities"]);
    cityDropdown.empty();
    cityDropdown.append('<option selected="true" disabled>Select City</option>');

    $.each(data[countryDropdown.val()]["cities"], function(key, entry) {
      console.log("Entry", entry)
      cityDropdown.append($('<option></option>').attr('value', entry.name).text(entry.name));
    })
  });
});


//reset button



$("#reset").click(function() {
  
  document.getElementById("search").value = "Know your destination?";
  
  cityDropdown.empty();
  countryDropdown.empty(); // remove options that were previously populated
  continentDropdown.empty();

  cityDropdown.append('<option selected="true" disabled>Select City</option>');
  countryDropdown.append('<option selected="true" disabled>Select Country</option>'); // placeholder options
  continentDropdown.append('<option selected="true" disabled>Select Continent</option>');

  $.getJSON(continents, function(data) {
    $.each(data, function(key, entry) {
      continentDropdown.append($('<option></option>').attr('value', entry.name).text(entry.name)); //populate continent dropdown
    })
  });

});

// random button

$("#random").click(function() {

  $.getJSON('/assets/data/countries.json', function(data) {

    var continent_keys = Object.keys(data);
    console.log("continent_keys", continent_keys);


    var continent_name = continent_keys[Math.floor(Math.random() * continent_keys.length)];
    console.log("continent", continent_name);

    var country_names = data[continent_name];
    console.log("country names", country_names);

    var country = country_names.countries[Math.floor(Math.random() * country_names.countries.length)];
    console.log("country", country);

    continentDropdown.empty();
    continentDropdown.append($('<option selected="true" enabled></option>').attr('value', continent_name).text(continent_name));

    countryDropdown.empty();
    countryDropdown.append($('<option selected="true" enabled></option>').attr('value', country.name).text(country.name));
    
    

    $.getJSON('/assets/data/cities.json', function(data) {


      var cities = data[country.name];
      console.log(data);
      console.log("random city", cities);

      var city = cities.cities[Math.floor(Math.random() * cities.cities.length)];
      console.log("city", city);

      cityDropdown.empty();
      cityDropdown.append($('<option selected="true" enabled></option>').attr('value', city).text(city.name));
      
      
      
    });

  });

})
