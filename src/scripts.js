import './css/styles.css';
import {fetchData, postData} from './apiCalls';
import domUpdates from './domUpdates';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';

//query selectors
const username = document.querySelector('.js-username');
const password = document.querySelector('.js-password');
const loginForm = document.querySelector('.js-login-form');
const requestForm = document.querySelector('.js-form');
const dateInput = document.querySelector('.js-departure-date');
const durationInput = document.querySelector('.js-duration');
const travelersInput = document.querySelector('.js-total-travelers');
const destinationsInput = document.querySelector('.js-destination');
const quoteButton = document.querySelector('.js-quote-button');
const requestButton = document.querySelector('.js-request-button');

//global variables
let usernameID;
let travelers;
let traveler;
let trips;
let destinations;

// functions
const getUsernameID = (event) => {
  if (username.value && password.value) {
    usernameID = username.value.slice(8);
    verifyCredentials();
  };
};

const verifyCredentials = () => {
  const usernameRoot = username.value.slice(0, 8);

  if((usernameRoot === 'traveler') &&
   (0 < usernameID && usernameID < 51) &&
   (password.value === 'travel')) {
     console.log(usernameRoot)
   };
};

const fetchAllData = () => {
  Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
    .then(data => {
      initializeData(data[0].travelers, data[1].trips, data[2].destinations);
      updateDashboard();
  });
};

const initializeData = (travelersRawData, tripsRawData, destinationsRawData) => {
  travelers = travelersRawData.map(traveler => new Traveler(traveler));
  traveler = travelers[43];
  trips = tripsRawData.map(trip => new Trip(trip));
  destinations = destinationsRawData.map(destination => new Destination(destination));
};

const updateDashboard = () => {
  getTravelerTripsAndDestinations();
  domUpdates.displayWelcomeTraveler(traveler);
  domUpdates.displayTravelerTrips(traveler);
  updateAnnualSpend();
  addDestinationsToForm(destinations);
};

const getTravelerTripsAndDestinations = () => {
  traveler.getTravelerTrips(trips);
  traveler.getTravelerDestinations(destinations);
};

const updateAnnualSpend = () => {
  const annualSpend = traveler.calculateTotalSpendForCurrentYear();
  domUpdates.displayCurrentAnnualSpend(annualSpend);
};


const addDestinationsToForm = (destinations) => {
  const getDestination = destinations.forEach(destination => {
    const destinationOption = document.createElement('option');
    destinationOption.innerText = destination.destination;
    destinationOption.vale = destination.destination;
    destinationsInput.appendChild(destinationOption);
  });
};

const findRequestedDestination = () => {
  const requestedDestinationDetails = destinations.find(destination => {
    return destination.destination === destinationsInput.value;
  })
return requestedDestinationDetails;
};

const calculateTravelQuote = () => {
  const requestedDestination = findRequestedDestination();

  const requestedTravelQuote = (durationInput.value * requestedDestination.estimatedLodgingCostPerDay) + (travelersInput.value * requestedDestination.estimatedFlightCostPerPerson);

  const requestedTravelAgentFee = requestedTravelQuote * .1;

  const totalQuote = requestedTravelQuote + requestedTravelAgentFee;

  domUpdates.displayEstimatedTravelQuote(totalQuote.toFixed(2));
};

const estimateTravelQuote = () => {
  if (destinationsInput.value &&
     travelersInput.value &&
     dateInput.value &&
     durationInput.value) {
    calculateTravelQuote();
  };
};

const createTripRequest = () => {
  const requestedDestination = findRequestedDestination();

  const requestedTrip = {
    id: trips.length + 1,
    userID: traveler.id,
    destinationID: requestedDestination.id,
    travelers: parseInt(travelersInput.value),
    date: dateInput.value.split("-").join("/"),
    duration: parseInt(durationInput.value),
    status: 'pending',
    suggestedActivities: []
  }

  postData(requestedTrip);
};

const submitTravelRequest = () => {
  if (dateInput.value &&
     durationInput.value &&
     travelersInput.value &&
     destinationsInput.value) {
    createTripRequest();
  };
};

//event listeners
window.addEventListener('load', fetchAllData);

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  getUsernameID();
});

quoteButton.addEventListener('click', function (event) {
  event.preventDefault();
  estimateTravelQuote();
});

requestForm.addEventListener('submit', function (event) {
  event.preventDefault();
  submitTravelRequest();
});
