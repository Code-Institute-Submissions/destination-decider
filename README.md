# Destination Decider

Destination Decider is a 1 page application designed to help people find a location to visit on holiday.
Once a destination is decided, various tourist attractions, hotels and restaurants will be marked on the map using google places api.
Users can click on these markers to open a google maps page with more information on the location.

Users can use this site to help easily plan out some places to visit, eat at and sleep at during a trip to a city of their choice.

## UX 

This website has been created for users who are either looking for inspiration on a city to visit, or already know their chosen location
and want a way to easily find things to do in that area.

#### User stories

* A user has a holiday planned to Leicester, but doesn't know of any tourist attractions in the area. They come to the Destination Decider and use the search feature to search for 'Leicester'. The application automatically displays tourist locations, restaurants and hotels. The user can then hide restaurants and hotels to easily see all of the tourist attractions in Leicester. They can then click on the markers to open the location on google maps for booking info, opening times and reviews.

* Another user is wanting to plan a holiday but needs inspiration. They decide to let the Destination Decider help, and use the 'random' button. This gives them one option. If they like the look of the city, they can use the hotel markers to find somewhere to stay, find somewhere to have dinner and some attractions to visit whilst they are there.

* Someone comes to the site knowing they want to visit Europe. By using the dropdowns they can find a country that they like the look of, and plan their holiday easier with the information that the application provides.

## Features

* Map displaying the user picked city - The map is used as a way of displaying the points of interest within a certain radius of the city that the user picked.

* Markers - The markers that get placed on the map are used to show where an establishment is, and what the user can expect to find there. When clicked they display the name of the establishment and a link to open the location on google maps for more information. I decided to have the application open an external web page to display more info for the sake of keeping the application decluttered and simple to use. Markers can be hidden/displayed using the buttons below the map to suit the users needs.

* Search feature - For users that already know where they want to visit, they can use this search form to trigger the google map search function.

* Dropdowns - The dropdowns are to be used by users to help find a country and city that they want to visit. When this dropdown changes, the google maps api will search for the result and move the map to that location.


## Technologies Used

* HTML5
* CSS - For styling the application
* Bootstrap Library - Used for the default styles and the responsive grid system. [Bootstrap link](https://getbootstrap.com/)
* Javascript/Jquery For DOM manipulation, for populating the dropdowns and for using the google maps/places api
* Google Maps API -  For displaying the map on the applications site
* Google Places API - I used Google Places API to use the nearbySearch function to find, and display on the map, nearby attractions, restaurants and hotels based on the users city choice. 



## Testing

The testing for this site was done manually. The majority of the testing was to ensure that resetting back to a default state with the reset button worked and that the previous selections markers got deleted whenever a new location was picked.


##### Search button testing

* Searching for a location, then resetting with the reset button.
* Searching for a location, then searching again for another location.
* Searching for a location, then using the dropdowns and random buttons to find another location.

##### Random button testing

* Using random button, then using random button to find another location. (Bug found, clicking too fast returns no results or markers. Fixed by setting a timeout on the random button)
* Using random button then resetting back to default state
* Using random button then searching with the search bar

##### Dropdown testing

* Selecting a continent, country and city. Letting the map search and then resetting back to default.
* Selecting a continent, country and city and then selecting another city (Bug found, changing city really fast returns no results or markers. Fixed by adding a counter to the number of calls and disabling the dropdowns until all calls had been completed.)
* Selecting a continent, country and city and then using the search function to find a different location.

##### Reset button testing

* Making sure that after markers have been added that the reset button deletes them and returns the map to its default center location.

##### Marker toggle buttons

* Ensuring that the toggle buttons work to hide the correct type of marker.
* Hiding a certain type of marker, searching for a new location, and making sure that the new markers are displayed and that the old ones have been deleted.

## Deployment

This project was deployed using github pages after pushing the project to github. There are no differences between development and deployed versions.
There is only 1 git branch.


## Media

The background image used in this application is from [Fstoppers](https://fstoppers.com/product/photographing-world-2-cityscape-astrophotography-and-advanced-post-processing)


 

 






