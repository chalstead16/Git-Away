import './css/styles.css';
import helperFunctions from './utilities';
import {fetchData, postData} from './apiCalls';
import domUpdates from './domUpdates';
import Traveler from './Traveler';
import Trip from './Trip';
import Destination from './Destination';

//query selectors
const login = document.querySelector('.js-login-page');
const loginForm = document.querySelector('.js-login-form');
const username = document.querySelector('.js-username');
const password = document.querySelector('.js-password');
const dashboard = document.querySelector('.js-traveler-dashboard');
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
const verifyUsernameCredentials = () => {
  const usernameRoot = username.value.slice(0, 8);
  usernameID = username.value.slice(8);

  if((usernameRoot !== 'traveler') || (usernameID === undefined) ||
   (usernameID === '0') || (usernameID === '00') || (username.value === 'traveler')) {
    username.className = 'failure'
    domUpdates.displayInvalidUsernameError();
  } else {
    username.className = 'success'
  }
};

const verifyPasswordCredentials = () => {
  if(password.value !== 'travel') {
    password.className = 'failure'
    domUpdates.displayInvalidPasswordError();
  } else {
    password.className = 'success'
  }
};

const signIn = (event) => {
  verifyUsernameCredentials();
  verifyPasswordCredentials();
  if (username.classList.contains('success') && password.classList.contains('success')) {
    helperFunctions.show(dashboard);
    helperFunctions.hide(login);
    fetchAllData();
  }
};

// const verifyLoginCredentials = () => {
//   const usernameRoot = username.value.slice(0, 8);
//
//   if((usernameRoot === 'traveler') &&
//    (0 < usernameID && usernameID < 51) &&
//    (password.value === 'travel')) {
//      helperFunctions.show(dashboard);
//      helperFunctions.hide(login);
//      fetchAllData();
//    } else {
//      helperFunctions.show()
//    };
// };

const fetchAllData = () => {
  Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
    .then(data => {
      initializeData(data[0].travelers, data[1].trips, data[2].destinations);
      updateTravelDashboard();
  });
};

const initializeData = (travelersRawData, tripsRawData, destinationsRawData) => {
  travelers = travelersRawData.map(traveler => new Traveler(traveler));
  traveler = travelers[usernameID - 1];
  trips = tripsRawData.map(trip => new Trip(trip));
  destinations = destinationsRawData.map(destination => new Destination(destination));
};

const organizeAllTripsByMostRecentDate = (trips) => {
  const sortTrips = trips.sort((trip1, trip2) => {
    return new Date(trip2.date) - new Date(trip1.date)
  });
  return sortTrips;
};


const getTravelerTripsAndDestinations = () => {
  organizeAllTripsByMostRecentDate(trips);
  traveler.getTravelerTrips(trips);
  traveler.getTravelerDestinations(destinations);
};

const updateTravelDashboard = () => {
  getTravelerTripsAndDestinations();
  domUpdates.displayWelcomeTraveler(traveler);
  domUpdates.displayUpcomingTrips(traveler);
  domUpdates.displayPendingTrips(traveler);
  domUpdates.displayPastTrips(traveler);
  domUpdates.displayCurrentAnnualSpend(traveler);
  domUpdates.displayDestinationsToTravelRequestForm(destinations);
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
  };

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
loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  signIn();
});

quoteButton.addEventListener('click', function (event) {
  event.preventDefault();
  estimateTravelQuote();
});

requestForm.addEventListener('submit', function (event) {
  event.preventDefault();
  submitTravelRequest();
});
