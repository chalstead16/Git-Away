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
const dateError = document.querySelector('.js-departure-date-error');
const durationError = document.querySelector('.js-duration-error');
const travelersError = document.querySelector('.js-total-travelers-error');
const destinationError = document.querySelector('.js-destination-error');
const quoteMessage = document.querySelector('.js-quote-message');
const requestSuccess = document.querySelector('.js-request-success-message');
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

const fetchAllData = () => {
  console.log("fetch test")
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

const verifyTravelRequestDate = () => {
  let today = new Date(helperFunctions.getToday());
  let departureDate = new Date(dateInput.value);
  if ((today > departureDate) || (!dateInput.value)) {
    helperFunctions.show(dateError);
    domUpdates.displayDateRequestError();
  } else {
    helperFunctions.hide(dateError);
  }
};

const verifyTravelRequestDuration = () => {
  if ((durationInput.value <= 0) || (!durationInput.value)) {
    helperFunctions.show(durationError);
    domUpdates.displayDurationError();
  } else {
    helperFunctions.hide(durationError);
  }
};

const verifyTravelRequestTravelers = () => {
  if ((travelersInput.value <= 0) || (!travelersInput.value)) {
    helperFunctions.show(travelersError);
    domUpdates.displayTravelersError();
  } else {
    helperFunctions.hide(travelersError);
  }
};

const verifyTravelRequestDestination = () => {
  if (destinationsInput.value === 'placeholder') {
    helperFunctions.show(destinationError);
    domUpdates.displayDestinationError();
  } else {
    helperFunctions.hide(destinationError);
  }
};

const calculateTravelQuote = () => {
  const requestedDestination = findRequestedDestination();

  const requestedTravelQuote = (durationInput.value * requestedDestination.estimatedLodgingCostPerDay) + (travelersInput.value * requestedDestination.estimatedFlightCostPerPerson);

  const requestedTravelAgentFee = requestedTravelQuote * .1;

  const totalQuote = requestedTravelQuote + requestedTravelAgentFee;

  helperFunctions.show(quoteMessage);
  domUpdates.displayEstimatedTravelQuote(totalQuote.toFixed(2));
};

const getTravelQuote = () => {
  const validDestination = destinationsInput.value !== 'placeholder';

  verifyTravelRequestDate();
  verifyTravelRequestDuration();
  verifyTravelRequestTravelers();
  verifyTravelRequestDestination();

  if (validDestination &&
     travelersInput.value &&
     dateInput.value &&
     durationInput.value) {
    calculateTravelQuote();
    helperFunctions.show(requestButton);
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
  helperFunctions.hide(quoteMessage);
  postData('trips', requestedTrip).then((data) => {
    helperFunctions.show(requestSuccess);
    domUpdates.displaySuccessfulTravelRequest();
    timerSuccessMessage();
    fetchAllData();
  });
};

const submitTravelRequest = () => {
  if (dateInput.value &&
     durationInput.value &&
     travelersInput.value &&
     destinationsInput.value) {
    createTripRequest();
  };
};

const timerSuccessMessage = () => {
  setTimeout(function() {
    domUpdates.resetTravelRequestFormDisplay();
    helperFunctions.hide(requestButton);
    helperFunctions.hide(requestSuccess);
  }, 2000);
};

//event listeners
loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  signIn();
});

quoteButton.addEventListener('click', function (event) {
  event.preventDefault();
  getTravelQuote();
});

requestForm.addEventListener('submit', function (event) {
  event.preventDefault();
  submitTravelRequest();
});
